import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import  Spinner from '../Common/Spinner.jsx';
import { AppContext } from '../../context/context.jsx';

const PrivateRoute = ({ children }) => {
  const { serverUrl, authChecked, setAuthChecked, isAuthenticated, setIsAuthenticated } = useContext(AppContext);

  useEffect(() => {
    axios.get(`${serverUrl}/api/v1/bank-user/verify-token`, {
      withCredentials: true,
      validateStatus: status => status < 400,
    })
      .then((res) => {
        console.log("Auth API response:", res);
        if (res.data?.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((err) => {
        console.error("Auth failed:", err?.response?.data || err.message);
        setIsAuthenticated(false);
      })
      .finally(() => {
        console.log("Auth check completed");
        setAuthChecked(true);
      });
  }, []);

  if (!authChecked) {
    return <Spinner />;
  }

  return isAuthenticated ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;

