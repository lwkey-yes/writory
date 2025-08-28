import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, User } from 'lucide-react';

function PostCard({ post, index = 0 }) {
  const formattedDate = formatDistanceToNow(new Date(post.publishedAt || post.createdAt), {
    addSuffix: true,
  });

  return (
    <motion.article 
      className="card p-6 hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "easeOut" 
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-gray-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
      </div>

      <Link to={`/post/${post.slug}`} className="block group">
        <motion.h2 
          className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {post.title}
        </motion.h2>
        
        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {post.featuredImage && (
          <div className="mb-4">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Heart className="h-4 w-4" />
            <span>{post.likesCount || 0}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4" />
            <span>{post.commentsCount || 0}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default PostCard;