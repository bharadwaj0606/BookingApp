const express = require('express');
const { getUserProfile } = require('../controllers/user.controller.js');
const { protect } = require('../middleware/auth.middleware.js');
const router = express.Router();
router.get('/profile', protect, getUserProfile);
module.exports = router;