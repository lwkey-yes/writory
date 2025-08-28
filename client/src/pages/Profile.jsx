import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { User, Edit, Eye, Trash2, Plus, X, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

function Profile() {
  const { user, updateUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || '',
        bio: user.bio || '',
      });
    }
  }, [user]);

  const fetchUserPosts = async () => {
    try {
      const response = await api.get('/posts/user/me');
      setPosts(response.data.posts);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error('Failed to fetch your posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await api.delete(`/posts/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    
    if (!editForm.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setSaving(true);

    try {
      const response = await api.put('/auth/me', {
        name: editForm.name.trim(),
        bio: editForm.bio.trim(),
      });

      updateUser(response.data.user);
      setShowEditModal(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleEditFormChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{user.name}</h1>
            <p className="text-sm sm:text-base text-gray-600 truncate">{user.email}</p>
            {user.bio && (
              <p className="text-sm sm:text-base text-gray-700 mt-1 sm:mt-2 line-clamp-3">{user.bio}</p>
            )}
          </div>
          <button 
            onClick={handleEditProfile}
            className="btn btn-outline flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base w-full sm:w-auto"
          >
            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Posts Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Your Posts ({pagination.total || 0})
        </h2>
        <Link to="/write" className="btn btn-primary flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base w-full sm:w-auto">
          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>New Post</span>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Edit className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
          </div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4">Start writing and share your thoughts with the world.</p>
          <Link to="/write" className="btn btn-primary text-sm sm:text-base">
            Write your first post
          </Link>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {posts.map((post) => (
            <div key={post._id} className="card p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                      {post.title}
                    </h3>
                    {!post.isPublished && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full self-start">
                        Draft
                      </span>
                    )}
                  </div>
                  
                  {post.excerpt && (
                    <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                    <span>
                      {post.isPublished ? 'Published' : 'Updated'}{' '}
                      {formatDistanceToNow(
                        new Date(post.publishedAt || post.updatedAt),
                        { addSuffix: true }
                      )}
                    </span>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <span>{post.likesCount || 0} likes</span>
                      <span>{post.commentsCount || 0} comments</span>
                    </div>
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full truncate max-w-20 sm:max-w-none"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end space-x-1 sm:space-x-2 sm:ml-4 flex-shrink-0">
                  {post.isPublished && (
                    <Link
                      to={`/post/${post.slug}`}
                      className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="View post"
                    >
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Link>
                  )}
                  <Link
                    to={`/edit/${post._id}`}
                    className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Edit post"
                  >
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete post"
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Profile</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-4 sm:p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                  className="input text-sm sm:text-base"
                  required
                  maxLength={50}
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={editForm.bio}
                  onChange={handleEditFormChange}
                  className="textarea h-20 sm:h-24 text-sm sm:text-base"
                  placeholder="Tell us about yourself..."
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {editForm.bio.length}/500 characters
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="btn btn-outline text-sm sm:text-base w-full sm:w-auto"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base w-full sm:w-auto"
                >
                  <Save className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;