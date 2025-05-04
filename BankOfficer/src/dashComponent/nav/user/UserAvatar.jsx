import './userAvatar.scss';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/context';
import axios from 'axios';

export const UserAvatar = ({ imageSrc, name, address, size = 'small' }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Hook for programmatic navigation
  const {avatar, userDetails} = useContext(AppContext)
  const {serverUrl, setIsAuthenticated, setAvatar, setUserFormValues,setBankOfficerFormValues} = useContext(AppContext)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      const {data} = await axios.get(serverUrl + "/api/v1/bank-user/logout", {withCredentials: true});
      console.log(data)
      
      // Clear local authentication state
      setIsAuthenticated(false);
      navigate("/sign-in");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      // Always redirect to the specified URL
      navigate("/sign-in");
    }
  }

  return (
    <div className="avatarContainer">
      <img
        src={avatar}
        alt={`${name}'s profile picture`}
        className={`${'avatarImage'} ${[size]}`}
      />
      {name && address && (
        <div className="userInfo">
          <span className="userName">{userDetails.firstName}</span>
          {/* <span className="userLocation">{address}</span> */}
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
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string,
  address: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

UserAvatar.defaultProps = {
  size: 'small',
};

