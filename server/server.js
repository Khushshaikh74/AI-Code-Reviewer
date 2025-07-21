// server.js or index.js
import express from 'express';
import dotenv from 'dotenv';
import aiRouter from './src/routers/ai-route.js';
import cors from 'cors'

dotenv.config(); // Load variables from .env

const app = express();

// Optional: Configure CORS for specific origin
app.use(cors({
  origin: 'https://ai-code-reviewer-client.onrender.com', // frontend URL (like Vite/React)
  methods: ['GET', 'POST'],
  credentials: true
}));

// Optional: parse JSON if you expect POST requests with body
app.use(express.json());

// Mount AI routes
app.use('/api/ai', aiRouter);

app.get('/', (req, res) => {
  res.send('<h1>Code Reviewer</h1>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
