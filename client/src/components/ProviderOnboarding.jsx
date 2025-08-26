import React, { useState } from 'react';
import api from '../api/axiosConfig';

const ProviderOnboarding = ({ onProfileCreate }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    serviceType: '',
    address: '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // This creates the initial profile. Schedule can be set later.
      await api.post('/providers/profile', formData);
      alert('Profile created successfully! You can now manage your schedule.');
      onProfileCreate(); // This function will refetch the data in the parent component
    } catch (error) {
      alert('Failed to create profile.');
    }
  };

  return (
    <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd' }}>
      <h3>Welcome! Please set up your business profile.</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="businessName" placeholder="Business Name" onChange={handleChange} required />
        <input type="text" name="serviceType" placeholder="Service Type (e.g., Salon)" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Business Address" onChange={handleChange} required />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProviderOnboarding;