const { getModel } = require('../config/gemini');
const fs = require('fs').promises;
const {
  REPORT_TYPE_DETECTION_PROMPT,
  BLOOD_TEST_PROMPTS,
  RADIOLOGY_PROMPTS,
  PATHOLOGY_PROMPTS
} = require('../constants/prompts');

/**
 * Detect the type of medical report from an image
 * @param {string} imagePath - Path to the medical report image
 * @returns {Promise<Object>} Report type, subtype, and confidence
 */
const detectReportType = async (imagePath) => {
  try {
    console.log('Detecting report type with Gemini Vision...');

    const model = getModel();

    // Read the file (image or PDF)
    const imageData = await fs.readFile(imagePath);
    const base64Image = imageData.toString('base64');

    // Determine MIME type based on file extension
    let mimeType = 'image/jpeg'; // default
    const lowerPath = imagePath.toLowerCase();
    if (lowerPath.endsWith('.png')) {
      mimeType = 'image/png';
    } else if (lowerPath.endsWith('.pdf')) {
      mimeType = 'application/pdf';
    }

    // Send image with detection prompt to Gemini
    const result = await model.generateContent([
      REPORT_TYPE_DETECTION_PROMPT,
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Image
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();

    console.log('Report type detection response received');

    // Parse JSON response
    const detectionData = parseJSONResponse(text);

    // Validate detection data
    if (!detectionData.reportType) {
      throw new Error('Unable to determine report type');
    }

    return {
      reportType: detectionData.reportType,
      reportSubtype: detectionData.reportSubtype || 'Unknown',
      confidence: detectionData.confidence || 'medium'
    };

  } catch (error) {
    console.error('Report type detection error:', error.message);
    throw new Error(`Failed to detect report type: ${error.message}`);
  }
};

/**
 * Analyze medical report image with specified depth
 * @param {string} imagePath - Path to the medical report image
 * @param {string} reportType - Type of report (blood_test, radiology, pathology)
 * @param {string} analysisDepth - Depth of analysis (simple, detailed, educational)
 * @returns {Promise<Object>} Structured analysis data
 */
const analyzeReport = async (imagePath, reportType, analysisDepth = 'simple') => {
  try {
    console.log(`Analyzing ${reportType} report with ${analysisDepth} depth...`);

    const model = getModel();

    // Read the file (image or PDF)
    const imageData = await fs.readFile(imagePath);
    const base64Image = imageData.toString('base64');

    // Determine MIME type based on file extension
    let mimeType = 'image/jpeg'; // default
    const lowerPath = imagePath.toLowerCase();
    if (lowerPath.endsWith('.png')) {
      mimeType = 'image/png';
    } else if (lowerPath.endsWith('.pdf')) {
      mimeType = 'application/pdf';
    }

    // Build the appropriate prompt
    const prompt = buildPrompt(reportType, analysisDepth);

    // Send image with analysis prompt to Gemini
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

    console.log('Report analysis response received');

    // Parse the response based on report type
    const analysisData = parseResponse(text, reportType);

    return analysisData;

  } catch (error) {
    console.error('Report analysis error:', error.message);

    // Handle specific Gemini API errors
    if (error.message.includes('API key')) {
      throw new Error('AI service configuration error. Please check your API key.');
    } else if (error.message.includes('quota') || error.message.includes('limit')) {
      throw new Error('AI service rate limit exceeded. Please try again later.');
    } else if (error.message.includes('timeout')) {
      throw new Error('AI service timeout. Please try again.');
    }

    throw new Error(`Failed to analyze report: ${error.message}`);
  }
};

/**
 * Build the appropriate prompt based on report type and analysis depth
 * @param {string} reportType - Type of report
 * @param {string} analysisDepth - Depth of analysis
 * @returns {string} The selected prompt
 */
const buildPrompt = (reportType, analysisDepth) => {
  const promptMaps = {
    blood_test: BLOOD_TEST_PROMPTS,
    radiology: RADIOLOGY_PROMPTS,
    pathology: PATHOLOGY_PROMPTS
  };

  const promptMap = promptMaps[reportType];

  if (!promptMap) {
    throw new Error(`Unsupported report type: ${reportType}`);
  }

  const prompt = promptMap[analysisDepth];

  if (!prompt) {
    throw new Error(`Unsupported analysis depth: ${analysisDepth}`);
  }

  return prompt;
};

/**
 * Parse Gemini response and extract JSON
 * @param {string} text - Raw response from Gemini
 * @param {string} reportType - Type of report (for validation)
 * @returns {Object} Parsed analysis data
 */
const parseResponse = (text, reportType) => {
  try {
    const parsed = parseJSONResponse(text);

    // Validate based on report type
    if (reportType === 'blood_test') {
      if (!parsed.bloodTestResults || !Array.isArray(parsed.bloodTestResults)) {
        throw new Error('Invalid blood test response structure');
      }
    } else if (reportType === 'radiology') {
      if (!parsed.radiologyFindings) {
        throw new Error('Invalid radiology response structure');
      }
    } else if (reportType === 'pathology') {
      if (!parsed.pathologyFindings) {
        throw new Error('Invalid pathology response structure');
      }
    }

    // Ensure all responses have required common fields
    return {
      summary: parsed.summary || 'Analysis completed',
      ...parsed,
      generalRecommendations: parsed.generalRecommendations || [],
      warningFlags: parsed.warningFlags || [],
      educationalNotes: parsed.educationalNotes || [],
      medicalDisclaimer: parsed.medicalDisclaimer || 'This analysis is for informational purposes only.'
    };

  } catch (error) {
    console.error('Error parsing response:', error.message);
    console.error('Raw response:', text.substring(0, 500));

    // Return error structure
    return {
      summary: 'Unable to parse report analysis',
      generalRecommendations: ['Failed to analyze report properly. Please consult a healthcare provider.'],
      warningFlags: ['Analysis parsing failed'],
      educationalNotes: [],
      medicalDisclaimer: 'This analysis could not be completed. Please consult your healthcare provider.',
      error: error.message,
      rawResponse: text.substring(0, 200)
    };
  }
};

/**
 * Helper function to parse JSON from text (handles markdown code blocks)
 * @param {string} text - Text containing JSON
 * @returns {Object} Parsed JSON object
 */
const parseJSONResponse = (text) => {
  let jsonText = text.trim();

  // Remove markdown code blocks if present
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/^```json\s*/, '').replace(/```\s*$/, '');
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/^```\s*/, '').replace(/```\s*$/, '');
  }

  return JSON.parse(jsonText);
};

module.exports = {
  detectReportType,
  analyzeReport,
  buildPrompt,
  parseResponse
};
