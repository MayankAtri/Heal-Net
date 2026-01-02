const { verifyAccessToken } = require('../utils/jwt');
const User = require('../models/User.model');

/**
 * Authentication middleware - Requires valid JWT token
 * Protects routes that require authentication (profile, history, etc.)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header or cookies
    let token = null;

    // Check Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remove 'Bearer ' prefix
    }

    // Fallback to cookie if no header token
    if (!token && req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    // If no token found, return 401
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in.'
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message || 'Invalid or expired token. Please log in again.'
      });
    }

    // Find user by ID from token
    const user = await User.findById(decoded.id).select('-password -refreshTokens');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Please log in again.'
      });
    }

    // Attach user to request object
    req.user = user;
    req.userId = user._id;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication failed. Please try again.'
    });
  }
};

/**
 * Optional Authentication middleware - Allows both authenticated and guest users
 * Attaches user to request if token is valid, but doesn't block if token is missing
 * Used for endpoints that work for both guests and logged-in users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const optionalAuth = async (req, res, next) => {
  try {
    // Get token from Authorization header or cookies
    let token = null;

    // Check Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remove 'Bearer ' prefix
    }

    // Fallback to cookie if no header token
    if (!token && req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    // If no token found, continue as guest user
    if (!token) {
      req.user = null;
      req.userId = null;
      return next();
    }

    // Try to verify token
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      // Token invalid/expired - continue as guest
      req.user = null;
      req.userId = null;
      return next();
    }

    // Find user by ID from token
    const user = await User.findById(decoded.id).select('-password -refreshTokens');

    if (!user) {
      // User not found - continue as guest
      req.user = null;
      req.userId = null;
      return next();
    }

    // Attach user to request object
    req.user = user;
    req.userId = user._id;

    next();
  } catch (error) {
    console.error('Optional auth error:', error);
    // On error, continue as guest
    req.user = null;
    req.userId = null;
    next();
  }
};

module.exports = {
  authenticate,
  optionalAuth
};
