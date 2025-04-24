import React, { useContext, useState } from 'react';
import axios from 'axios';
import './SignIn.scss';
import { AppContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {serverUrl, setIsAuthenticated} = useContext(AppContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(serverUrl + '/api/v1/bank-user/login', {
        email,
        password,
      }, { withCredentials: true });
      console.log('Sign in successful:', response.data);
      setIsAuthenticated(true)
      navigate('/')
      // Handle successful sign in (e.g., save token, redirect user, etc.)
    } catch (err) {
      console.error('Error during sign in:', err);
      setError('Sign in failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="signin-button">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
