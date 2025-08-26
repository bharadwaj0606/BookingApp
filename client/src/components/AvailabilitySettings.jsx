import React, { useState } from 'react';
import api from '../api/axiosConfig';

// A simple component for a provider to set their schedule.
// A real implementation would be more complex.
const AvailabilitySettings = ({ initialSettings }) => {
  const [slotDuration, setSlotDuration] = useState(initialSettings?.slotDuration || 60);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, you'd collect workingHours from form inputs here
      const dummyWorkingHours = [
        { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        // ... etc. for all days
      ];
      await api.post('/providers/profile', { slotDuration, workingHours: dummyWorkingHours });
      alert('Settings saved!');
    } catch (error) {
      alert('Failed to save settings.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Your Availability</h3>
      <label>
        Appointment Duration (minutes):
        <input type="number" value={slotDuration} onChange={(e) => setSlotDuration(e.target.value)} />
      </label>
      <button type="submit">Save Settings</button>
    </form>
  );
};

export default AvailabilitySettings;