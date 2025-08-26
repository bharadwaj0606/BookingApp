import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const pageContainerStyle = {
  maxWidth: '800px',
  margin: '60px auto',
  padding: '32px',
  borderRadius: '14px',
  background: '#fff',
  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
};

const headingStyle = {
  textAlign: 'center',
  color: '#ffb347',
  fontWeight: 'bold',
  fontSize: '2rem',
  marginBottom: '28px',
  letterSpacing: '1px',
};

const providersGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '24px',
};

const cardStyle = {
  borderRadius: '10px',
  background: 'linear-gradient(120deg, #fffbe6 60%, #ffe0b2 100%)',
  boxShadow: '0 2px 12px rgba(255,179,71,0.10)',
  padding: '22px 20px',
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'box-shadow 0.2s, transform 0.2s',
};

const nameStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#232526',
  marginBottom: '4px',
};

const labelStyle = {
  color: '#b26a00',
  fontWeight: 'bold',
};

const ProvidersListPage = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await api.get('/providers');
        setProviders(response.data);
      } catch (err) {
        setError('Failed to fetch providers.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '60px' }}>Loading providers...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '60px' }}>{error}</p>;

  return (
    <div style={pageContainerStyle}>
      <h2 style={headingStyle}>Our Service Providers 👩‍⚕️💅</h2>
      {providers.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No providers found.</p>
      ) : (
        <div style={providersGridStyle}>
          {providers.map((provider) => (
            <Link
              to={`/provider/${provider._id}`}
              key={provider._id}
              style={cardStyle}
            >
              <div style={nameStyle}>{provider.businessName}</div>
              <div>
                <span style={labelStyle}>Service:</span> {provider.serviceType}
              </div>
              <div>
                <span style={labelStyle}>Contact:</span> {provider.user.name} ({provider.user.email})
              </div>
              <div>
                <span style={labelStyle}>Location:</span> {provider.address}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProvidersListPage;