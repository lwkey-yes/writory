// Debug script to test the edit post endpoint
const BACKEND_URL = 'https://writory-vnt7.onrender.com';

async function debugEditPost() {
  console.log('🔍 Debugging Edit Post Functionality...\n');

  // Test if backend is accessible
  try {
    console.log('1. Testing backend health...');
    const healthResponse = await fetch(`${BACKEND_URL}/api/health`);
    if (healthResponse.ok) {
      console.log('✅ Backend is healthy');
    } else {
      console.log('❌ Backend health check failed');
      return;
    }
  } catch (error) {
    console.log('❌ Backend not accessible:', error.message);
    return;
  }

  // Test authentication endpoint
  try {
    console.log('\n2. Testing auth endpoint...');
    const authResponse = await fetch(`${BACKEND_URL}/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword'
      })
    });
    
    if (authResponse.ok) {
      console.log('✅ Auth endpoint is working');
    } else {
      console.log('⚠️ Auth endpoint returned:', authResponse.status);
    }
  } catch (error) {
    console.log('❌ Auth endpoint error:', error.message);
  }

  // Test posts endpoint
  try {
    console.log('\n3. Testing posts endpoint...');
    const postsResponse = await fetch(`${BACKEND_URL}/api/posts`);
    if (postsResponse.ok) {
      const data = await postsResponse.json();
      console.log('✅ Posts endpoint working, found', data.posts?.length || 0, 'posts');
    } else {
      console.log('❌ Posts endpoint failed:', postsResponse.status);
    }
  } catch (error) {
    console.log('❌ Posts endpoint error:', error.message);
  }

  console.log('\n📋 Next steps to debug:');
  console.log('1. Check browser console for detailed error messages');
  console.log('2. Check if user is properly authenticated');
  console.log('3. Verify the post ID exists in the database');
  console.log('4. Check if the user owns the post they\'re trying to edit');
}

debugEditPost();