require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 5000;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware to parse JSON bodies
app.use(express.json());

// Add CORS middleware to allow frontend to connect
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Make sure a prompt is provided
    if (!prompt) {
      return res.status(400).json({ error: 'No prompt provided' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Using the current model
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });

    res.json(response);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
