import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { format } from 'date-fns';

const AppointmentsDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/appointments/my-bookings');
        setBookings(data);
      } catch (error) {
        console.error("Could not fetch bookings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <p>Loading your appointments...</p>;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Your Appointments ({bookings.length} total)</h3>
      {bookings.length === 0 ? (
        <p>You have no appointments yet.</p>
      ) : (
        bookings.map(booking => (
          <div key={booking._id} style={{ border: '1px solid #eee', padding: '10px', margin: '10px 0' }}>
            <p><strong>Date:</strong> {format(new Date(booking.appointmentDate), 'PPPpp')}</p>
            <p><strong>Customer:</strong> {booking.user.name} ({booking.user.email})</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AppointmentsDashboard;