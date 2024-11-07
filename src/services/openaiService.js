const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const sendMessage = async (message, apiKey) => {
    try {
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4-1106-preview',
                messages: [{
                    role: 'user',
                    content: message
                }],
                temperature: 0.7,
                max_tokens: 150
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return {
            role: 'assistant',
            content: data.choices[0].message.content,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw error;
    }
}; 