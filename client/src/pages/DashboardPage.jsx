import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axiosConfig';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProviderOnboarding from '../components/ProviderOnboarding';
import AppointmentsDashboard from '../components/AppointmentsDashboard';
import AvailabilitySettings from '../components/AvailabilitySettings';

const DashboardPage = () => {
  const [profile, setProfile] = useState(null);
  const [providerProfile, setProviderProfile] = useState(undefined);
  const [error, setError] = useState('');
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const { data: userProfile } = await api.get('/users/profile');
      setProfile(userProfile);

      if (userProfile.role === 'provider') {
        try {
          const { data: provProfile } = await api.get('/providers/me');
          setProviderProfile(provProfile);
        } catch (provError) {
          if (provError.response && provError.response.status === 404) {
            setProviderProfile(null);
          } else {
            setError('Failed to fetch provider profile.');
          }
        }
      }
    } catch (err) {
      setError('Failed to fetch user profile.');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileCreated = () => {
    fetchProfile();
  };

  // --- STYLES ---
  const styles = {
    container: {
      maxWidth: '900px',
      margin: '2rem auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #eee',
      paddingBottom: '1rem',
      marginBottom: '2rem',
    },
    welcomeMessage: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#333',
    },
    logoutButton: {
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      color: '#fff',
      backgroundColor: '#d9534f',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    loadingText: {
      textAlign: 'center',
      fontSize: '1.2rem',
      color: '#777',
    },
    errorText: {
      textAlign: 'center',
      fontSize: '1.2rem',
      color: 'red',
    },
  };

  if (error) return <p style={styles.errorText}>{error}</p>;
  if (profile === null || providerProfile === undefined) return <p style={styles.loadingText}>Loading profile...</p>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.welcomeMessage}>Welcome, {profile.name}!</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </header>
      
      <main>
        {profile.role === 'provider' && (
          providerProfile ? (
            <>
              <AppointmentsDashboard />
              <AvailabilitySettings providerProfile={providerProfile} />
            </>
          ) : (
            <ProviderOnboarding onProfileCreate={handleProfileCreated} />
          )
        )}
        {/* You can add a dashboard for regular users here */}
        {profile.role === 'user' && (
            <p>Welcome to your dashboard. View your appointments here soon!</p>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
