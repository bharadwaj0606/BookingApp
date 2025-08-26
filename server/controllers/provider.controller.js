const { format, parse, addMinutes, isBefore } = require('date-fns');
const { utcToZonedTime } = require('date-fns-tz');

// Re-importing models in this file
const ProviderModel = require('../models/serviceProvider.model.js');
const AppointmentModel = require('../models/appointment.model.js');

exports.createOrUpdateProfile = async (req, res) => {
    if (req.user.role !== 'provider') {
        return res.status(403).json({ message: 'Forbidden: Access denied.' });
    }
    try {
        const { businessName, serviceType, address, workingHours, slotDuration } = req.body;
        const profileFields = { user: req.user.id, businessName, serviceType, address, workingHours, slotDuration };
        const profile = await ProviderModel.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllProviders = async (req, res) => {
    try {
        const providers = await ProviderModel.find({}).populate('user', 'name email');
        res.json(providers);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProviderById = async (req, res) => {
    try {
        const provider = await ProviderModel.findById(req.params.id).populate('user', 'name email');
        if (provider) {
            res.json(provider);
        } else {
            res.status(404).json({ message: 'Provider not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getMyProviderProfile = async (req, res) => {
    try {
        const providerProfile = await ProviderModel.findOne({ user: req.user.id }).populate('user', 'name email');
        if (!providerProfile) {
            return res.status(404).json({ message: 'Provider profile not found for this user.' });
        }
        res.json(providerProfile);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAvailableSlots = async (req, res) => {
    try {
        const { date } = req.query;
        const providerId = req.params.id;
        const startOfDay = new Date(date).setHours(0, 0, 0, 0);
        const endOfDay = new Date(date).setHours(23, 59, 59, 999);
        const existingAppointments = await AppointmentModel.find({
            provider: providerId,
            appointmentDate: { $gte: startOfDay, $lt: endOfDay },
        });

        if (existingAppointments.length >= 20) {
            return res.json([]);
        }

        const provider = await ProviderModel.findById(providerId);

        if (!provider || !provider.workingHours || provider.workingHours.length === 0) {
            return res.json([]);
        }

        const timeZone = 'Asia/Kolkata';
        const requestedDate = utcToZonedTime(new Date(date), timeZone);
        const dayOfWeek = format(requestedDate, 'EEEE');
        const schedule = provider.workingHours.find(wh => wh.day === dayOfWeek && wh.isAvailable);
        
        if (!schedule) {
            return res.json([]);
        }

        const bookedTimes = new Set(existingAppointments.map(app => format(utcToZonedTime(app.appointmentDate, timeZone), 'HH:mm')));
        const availableSlots = [];
        const slotDuration = provider.slotDuration;
        let currentTime = parse(schedule.startTime, 'HH:mm', requestedDate);
        const endTime = parse(schedule.endTime, 'HH:mm', requestedDate);

        while (isBefore(currentTime, endTime)) {
            const timeSlot = format(currentTime, 'HH:mm');
            if (!bookedTimes.has(timeSlot)) {
                availableSlots.push(timeSlot);
            }
            currentTime = addMinutes(currentTime, slotDuration);
        }
        res.json(availableSlots);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
