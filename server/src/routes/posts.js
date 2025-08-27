import express from 'express';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import Like from '../models/Like.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import { validatePost, validateComment, validateRequest } from '../middleware/validation.js';
import { sanitizeMarkdown, extractExcerpt } from '../utils/sanitize.js';

const router = express.Router();

// Get all posts with pagination and search
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      tags,
      author,
      sort = 'newest'
    } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    // Build query
    const query = { isPublished: true };

    if (search) {
      query.$text = { $search: search };
    }

    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      query.tags = { $in: tagArray };
    }

    if (author) {
      query.author = author;
    }

    // Build sort
    let sortOption = {};
    switch (sort) {
      case 'oldest':
        sortOption = { publishedAt: 1 };
        break;
      case 'popular':
        sortOption = { likesCount: -1, publishedAt: -1 };
        break;
      case 'newest':
      default:
        sortOption = { publishedAt: -1 };
        break;
    }

    // Add text score for search
    if (search) {
      sortOption.score = { $meta: 'textScore' };
    }

    const posts = await Post.find(query)
      .populate('author', 'name avatar')
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .select('-body'); // Exclude body for list view

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single post by slug
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    const post = await Post.findOne({
      slug: req.params.slug,
      isPublished: true
    }).populate('author', 'name avatar bio');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if current user liked this post
    let isLiked = false;
    if (req.user) {
      const like = await Like.findOne({
        user: req.user._id,
        post: post._id,
      });
      isLiked = !!like;
    }

    res.json({
      ...post.toObject(),
      isLiked,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single post by ID (for editing)
router.get('/edit/:id', authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name avatar bio');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check ownership
    if (post.author._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this post' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new post
router.post('/', authenticate, validatePost, validateRequest, async (req, res) => {
  try {
    const { title, body, excerpt, tags, featuredImage, isPublished } = req.body;

    const post = new Post({
      title,
      body,
      excerpt: excerpt || extractExcerpt(body),
      tags: tags || [],
      author: req.user._id,
      featuredImage,
      isPublished: isPublished || false,
    });

    await post.save();
    await post.populate('author', 'name avatar');

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update post
router.put('/:id', authenticate, validatePost, validateRequest, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check ownership
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, body, excerpt, tags, featuredImage, isPublished } = req.body;

    post.title = title;
    post.body = body;
    post.excerpt = excerpt || extractExcerpt(body);
    post.tags = tags || [];
    post.featuredImage = featuredImage;
    post.isPublished = isPublished !== undefined ? isPublished : post.isPublished;

    await post.save();
    await post.populate('author', 'name avatar');

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete post
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check ownership
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Delete associated comments and likes
    await Comment.deleteMany({ post: post._id });
    await Like.deleteMany({ post: post._id });

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's own posts (including drafts)
router.get('/user/me', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const posts = await Post.find({ author: req.user._id })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('-body');

    const total = await Post.countDocuments({ author: req.user._id });

    res.json({
      posts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Toggle like
router.post('/:id/like', authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const existingLike = await Like.findOne({
      user: req.user._id,
      post: post._id,
    });

    if (existingLike) {
      // Unlike
      await Like.findByIdAndDelete(existingLike._id);
      post.likesCount = Math.max(0, post.likesCount - 1);
      await post.save();

      res.json({
        message: 'Post unliked',
        isLiked: false,
        likesCount: post.likesCount,
      });
    } else {
      // Like
      const like = new Like({
        user: req.user._id,
        post: post._id,
      });
      await like.save();

      post.likesCount += 1;
      await post.save();

      res.json({
        message: 'Post liked',
        isLiked: true,
        likesCount: post.likesCount,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get post comments
router.get('/:id/comments', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const comments = await Comment.find({ post: req.params.id })
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Comment.countDocuments({ post: req.params.id });

    res.json({
      comments,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add comment
router.post('/:id/comments', authenticate, validateComment, validateRequest, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = new Comment({
      content: req.body.content,
      author: req.user._id,
      post: post._id,
    });

    await comment.save();
    await comment.populate('author', 'name avatar');

    // Update comments count
    post.commentsCount += 1;
    await post.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;