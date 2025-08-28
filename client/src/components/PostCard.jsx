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
      className="card p-4 sm:p-6 hover:shadow-lg transition-all duration-300"
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
      <div className="flex items-center space-x-3 mb-3 sm:mb-4">
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 truncate">{post.author.name}</p>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
      </div>

      <Link to={`/post/${post.slug}`} className="block group">
        <motion.h2 
          className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors leading-tight"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {post.title}
        </motion.h2>
        
        {post.excerpt && (
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
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

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full truncate max-w-20 sm:max-w-none"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                  +{post.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{post.likesCount || 0}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{post.commentsCount || 0}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default PostCard;