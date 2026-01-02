require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const passport = require('./src/config/passport');
const connectDB = require('./src/config/database');
const routes = require('./src/routes');
const errorHandler = require('./src/middleware/errorHandler');

// Initialize Express app
const app = express();

// Trust proxy - Required for Render and rate limiting
app.set('trust proxy', 1);

// Connect to MongoDB
connectDB();

// Security middleware - Helmet
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://heal-net-three.vercel.app',
  process.env.FRONTEND_URL // Add your production frontend URL in Render env vars
].filter(Boolean); // Remove undefined/null values

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check if origin matches (with or without trailing slash)
    const originWithoutSlash = origin.endsWith('/') ? origin.slice(0, -1) : origin;
    const isAllowed = allowedOrigins.some(allowed => {
      const allowedWithoutSlash = allowed?.endsWith('/') ? allowed.slice(0, -1) : allowed;
      return allowedWithoutSlash === originWithoutSlash;
    });

    if (!isAllowed) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware (for JWT in cookies)
app.use(cookieParser());

// Initialize Passport
app.use(passport.initialize());

// HTTP request logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: {
      message: 'Too many requests from this IP, please try again later.',
      code: 'RATE_LIMIT_EXCEEDED'
    }
  }
});

app.use('/api/', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    database: 'connected',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api', routes);

// Welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'HealNet Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      analyze: 'POST /api/prescriptions/analyze',
      getPrescription: 'GET /api/prescriptions/:id',
      listPrescriptions: 'GET /api/prescriptions'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Route not found',
      code: 'NOT_FOUND'
    }
  });
});

// Global error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 HealNet Backend Server Running`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 API URL: http://localhost:${PORT}`);
  console.log(`💊 Ready to analyze prescriptions!\n`);
});
2