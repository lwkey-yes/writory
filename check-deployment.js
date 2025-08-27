// Simple script to check if your backend is working
const BACKEND_URL = 'https://writory-vnt7.onrender.com';

async function checkBackend() {
  try {
    console.log('🔍 Checking backend health...');
    const response = await fetch(`${BACKEND_URL}/api/health`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Backend is healthy!');
      console.log('📊 Status:', data.status);
      console.log('⏰ Timestamp:', data.timestamp);
    } else {
      console.log('❌ Backend health check failed');
    }
  } catch (error) {
    console.log('❌ Backend is not responding:', error.message);
  }
}

checkBackend();