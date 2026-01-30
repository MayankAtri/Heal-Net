const { getModel } = require('../config/gemini');
const fs = require('fs').promises;

/**
 * Analyze prescription image directly with Gemini Vision
 * @param {string} imagePath - Path to the prescription image file
 * @returns {Promise<Object>} Simplified and structured prescription analysis
 */
const analyzePrescriptionImage = async (imagePath) => {
  try {
    console.log('Starting Gemini AI vision analysis...');

    const model = getModel();

    // Read the image file
    const imageData = await fs.readFile(imagePath);
    const base64Image = imageData.toString('base64');

    // Determine the MIME type based on file extension
    const mimeType = imagePath.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';

    // Craft detailed prompt for vision-based prescription analysis
    const prompt = `You are an expert medical prescription analyzer. Analyze the prescription image provided and extract ALL medicine information.

TASK: Carefully read this prescription image and extract:
1. ALL medicine names (brand names and generic names)
2. Dosage form and strength (tablet, capsule, syrup with strength)
3. How many to take at a time (1 tablet, 2 capsules, 5ml, etc.)
4. Frequency (how often to take: twice daily, BID, TID, morning, night, etc.)
5. Duration (how long: 7 days, 2 weeks, etc.)
6. Any warnings, instructions, or contraindications mentioned

IMPORTANT:
- Read the ENTIRE prescription carefully - don't miss any medicines
- Look for handwritten text and printed text
- Handle doctor's handwriting carefully
- Extract common abbreviations: Tab (tablet), Cap (capsule), Syr (syrup), Inj (injection), OD (once daily), BD/BID (twice daily), TDS/TID (thrice daily)
- If you see partial or unclear medicine names, use your medical knowledge to infer the complete name
- Look for Rx symbols, prescription pads, doctor signatures - these indicate prescription sections
- DOSAGE MUST BE PRACTICAL: Instead of just "500mg", write "1 tablet (500mg)" or "2 capsules" or "5ml syrup"

Extract and return ONLY a JSON object with this exact structure:
{
  "medicines": [
    {
      "name": "Medicine name (with correct spelling)",
      "genericName": "Generic/chemical name if identifiable",
      "form": "Form of medicine (tablet, capsule, syrup, injection, cream, drops)",
      "strength": "Strength per unit (e.g., 500mg, 250mg/5ml)",
      "dosage": "PRACTICAL dosage - how many to take at once (e.g., '1 tablet', '2 capsules', '5ml', '10 drops')",
      "frequency": "How often (e.g., 'twice daily', 'every 8 hours', 'morning and night')",
      "duration": "How long (e.g., '7 days', '2 weeks', 'until finished')",
      "timing": "When to take (e.g., 'after meals', 'before bed', 'empty stomach', 'with food')"
    }
  ],
  "warnings": ["Important warnings or side effects if visible"],
  "instructions": "General instructions if visible",
  "contraindications": ["What to avoid if mentioned"]
}

Rules:
- Extract ALL medicines you can see in the image
- Use your medical knowledge to correct unclear handwriting
- ALWAYS provide practical dosage like "1 tablet" or "2 capsules" NOT just "500mg"
- If strength is visible, include it in parentheses: "1 tablet (500mg)"
- For syrups, always specify ml: "5ml" or "10ml (1 teaspoon)"
- Use "Not specified" for missing information
- If the image is completely unreadable or not a prescription, explain in the instructions field
- Return valid JSON only, no markdown formatting
`;

    // Send image to Gemini Vision API
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Image
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();

    console.log('Gemini AI response received');

    // Parse the JSON response
    const simplifiedData = parseGeminiResponse(text);

    return simplifiedData;

  } catch (error) {
    console.error('Gemini AI processing error:', error.message);

    // Handle specific Gemini API errors
    if (error.message.includes('API key')) {
      throw new Error('AI service configuration error. Please check your API key.');
    } else if (error.message.includes('quota') || error.message.includes('limit')) {
      throw new Error('AI service rate limit exceeded. Please try again later.');
    } else if (error.message.includes('timeout')) {
      throw new Error('AI service timeout. Please try again.');
    }

    throw new Error(`Failed to process prescription with AI: ${error.message}`);
  }
};

/**
 * Parse Gemini response and extract JSON
 * @param {string} text - Raw response from Gemini
 * @returns {Object} Parsed JSON object
 */
const parseGeminiResponse = (text) => {
  try {
    // Remove markdown code blocks if present
    let jsonText = text.trim();

    // Remove ```json and ``` if present
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/```\s*$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/```\s*$/, '');
    }

    const parsed = JSON.parse(jsonText);

    // Validate the structure
    if (!parsed.medicines || !Array.isArray(parsed.medicines)) {
      throw new Error('Invalid response structure: missing medicines array');
    }

    // Ensure all required fields have default values
    return {
      medicines: parsed.medicines || [],
      warnings: parsed.warnings || [],
      instructions: parsed.instructions || 'Not specified',
      contraindications: parsed.contraindications || []
    };

  } catch (error) {
    console.error('Error parsing Gemini response:', error.message);
    console.error('Raw response:', text);

    // Return a basic structure if parsing fails
    return {
      medicines: [{
        name: 'Unable to parse prescription',
        genericName: 'Not specified',
        form: 'Not specified',
        strength: 'Not specified',
        dosage: 'Not specified',
        frequency: 'Not specified',
        duration: 'Not specified',
        timing: 'Not specified'
      }],
      warnings: ['Failed to analyze prescription properly. Please consult a pharmacist.'],
      instructions: 'Original text: ' + text.substring(0, 200),
      contraindications: []
    };
  }
};

module.exports = {
  analyzePrescriptionImage
};
