require('dotenv').config();
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 5000;

// Initialize OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Make sure a prompt is provided
    if (!prompt) {
      return res.status(400).json({ error: 'No prompt provided' });
    }

    const response = await openai.createCompletion({
      model: 'text-davinci-003', // adjust model as needed
      prompt: prompt,
      max_tokens: 150,
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
