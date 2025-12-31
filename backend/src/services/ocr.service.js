const Tesseract = require('tesseract.js');

/**
 * Extract text from an image using Tesseract OCR
 * @param {string} imagePath - Path to the image file
 * @returns {Promise<string>} Extracted text from the image
 */
const extractTextFromImage = async (imagePath) => {
  try {
    console.log(`Starting OCR processing for: ${imagePath}`);

    const result = await Tesseract.recognize(
      imagePath,
      'eng', // Language: English
      {
        logger: (info) => {
          // Log OCR progress
          if (info.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(info.progress * 100)}%`);
          }
        }
      }
    );

    const extractedText = result.data.text;

    // Clean up the extracted text
    const cleanedText = cleanText(extractedText);

    if (!cleanedText || cleanedText.trim().length === 0) {
      throw new Error('No text detected in the image. Please ensure the image contains readable text.');
    }

    console.log(`OCR completed. Extracted ${cleanedText.length} characters.`);
    return cleanedText;

  } catch (error) {
    console.error('OCR processing error:', error.message);

    if (error.message.includes('No text detected')) {
      throw error;
    }

    throw new Error(`Failed to extract text from image: ${error.message}`);
  }
};

/**
 * Clean and normalize extracted text
 * @param {string} text - Raw OCR text
 * @returns {string} Cleaned text
 */
const cleanText = (text) => {
  if (!text) return '';

  return text
    // Remove excessive whitespace
    .replace(/\s+/g, ' ')
    // Remove special OCR artifacts
    .replace(/[|_]{2,}/g, '')
    // Trim leading/trailing whitespace
    .trim();
};

module.exports = {
  extractTextFromImage
};
