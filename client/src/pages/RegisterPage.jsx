import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const formContainerStyle = {
  maxWidth: '400px',
  margin: '60px auto',
  padding: '32px',
  borderRadius: '12px',
  background: '#fff',
  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
};

const inputStyle = {
  padding: '10px 14px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem',
};

const buttonStyle = {
  padding: '12px',
  borderRadius: '6px',
  border: 'none',
  background: '#007bff',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
  marginTop: '8px',
};

const errorStyle = {
  color: 'red',
  marginTop: '8px',
  textAlign: 'center',
};

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/auth/register', formData);
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '18px' }}>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <input
          style={inputStyle}
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="user">I am a User</option>
          <option value="provider">I am a Service Provider</option>
        </select>
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
};

export default RegisterPage;