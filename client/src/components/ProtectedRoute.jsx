import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext);

  // If there's a token, render the child routes.
  // Otherwise, navigate to the login page.
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;