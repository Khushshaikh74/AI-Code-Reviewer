import aiService from '../services/ai-service.js';

const aiReview = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ message: 'Prompt is required and must be a string' });
    }

    const response = await aiService(prompt);

    if (!response) {
      return res.status(500).json({ message: 'AI response failed' });
    }

    res.status(200).json({ response });
  } catch (error) {
    console.error('Error in aiReview:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default aiReview;
