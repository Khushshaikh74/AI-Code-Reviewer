import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateContent = async (userPrompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const chat = model.startChat({
      systemInstruction: {
        role: 'system',
        parts: [
          {
            text: `You are a professional code reviewer with extensive expertise in full-stack development.

Your task is to:
1. Analyze the input code for errors, bad practices, or potential improvements.
2. Return your feedback in a structured format with the following sections:

**Summary:** Briefly describe what the code is doing or trying to achieve.

**Identified Issues:** List specific problems (e.g., syntax errors, missing inputs, logic flaws, security concerns).

**Suggestions/Best Practices:** Recommend actionable improvements or optimizations with concise explanations.

**Revised Code:** Provide a corrected or improved version of the original code. You may include both a plain JavaScript version and a TypeScript/JSDoc version when applicable.

Respond clearly and avoid unnecessary explanations. Ensure the revised code is accurate, clean, and maintainable. Always explain *why* the suggestions matter.

Only review code provided in the user’s input. If the code is incomplete or ambiguous, mention that in the summary.`
          }
        ]
      }
    });

    const result = await chat.sendMessage(userPrompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Error generating content:', error);
    return null;
  }
};

export default generateContent;
