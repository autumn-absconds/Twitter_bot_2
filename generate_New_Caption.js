// const axios = require('axios');
import axios from 'axios';
import { config } from 'dotenv';
config();  // Load environment variables from .env


const NAGA_API_KEY = process.env.NAGA_API_KEY;
console.log('NAGA_API_KEY:', NAGA_API_KEY);

// Function to generate a new caption using Naga API
async function generate_New_Caption(imageDescription, imageCaption) {

    // Construct the prompt based on the provided texts
    const prompt = `${imageDescription ? `"${imageDescription}"` : ''} ${imageCaption ? `"${imageCaption}"` : ''}`;

    const requestBody = {
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: 'Compose a succinct, captivating caption for a Twitter post that needs to be requoted. The caption should draw inspiration from the provided texts and, if feasible, mirror the tone of the given imageCaption and should not be long. If no text is provided, return an empty string. The caption should be written in third person, as it will appear as a quote from another post:',
                name: 'instructions',
            },
            {
                role: 'user',
                content: prompt,
                name: 'user-input',
            },
        ],
    };

    try {
        const response = await axios.post('https://api.naga.ac/v1/chat/completions', requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${NAGA_API_KEY}`,
            },
        });

        // Extract and return the generated caption
        return response.data.choices[0].message.content;
    } catch (error) {
        // Handle errors
        console.error('Error:', error.response ? error.response.data : error.message);
        return ''; // Return an empty string in case of an error
    }
}

export default generate_New_Caption;
