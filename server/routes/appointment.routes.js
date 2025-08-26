const express = require('express');
const router=express.Router();
const {
  createAppointment,
  getProviderBookings,
} = require('../controllers/appointment.controller.js');
const { protect } = require('../middleware/auth.middleware.js');
router.post('/book', protect, createAppointment);
router.get('/my-bookings', protect, getProviderBookings);
module.exports = router;