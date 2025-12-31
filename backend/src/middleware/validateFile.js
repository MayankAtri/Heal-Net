const fs = require('fs').promises;

/**
 * Validate uploaded file middleware
 * Checks if file exists and is readable
 */
const validateFile = async (req, res, next) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'No prescription image uploaded',
          code: 'NO_FILE'
        }
      });
    }

    // Check if file exists on disk
    try {
      await fs.access(req.file.path);
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Uploaded file is not accessible',
          code: 'FILE_NOT_ACCESSIBLE'
        }
      });
    }

    // File is valid, proceed to next middleware
    next();

  } catch (error) {
    next(error);
  }
};

module.exports = validateFile;
