const { GoogleGenerativeAI } = require('@google/generative-ai');

// Validate API key
if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
  console.warn('WARNING: GEMINI_API_KEY is not set or using placeholder value.');
  console.warn('Please set your Gemini API key in .env file.');
  console.warn('Get your API key from: https://ai.google.dev/');
}

// Initialize Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get the generative model
// Try different model names based on what's available with your API key
const getModel = () => {
  // Try gemini-1.5-flash-latest first, fallback to gemini-1.5-pro if needed
  // You can change this to: 'gemini-pro', 'gemini-1.5-pro', 'gemini-1.5-flash', etc.
  const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash-latest';
  return genAI.getGenerativeModel({ model: modelName });
};

module.exports = { getModel };
