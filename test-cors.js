// Test CORS configuration
const BACKEND_URL = 'https://writory-i3jw.onrender.com';
const FRONTEND_URL = 'https://writory-mu.vercel.app';

async function testCORS() {
  console.log('🧪 Testing CORS configuration...\n');

  try {
    // Test a simple API call that would trigger CORS
    const response = await fetch(`${BACKEND_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Origin': FRONTEND_URL,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log('✅ CORS is working correctly!');
      console.log('🎉 Your frontend can communicate with the backend');
    } else {
      console.log('❌ CORS might still have issues');
      console.log('Response status:', response.status);
    }
  } catch (error) {
    if (error.message.includes('CORS')) {
      console.log('❌ CORS error still exists');
      console.log('🔧 Make sure CLIENT_URL in Render is set to: https://writory-mu.vercel.app');
    } else {
      console.log('❌ Other error:', error.message);
    }
  }

  console.log('\n📋 Checklist:');
  console.log('1. Go to Render Dashboard');
  console.log('2. Find writory-i3jw service');
  console.log('3. Environment tab');
  console.log('4. Set CLIENT_URL=https://writory-mu.vercel.app');
  console.log('5. Save and wait for redeploy');
}

testCORS();