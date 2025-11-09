// Quick test script to verify backend endpoint
// Run with: node test-backend.js

const https = require('https');

const data = JSON.stringify({
  email: 'vkzeus13@gmail.com',
  password: 'Vedant@123'
});

const options = {
  hostname: 'hz-sports-backend-2.onrender.com',
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    'Accept': 'application/json'
  }
};

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Response Body:', responseData);
    try {
      const parsed = JSON.parse(responseData);
      console.log('Parsed Response:', parsed);
    } catch (e) {
      console.log('Response is not JSON (might be HTML error page)');
    }
  });
});

req.on('error', (error) => {
  console.error('Request Error:', error);
});

req.write(data);
req.end();

