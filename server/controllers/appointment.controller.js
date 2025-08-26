const Appointment = require('../models/appointment.model.js');
const ServiceProvider = require('../models/serviceProvider.model.js');

exports.createAppointment = async (req, res) => {
    try {
        const { providerId, appointmentDate } = req.body;
        const userId = req.user.id;
        const existingAppointment = await Appointment.findOne({ provider: providerId, appointmentDate });
        if (existingAppointment) {
            return res.status(409).json({ message: 'This time slot is already booked.' });
        }
        const appointment = await Appointment.create({ user: userId, provider: providerId, appointmentDate });
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProviderBookings = async (req, res) => {
    try {
        const providerProfile = await ServiceProvider.findOne({ user: req.user.id });
        if (!providerProfile) {
            return res.status(404).json({ message: 'Provider profile not found.' });
        }
        const bookings = await Appointment.find({ provider: providerProfile._id })
            .populate('user', 'name email')
            .sort({ appointmentDate: 'asc' });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};