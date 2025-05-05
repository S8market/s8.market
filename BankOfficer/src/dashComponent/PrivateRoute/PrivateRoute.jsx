import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = (value) => {
    setIsAuthenticated(value);
  };

  useEffect(() => {
    axios.get('/api/v1/bank-user/verify-token', {
      withCredentials: true,
      validateStatus: status => (status >= 200 && status < 300) || status === 304 
    })
    .then((res) => {
      // if(res.data.success) {
        console.log(res);
        handleAuthSuccess(true);
  
      // }
    })
    .catch(() => {
      handleAuthSuccess(false);
    })
    .finally(() => {
      setAuthChecked(true);
      console.log("Auth check completed");
    });
  }, []);

  if (!authChecked) {
    return <div>Checking authentication...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
