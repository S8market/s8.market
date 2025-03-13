import './userAvatar.scss';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/context';
import axios from 'axios';

export const UserAvatar = ({ imageSrc, name, address, size = 'small' }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Hook for programmatic navigation
  
  // Safely extract context values with fallbacks
  const contextValue = useContext(AppContext) || {};
  const {
    avatar = imageSrc || 'default-avatar.png', 
    userDetails = {}, 
    serverUrl = '', 
    isAuthenticated = false 
  } = contextValue;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    if (!serverUrl) {
      console.error('Server URL is not available');
      return;
    }
    try {
      await axios.get(serverUrl + "/api/v1/bank-user/logout", {
        withCredentials: true, 
      })
    } catch (error) {
      console.log(error)
    }
  };

  // Fallback values
  const displayName = userDetails.firstName || name || 'User';
  const displayAddress = address || userDetails.bankAddress || '';

  return (
    <div className="avatarContainer">
      <img
        src={avatar || 'default-avatar.png'}
        alt={`${displayName}'s profile picture`}
        className={`${'avatarImage'} ${size}`}
      />
      {(displayName || displayAddress) && (
        <div className="userInfo">
          <span className="userName">{displayName}</span>
          {displayAddress && <span className="userLocation">{displayAddress}</span>}
        </div>
      )}
      <button
        className="settingsIcon"
        aria-label="User settings"
        onClick={toggleDropdown}
      >
        <img
          loading="lazy"
          src="dropdown.png"
          alt=""
        />
      </button>
      {isDropdownOpen && (
        <div className="dropdownMenu">
          <ul>
            <li>
              <Link to="/profile" className="dropdownItem">
                <img src="user1.png" alt="Profile Icon" className="dropdownIcon" />
                <span>Profile</span>
              </Link>
            </li>
            <li onClick={handleLogout} className="dropdownItem">
              <img src="power.png" alt="Logout Icon" className="dropdownIcon" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

UserAvatar.propTypes = {
  imageSrc: PropTypes.string,
  name: PropTypes.string,
  address: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

UserAvatar.defaultProps = {
  size: 'small',
  imageSrc: 'default-avatar.png'
};
