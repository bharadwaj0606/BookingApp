import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // --- STYLES ---
  const styles = {
    container: {
      maxWidth: '960px',
      margin: '4rem auto',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
    },
    heroSection: {
      padding: '3rem 1rem',
      backgroundColor: '#f4f7fc',
      borderRadius: '12px',
    },
    title: {
      fontSize: '2.8rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#555',
      maxWidth: '600px',
      margin: '0 auto 2rem auto',
      lineHeight: '1.6',
    },
    ctaContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
    },
    ctaButton: {
      display: 'inline-block',
      padding: '0.8rem 2rem',
      fontSize: '1.1rem',
      textDecoration: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    primaryButton: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
    secondaryButton: {
      backgroundColor: '#6c757d',
      color: '#fff',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.heroSection}>
        <h1 style={styles.title}>Your All-in-One Booking Solution</h1>
        <p style={styles.subtitle}>
          Whether you're looking for a salon, a doctor, or a consultant, our platform makes it easy to find and book appointments with top-rated service providers in your area.
        </p>
        <div style={styles.ctaContainer}>
          <Link to="/register" style={{ ...styles.ctaButton, ...styles.primaryButton }}>
            Get Started
          </Link>
          <Link to="/login" style={{ ...styles.ctaButton, ...styles.secondaryButton }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
