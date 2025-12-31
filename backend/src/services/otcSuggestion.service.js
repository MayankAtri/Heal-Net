const { getModel } = require('../config/gemini');
const { OTC_MEDICINE_PROMPT } = require('../constants/prompts');

/**
 * Get OTC medicine suggestions from Gemini AI based on symptoms
 * @param {string} symptomType - Predefined symptom type or 'custom'
 * @param {string} customSymptoms - Custom symptom description (if symptomType is 'custom')
 * @returns {Promise<Object>} OTC medicine suggestions
 */
const getOTCSuggestions = async (symptomType, customSymptoms = '') => {
  try {
    console.log(`Getting OTC suggestions for: ${symptomType}`);
    console.log(`Custom symptoms data: "${customSymptoms}"`);

    const model = getModel();

    // Build the user's symptom description
    const symptomDescription = buildSymptomDescription(symptomType, customSymptoms);
    console.log(`Built symptom description:\n${symptomDescription}`);

    // Combine prompt with symptom description
    const fullPrompt = `${OTC_MEDICINE_PROMPT}

USER SYMPTOMS:
${symptomDescription}

Provide OTC medicine suggestions for these symptoms.`;

    console.log('Requesting OTC suggestions from Gemini AI...');

    // Send to Gemini
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    console.log('OTC suggestions received from Gemini');

    // Parse JSON response
    const suggestions = parseJSONResponse(text);

    // Validate response structure
    validateSuggestions(suggestions);

    return suggestions;

  } catch (error) {
    console.error('Error getting OTC suggestions:', error.message);

    // Handle specific Gemini API errors
    if (error.message.includes('API key')) {
      throw new Error('AI service configuration error. Please check your API key.');
    } else if (error.message.includes('quota') || error.message.includes('limit')) {
      throw new Error('AI service rate limit exceeded. Please try again later.');
    } else if (error.message.includes('timeout')) {
      throw new Error('AI service timeout. Please try again.');
    }

    throw new Error(`Failed to get OTC suggestions: ${error.message}`);
  }
};

/**
 * Build symptom description from symptom type and custom text
 * @param {string} symptomType - Predefined symptom type
 * @param {string} customSymptoms - Custom symptom description (may contain multiple symptoms with severities)
 * @returns {string} Formatted symptom description
 */
const buildSymptomDescription = (symptomType, customSymptoms) => {
  // Mapping of symptom types to descriptions
  const symptomDescriptions = {
    headache: 'headache',
    fever: 'fever (elevated body temperature)',
    cold_flu: 'cold and flu symptoms (runny nose, congestion, sneezing)',
    cough: 'cough',
    sore_throat: 'sore throat',
    body_ache: 'body aches and muscle pain',
    stomach_ache: 'stomach ache or abdominal pain',
    nausea: 'nausea or feeling sick to stomach',
    diarrhea: 'diarrhea',
    allergies: 'allergy symptoms (sneezing, itchy eyes, runny nose)',
    skin_rash: 'skin rash or skin irritation',
    acne: 'acne or pimples',
    indigestion: 'indigestion or heartburn',
    constipation: 'constipation'
  };

  // If custom symptoms, return as-is
  if (symptomType === 'custom') {
    return customSymptoms || 'The user has described custom symptoms.';
  }

  // Check if customSymptoms contains multiple symptoms with severities
  // Format: "headache (severity: 4/5), fever (severity: 3/5), nausea (severity: 2/5)"
  if (customSymptoms && customSymptoms.includes('severity:')) {
    // Parse multiple symptoms with severities
    const symptomParts = customSymptoms.split(',').map(s => s.trim());
    const descriptions = [];

    for (const part of symptomParts) {
      // Extract symptom name and severity
      const match = part.match(/(\w+)\s*\(severity:\s*(\d)\/5\)/);
      if (match) {
        const [, symptomKey, severity] = match;
        const description = symptomDescriptions[symptomKey] || symptomKey;
        const severityText = getSeverityText(parseInt(severity));
        descriptions.push(`${description} (${severityText})`);
      }
    }

    if (descriptions.length > 0) {
      return `The user is experiencing the following symptoms:\n${descriptions.map((d, i) => `${i + 1}. ${d}`).join('\n')}`;
    }
  }

  // Single symptom without severity
  return `The user is experiencing ${symptomDescriptions[symptomType] || 'symptoms'}.`;
};

/**
 * Convert severity level to descriptive text
 * @param {number} severity - Severity level (1-5)
 * @returns {string} Severity description
 */
const getSeverityText = (severity) => {
  const severityMap = {
    1: 'mild severity - barely noticeable',
    2: 'minor severity - noticeable but manageable',
    3: 'moderate severity - uncomfortable',
    4: 'severe - very uncomfortable',
    5: 'extreme severity - unbearable'
  };
  return severityMap[severity] || `severity level ${severity}/5`;
};

/**
 * Parse JSON response from Gemini (handles markdown code blocks)
 * @param {string} text - Raw response text
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

/**
 * Validate OTC suggestions response structure
 * @param {Object} suggestions - Parsed suggestions object
 * @throws {Error} If validation fails
 */
const validateSuggestions = (suggestions) => {
  if (!suggestions.summary) {
    throw new Error('Invalid response: missing summary');
  }

  if (!suggestions.medicines || !Array.isArray(suggestions.medicines)) {
    throw new Error('Invalid response: missing or invalid medicines array');
  }

  if (!suggestions.whenToSeeDoctor || !Array.isArray(suggestions.whenToSeeDoctor)) {
    throw new Error('Invalid response: missing when to see doctor information');
  }

  // Ensure all required fields are present
  suggestions.homeRemedies = suggestions.homeRemedies || [];
  suggestions.generalAdvice = suggestions.generalAdvice || [];
  suggestions.medicalDisclaimer = suggestions.medicalDisclaimer ||
    'Please consult a healthcare professional before taking any medication.';
};

module.exports = {
  getOTCSuggestions
};
