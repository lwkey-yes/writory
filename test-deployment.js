// Test script to verify your deployment is working
const FRONTEND_URL = 'https://writory-mu.vercel.app';
const BACKEND_URL = 'https://writory-vnt7.onrender.com';

async function testDeployment() {
  console.log('🧪 Testing Writory Deployment...\n');

  // Test backend health
  try {
    console.log('🔍 Testing backend health...');
    const backendResponse = await fetch(`${BACKEND_URL}/api/health`);
    const backendData = await backendResponse.json();
    
    if (backendResponse.ok) {
      console.log('✅ Backend is healthy!');
      console.log(`📊 Status: ${backendData.status}`);
    } else {
      console.log('❌ Backend health check failed');
    }
  } catch (error) {
    console.log('❌ Backend error:', error.message);
  }

  // Test frontend
  try {
    console.log('\n🔍 Testing frontend...');
    const frontendResponse = await fetch(FRONTEND_URL);
    
    if (frontendResponse.ok) {
      console.log('✅ Frontend is accessible!');
      console.log(`📊 Status: ${frontendResponse.status}`);
    } else {
      console.log('❌ Frontend check failed');
    }
  } catch (error) {
    console.log('❌ Frontend error:', error.message);
  }

  console.log('\n🌐 Your live URLs:');
  console.log(`Frontend: ${FRONTEND_URL}`);
  console.log(`Backend: ${BACKEND_URL}`);
  
  console.log('\n🔧 Next steps:');
  console.log('1. Update Render CLIENT_URL to: https://writory-mu.vercel.app');
  console.log('2. Set up MongoDB Atlas for data persistence');
  console.log('3. Configure Cloudinary for file uploads');
}

testDeployment();