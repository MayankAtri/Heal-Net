const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User.model');

/**
 * Serialize user for session (not used in JWT auth, but required by Passport)
 */
passport.serializeUser((user, done) => {
  done(null, user._id);
});

/**
 * Deserialize user from session (not used in JWT auth, but required by Passport)
 */
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select('-password -refreshTokens');
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

/**
 * Google OAuth 2.0 Strategy
 * Handles authentication via Google Sign-In
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5001/api/auth/google/callback',
      scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract profile information
        const email = profile.emails[0].value;
        const googleId = profile.id;
        const name = profile.displayName;
        const profilePicture = profile.photos && profile.photos[0] ? profile.photos[0].value : null;

        // Check if user already exists with this Google ID
        let user = await User.findOne({ googleId });

        if (user) {
          // User exists with Google ID - update profile picture if changed
          if (user.profilePicture !== profilePicture) {
            user.profilePicture = profilePicture;
            await user.save();
          }
          return done(null, user);
        }

        // Check if user exists with this email (account linking)
        user = await User.findOne({ email });

        if (user) {
          // Email exists but no Google ID - link accounts
          user.googleId = googleId;
          user.profilePicture = profilePicture || user.profilePicture;
          user.authProvider = user.password ? 'both' : 'google';
          await user.save();
          return done(null, user);
        }

        // Create new user with Google account
        user = await User.create({
          name,
          email,
          googleId,
          profilePicture,
          authProvider: 'google',
          password: undefined // Google users don't have passwords initially
        });

        return done(null, user);
      } catch (error) {
        console.error('Google OAuth error:', error);
        return done(error, null);
      }
    }
  )
);

/**
 * JWT Strategy (for API authentication)
 * Extracts JWT from Authorization header or cookies
 */
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    // Also extract from cookies
    (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies.accessToken;
      }
      return token;
    }
  ]),
  secretOrKey: process.env.JWT_SECRET,
  issuer: 'healnet-api'
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.id).select('-password -refreshTokens');

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;
