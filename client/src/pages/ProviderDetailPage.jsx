import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from '../api/axiosConfig';
import AuthContext from '../context/AuthContext';
import { format } from 'date-fns';

const containerStyle = {
  maxWidth: '900px',
  margin: '60px auto',
  padding: '36px',
  borderRadius: '16px',
  background: '#fff',
  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
};

const headerStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#ffb347',
  marginBottom: '8px',
  letterSpacing: '1px',
};

const subHeaderStyle = {
  fontSize: '1.1rem',
  color: '#232526',
  marginBottom: '24px',
};

const panelLayoutStyle = {
  display: 'flex',
  gap: '2.5rem',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  minHeight: '320px',
};

const leftPanelStyle = {
  flex: 1,
  paddingRight: '32px',
  borderRight: '2px solid #ffe0b2',
  minWidth: '300px',
};

const rightPanelStyle = {
  flex: 1,
  paddingLeft: '32px',
  minWidth: '300px',
};

const labelStyle = {
  color: '#b26a00',
  fontWeight: 'bold',
};

const slotButtonStyle = {
  margin: '6px 8px 6px 0',
  padding: '10px 18px',
  borderRadius: '6px',
  border: 'none',
  background: 'linear-gradient(90deg, #ffb347 0%, #ffcc33 100%)',
  color: '#232526',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'background 0.2s, color 0.2s',
  boxShadow: '0 2px 8px rgba(255,179,71,0.08)',
};

const ProviderDetailPage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [provider, setProvider] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Fetch provider details
  useEffect(() => {
    const fetchProvider = async () => {
      const { data } = await api.get(`/providers/${id}`);
      setProvider(data);
    };
    fetchProvider();
  }, [id]);

  // Fetch available slots whenever the date changes
  useEffect(() => {
    if (!provider) return;
    const fetchSlots = async () => {
      setLoadingSlots(true);
      try {
        const dateString = format(selectedDate, 'yyyy-MM-dd');
        const { data } = await api.get(`/providers/${id}/availability?date=${dateString}`);
        setAvailableSlots(data);
      } catch (error) {
        console.error("Failed to fetch slots", error);
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [selectedDate, provider, id]);

  const handleBooking = async (timeSlot) => {
    if (!token) {
      alert('Please log in to book.');
      return;
    }
    try {
      // Combine date and time
      const [hours, minutes] = timeSlot.split(':');
      const appointmentDate = new Date(selectedDate);
      appointmentDate.setHours(hours, minutes, 0, 0);

      await api.post('/appointments/book', {
        providerId: id,
        appointmentDate,
      });

      alert(`Appointment booked for ${format(appointmentDate, 'PPpp')}!`);
      // Refetch slots to show updated availability
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      const { data } = await api.get(`/providers/${id}/availability?date=${dateString}`);
      setAvailableSlots(data);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to book appointment.');
    }
  };

  if (!provider) return <p style={{ textAlign: 'center', marginTop: '60px' }}>Loading...</p>;

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>{provider.businessName}</h2>
      <div style={subHeaderStyle}>
        <span style={labelStyle}>{provider.serviceType}</span> by <span style={{ fontWeight: 'bold' }}>{provider.user.name}</span>
      </div>
      <div style={panelLayoutStyle}>
        <div style={leftPanelStyle}>
          <h3 style={{ color: '#b26a00', marginBottom: '18px' }}>Choose Appointment Date</h3>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>
        <div style={rightPanelStyle}>
          <h3 style={{ color: '#b26a00', marginBottom: '18px' }}>
            Available Slots for {format(selectedDate, 'PPP')}
          </h3>
          {loadingSlots ? (
            <p>Loading slots...</p>
          ) : (
            <div>
              {availableSlots.length > 0 ? (
                availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => handleBooking(slot)}
                    style={slotButtonStyle}
                  >
                    {slot}
                  </button>
                ))
              ) : (
                <p>No available slots for this day.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDetailPage;