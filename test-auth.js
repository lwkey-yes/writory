// Test authentication and post access
const BACKEND_URL = 'https://writory-vnt7.onrender.com';

async function testAuth() {
  console.log('🔐 Testing Authentication...\n');

  // Check if we can access a protected endpoint
  try {
    const token = localStorage.getItem('accessToken');
    console.log('Access token exists:', !!token);
    
    if (token) {
      console.log('Token preview:', token.substring(0, 20) + '...');
      
      // Test protected endpoint
      const response = await fetch(`${BACKEND_URL}/api/posts/user/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Authentication working');
        console.log('User posts:', data.posts?.length || 0);
        
        if (data.posts && data.posts.length > 0) {
          console.log('First post ID:', data.posts[0]._id);
          console.log('First post title:', data.posts[0].title);
        }
      } else {
        console.log('❌ Auth failed:', response.status, response.statusText);
        const errorData = await response.text();
        console.log('Error:', errorData);
      }
    } else {
      console.log('❌ No access token found');
    }
  } catch (error) {
    console.log('❌ Auth test error:', error.message);
  }
}

// Run in browser console
if (typeof window !== 'undefined') {
  testAuth();
} else {
  console.log('Run this script in the browser console on your app page');
}