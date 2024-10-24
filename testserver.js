// test-server.js
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5200';

async function testServer() {
  try {
    // Test health check
    const healthCheck = await fetch(`${BASE_URL}/health-check`);
    console.log('Health Check:', await healthCheck.json());

    // Test POST message
    const postResponse = await fetch(`${BASE_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deviceName: 'test_device',
        messages: ['Hello', 'World']
      })
    });
    console.log('POST Response:', await postResponse.json());

    // Test GET messages
    const getResponse = await fetch(`${BASE_URL}/messages`);
    console.log('GET Response:', await getResponse.json());

  } catch (error) {
    console.error('Error testing server:', error);
  }
}

testServer();