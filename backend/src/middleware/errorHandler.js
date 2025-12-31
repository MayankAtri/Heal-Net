/**
 * Global error handling middleware
 * Handles all errors and returns consistent JSON responses
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error response
  let statusCode = 500;
  let errorResponse = {
    success: false,
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    }
  };

  // Multer file upload errors
  if (err.name === 'MulterError') {
    statusCode = 400;
    if (err.code === 'LIMIT_FILE_SIZE') {
      errorResponse.error = {
        message: 'File size exceeds 5MB limit',
        code: 'FILE_TOO_LARGE'
      };
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      errorResponse.error = {
        message: 'Unexpected file field',
        code: 'UNEXPECTED_FILE'
      };
    } else {
      errorResponse.error = {
        message: err.message,
        code: 'UPLOAD_ERROR'
      };
    }
  }
  // File type validation error (from multer fileFilter)
  else if (err.message && err.message.includes('Invalid file type')) {
    statusCode = 400;
    errorResponse.error = {
      message: 'Invalid file type. Only JPG, JPEG, and PNG images are allowed.',
      code: 'INVALID_FILE_TYPE'
    };
  }
  // MongoDB validation errors
  else if (err.name === 'ValidationError') {
    statusCode = 400;
    errorResponse.error = {
      message: 'Validation error',
      code: 'VALIDATION_ERROR',
      details: Object.values(err.errors).map(e => e.message)
    };
  }
  // MongoDB cast errors (invalid ObjectId)
  else if (err.name === 'CastError') {
    statusCode = 400;
    errorResponse.error = {
      message: 'Invalid ID format',
      code: 'INVALID_ID'
    };
  }
  // MongoDB duplicate key errors
  else if (err.code === 11000) {
    statusCode = 409;
    errorResponse.error = {
      message: 'Duplicate entry',
      code: 'DUPLICATE_ENTRY'
    };
  }
  // Custom application errors
  else if (err.message) {
    // OCR errors
    if (err.message.includes('No text detected') || err.message.includes('extract text')) {
      statusCode = 422;
      errorResponse.error = {
        message: err.message,
        code: 'OCR_ERROR'
      };
    }
    // Gemini AI errors
    else if (err.message.includes('AI service') || err.message.includes('API key')) {
      statusCode = 500;
      errorResponse.error = {
        message: err.message,
        code: 'AI_SERVICE_ERROR'
      };
    }
    // Rate limit errors
    else if (err.message.includes('rate limit')) {
      statusCode = 429;
      errorResponse.error = {
        message: err.message,
        code: 'RATE_LIMIT_EXCEEDED'
      };
    }
    // Not found errors
    else if (err.message.includes('not found')) {
      statusCode = 404;
      errorResponse.error = {
        message: err.message,
        code: 'NOT_FOUND'
      };
    }
    // Generic error with custom message
    else {
      errorResponse.error.message = err.message;
      errorResponse.error.code = err.code || 'ERROR';
    }
  }

  // Add stack trace in development mode
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
