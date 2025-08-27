import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Eye } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import api from '../services/api';
import toast from 'react-hot-toast';

function Write() {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    excerpt: '',
    tags: '',
    isPublished: false,
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e, publish = false) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.body.trim()) {
      toast.error('Title and body are required');
      return;
    }

    setLoading(true);

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const postData = {
        title: formData.title,
        body: formData.body,
        excerpt: formData.excerpt,
        tags: tagsArray,
        isPublished: publish,
      };

      const response = await api.post('/posts', postData);
      
      toast.success(publish ? 'Post published successfully!' : 'Draft saved successfully!');
      navigate(`/post/${response.data.slug}`);
    } catch (error) {
      toast.error('Failed to save post');
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Write a new post</h1>
        <p className="text-gray-600">Share your thoughts with the world.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor */}
        <div className="lg:col-span-2">
          <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
            <div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Post title..."
                className="w-full text-3xl font-bold border-none outline-none placeholder-gray-400 resize-none"
                required
              />
            </div>

            <div>
              <textarea
                name="body"
                value={formData.body}
                onChange={handleChange}
                placeholder="Write your post in Markdown..."
                className="w-full h-96 border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none font-mono"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className="btn btn-outline flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>{preview ? 'Hide Preview' : 'Show Preview'}</span>
              </button>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-secondary flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Draft</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  disabled={loading}
                  className="btn btn-primary"
                >
                  Publish
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Post Settings */}
          <div className="card p-4 space-y-4">
            <h3 className="font-semibold text-gray-900">Post Settings</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Brief description of your post..."
                className="textarea h-20"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to auto-generate from content
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="javascript, react, web-development"
                className="input"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate tags with commas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      {preview && (
        <div className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview</h2>
          <article className="prose-custom">
            <h1>{formData.title || 'Untitled Post'}</h1>
            <ReactMarkdown>{formData.body || 'Start writing to see preview...'}</ReactMarkdown>
          </article>
        </div>
      )}
    </div>
  );
}

export default Write;