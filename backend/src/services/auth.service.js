const User = require('../models/User.model');
const { generateTokenPair, verifyRefreshToken } = require('../utils/jwt');

/**
 * Register a new user with email and password
 * @param {Object} userData - User registration data
 * @returns {Object} { user, tokens }
 */
const registerUser = async ({ name, email, password }) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    authProvider: 'local'
  });

  // Generate tokens
  const tokens = generateTokenPair(user);

  // Save refresh token to database
  await user.addRefreshToken(tokens.refreshToken);

  return {
    user: user.getPublicProfile(),
    tokens
  };
};

/**
 * Login user with email and password
 * @param {String} email - User email
 * @param {String} password - User password
 * @returns {Object} { user, tokens }
 */
const loginUser = async (email, password) => {
  // Find user by email (include password for comparison)
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check if user has a password (not Google-only user)
  if (!user.password) {
    throw new Error('This account uses Google Sign-In. Please log in with Google.');
  }

  // Verify password
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate tokens
  const tokens = generateTokenPair(user);

  // Save refresh token to database
  await user.addRefreshToken(tokens.refreshToken);

  return {
    user: user.getPublicProfile(),
    tokens
  };
};

/**
 * Refresh access token using refresh token
 * @param {String} refreshToken - JWT refresh token
 * @returns {Object} { accessToken, refreshToken }
 */
const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error('Refresh token is required');
  }

  // Verify refresh token
  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw new Error(error.message || 'Invalid or expired refresh token');
  }

  // Find user and check if refresh token exists in database
  const user = await User.findById(decoded.id);

  if (!user) {
    throw new Error('User not found');
  }

  // Check if refresh token exists in user's refresh tokens array
  const tokenExists = user.refreshTokens.some(rt => rt.token === refreshToken);

  if (!tokenExists) {
    throw new Error('Refresh token not found or has been revoked');
  }

  // Generate new token pair
  const tokens = generateTokenPair(user);

  // Remove old refresh token and add new one
  await user.removeRefreshToken(refreshToken);
  await user.addRefreshToken(tokens.refreshToken);

  return tokens;
};

/**
 * Logout user by removing refresh token
 * @param {String} userId - User ID
 * @param {String} refreshToken - JWT refresh token to remove
 * @returns {Boolean} Success status
 */
const logoutUser = async (userId, refreshToken) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (refreshToken) {
    // Remove specific refresh token (logout from current device)
    await user.removeRefreshToken(refreshToken);
  } else {
    // Remove all refresh tokens (logout from all devices)
    await user.clearRefreshTokens();
  }

  return true;
};

/**
 * Get user profile by ID
 * @param {String} userId - User ID
 * @returns {Object} User profile
 */
const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password -refreshTokens');

  if (!user) {
    throw new Error('User not found');
  }

  return user.getPublicProfile();
};

/**
 * Update user profile
 * @param {String} userId - User ID
 * @param {Object} updates - Profile updates
 * @returns {Object} Updated user profile
 */
const updateUserProfile = async (userId, updates) => {
  const allowedUpdates = ['name', 'profilePicture'];
  const updateKeys = Object.keys(updates);

  // Validate updates
  const isValidUpdate = updateKeys.every(key => allowedUpdates.includes(key));

  if (!isValidUpdate) {
    throw new Error('Invalid updates. Only name and profilePicture can be updated.');
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  // Apply updates
  updateKeys.forEach(key => {
    user[key] = updates[key];
  });

  await user.save();

  return user.getPublicProfile();
};

/**
 * Change user password
 * @param {String} userId - User ID
 * @param {String} currentPassword - Current password
 * @param {String} newPassword - New password
 * @returns {Boolean} Success status
 */
const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select('+password');

  if (!user) {
    throw new Error('User not found');
  }

  // For Google-only users, allow setting password
  if (!user.password) {
    user.password = newPassword;
    user.authProvider = user.googleId ? 'both' : 'local';
    await user.save();
    return true;
  }

  // Verify current password
  const isPasswordValid = await user.comparePassword(currentPassword);

  if (!isPasswordValid) {
    throw new Error('Current password is incorrect');
  }

  // Set new password
  user.password = newPassword;
  await user.save();

  // Clear all refresh tokens to force re-login on all devices
  await user.clearRefreshTokens();

  return true;
};

/**
 * Handle Google OAuth login/signup
 * @param {Object} user - User object from Passport Google strategy
 * @returns {Object} { user, tokens }
 */
const handleGoogleAuth = async (user) => {
  // Generate tokens
  const tokens = generateTokenPair(user);

  // Save refresh token to database
  await user.addRefreshToken(tokens.refreshToken);

  return {
    user: user.getPublicProfile(),
    tokens
  };
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  handleGoogleAuth
};
