import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // --- STYLES ---
  const styles = {
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#007bff',
      textDecoration: 'none',
    },
    navLinks: {
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'center',
    },
    link: {
      textDecoration: 'none',
      color: '#555',
      fontSize: '1rem',
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
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        Bookify
      </Link>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/providers" style={styles.link}>Browse Providers</Link>
        {token ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
