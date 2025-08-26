// server/models/serviceProvider.model.js
const mongoose = require('mongoose');

const workingHoursSchema = new mongoose.Schema({
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
}, { _id: false });

const serviceProviderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
    businessName: { type: String, required: true },
    serviceType: { type: String, required: true },
    address: { type: String, required: true },
    workingHours: [workingHoursSchema],
    slotDuration: { type: Number, default: 60 },
}, { timestamps: true });

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);