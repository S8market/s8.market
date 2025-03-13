import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/context';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, authChecked } = useContext(AppContext);

  if (!authChecked) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/sign-up" />;
};

export default PrivateRoute;
