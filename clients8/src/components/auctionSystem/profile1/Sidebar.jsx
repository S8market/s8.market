import './Sidebar.scss';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";


  const Sidebar = () => {
    const location = useLocation(); // Get current route

  const menuItems = [
    {
      icon: '/profilePageLogo.svg',
      text: 'Profile',
      route: '/profile1',
    },
    // {
    //   icon: '/dashboard.svg',
    //   text: 'Dashboard',
    // },
    {
      icon: '/myAsset.svg',
      text: 'My Saved Assets',
      route: '/myAssets',
    },
    {
      icon: 'profileS.svg',
      text: 'History',
      route: '/',
    },
  ];

  return (
    <div className="sidebar">
      <div className="logo-container">
        <Link to="/">
          <div className="logo-circle">
     
              <span className="logo-text">S8</span>
   
          </div>
        </Link>
      </div>
      <div className="separator"></div> {/* Add the separator */}
      <ul className="menu">
        {menuItems.map((item, index) => (
          <li key={index} className={`menu-item ${location.pathname === item.route ? 'active' : ''}`}>
            <Link to={item.route} className="menu-link">
              <img src={item.icon} alt={item.text} className="icon" />
              <div className="text">{item.text}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;