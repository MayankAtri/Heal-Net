const express = require('express');
const router = express.Router();
const { optionalAuth } = require('../middleware/auth');
const {
  getOTCSuggestions,
  getConsultation,
  listConsultations,
  getStatistics
} = require('../controllers/otcConsultation.controller');

/**
 * OTC Consultation Routes
 * Base path: /api/otc
 */

// POST /api/otc/consult
// Get OTC medicine suggestions for symptoms
router.post('/consult', optionalAuth, getOTCSuggestions);

// GET /api/otc/stats/overview
// Get statistics (must be before /:id to avoid route conflicts)
router.get('/stats/overview', getStatistics);

// GET /api/otc/:id
// Get single OTC consultation by ID
router.get('/:id', getConsultation);

// GET /api/otc
// Get all OTC consultations with pagination and filters
router.get('/', listConsultations);

module.exports = router;
