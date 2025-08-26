import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

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

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/auth/login', formData);
      
      login(response.data.token);

      console.log('Login successful');
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '18px' }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
};

export default LoginPage;