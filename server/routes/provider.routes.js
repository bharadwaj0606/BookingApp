const express = require('express');
const {
  createOrUpdateProfile,
  getAllProviders,
  getProviderById,
  getMyProviderProfile,
  getAvailableSlots,
} = require('../controllers/provider.controller.js');
const { protect } = require('../middleware/auth.middleware.js');
const router = express.Router();
router.post('/profile', protect, createOrUpdateProfile);
router.get('/me', protect, getMyProviderProfile);
router.get('/', getAllProviders);
router.get('/:id/availability', getAvailableSlots);
router.get('/:id', getProviderById);
module.exports = router;