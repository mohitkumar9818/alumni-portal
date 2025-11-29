const axios = require('axios');

async function testAIChat() {
    console.log('🤖 Testing AI Chat Feature...\n');

    // First, login to get a token
    console.log('Step 1: Logging in...');
    try {
        const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'sarah@example.com',
            password: 'password123'
        });

        const token = loginResponse.data.token;
        console.log('✅ Login successful!\n');

        // Test AI chat
        console.log('Step 2: Sending message to AI...');
        const chatResponse = await axios.post(
            'http://localhost:5000/api/ai/chat',
            {
                message: 'How can I improve my resume?'
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        console.log('✅ AI Response received!\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('AI Response:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(chatResponse.data.message);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        console.log('🎉 AI Chat is working perfectly!');
        console.log('\nYou can now use the AI Chat feature in your app at:');
        console.log('http://localhost:5173/ai-chat');

    } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);

        if (error.response?.status === 401) {
            console.log('\n⚠️  Authentication failed. Make sure the backend is running and database is seeded.');
        } else if (error.code === 'ECONNREFUSED') {
            console.log('\n⚠️  Cannot connect to backend. Make sure it\'s running on port 5000.');
        }
    }
}

testAIChat();
