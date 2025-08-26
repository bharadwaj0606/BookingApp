// server/models/appointment.model.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    provider: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ServiceProvider' },
    appointmentDate: { type: Date, required: true },
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
}, { timestamps: true });

appointmentSchema.index({ provider: 1, appointmentDate: 1 }, { unique: true });

module.exports = mongoose.model('Appointment', appointmentSchema);