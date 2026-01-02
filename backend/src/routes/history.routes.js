const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const historyService = require('../services/history.service');

/**
 * @route   GET /api/history
 * @desc    Get user's analysis history (all types)
 * @access  Protected
 * @query   page, limit, type (prescription|report|otc), search, sortBy, sortOrder
 */
router.get('/', authenticate, asyncHandler(async (req, res) => {
  const userId = req.userId;
  const {
    page = 1,
    limit = 20,
    type = null,
    search = null,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  const result = await historyService.getUserHistory(userId, {
    page: parseInt(page),
    limit: parseInt(limit),
    type,
    search,
    sortBy,
    sortOrder
  });

  res.status(200).json({
    success: true,
    ...result
  });
}));

/**
 * @route   GET /api/history/stats
 * @desc    Get user's history statistics
 * @access  Protected
 */
router.get('/stats', authenticate, asyncHandler(async (req, res) => {
  const userId = req.userId;

  const stats = await historyService.getHistoryStats(userId);

  res.status(200).json({
    success: true,
    stats
  });
}));

/**
 * @route   DELETE /api/history/:type/:id
 * @desc    Delete a history item
 * @access  Protected
 * @params  type (prescription|report|otc), id
 */
router.delete('/:type/:id', authenticate, asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { type, id } = req.params;

  await historyService.deleteHistoryItem(userId, id, type);

  res.status(200).json({
    success: true,
    message: 'History item deleted successfully'
  });
}));

module.exports = router;
