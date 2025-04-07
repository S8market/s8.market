import { useContext, useState } from 'react';
import './Sidebar.scss';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { AppContext } from '../../context/context';
import PropTypes from 'prop-types';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const { setSearchString } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      icon: '/profilePageLogo.svg',
      text: 'Profile',
      route: '/',
    },
    {
      icon: '/dashboard.svg',
      text: 'Dashboard',
      route: '/dashboard',
    },
    {
      icon: '/Asset.svg',
      text: 'Assets',
      route: '/myAssets',
    },
    {
      icon: '/profileS.svg',
      text: 'Profile Settings',
      route: '/profile',
    },
  ];

  return (
    <>
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo-container">
          <Link to="/" className="logo-circle">
            <span className="logo-text">S8</span>
          </Link>
        </div>
        <div className="separator"></div>
        <ul className="menu">
          {menuItems.map((item, index) => (
            <li key={index} className={`menu-item ${location.pathname === item.route ? 'active' : ''}`}>
              <Link to={item.route} className="menu-link" onClick={() => setSearchString(null)}>
                <img src={item.icon} alt={item.text} className="icon" />
                <div className={`text ${isSidebarOpen ? "visible" : ""}`}>{item.text}</div>            
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
}



// import { useContext, useState} from 'react';
// import './Sidebar.scss';
// import { useLocation } from 'react-router-dom';
// import { Link } from "react-router-dom";
// import { AppContext } from '../../context/context';


//   const Sidebar = ({ isSidebarOpen }) => {
//     const location = useLocation(); // Get current route
//     const {setSearchString} = useContext(AppContext)
//     const [isOpen, setIsOpen] = useState(false); // State for mobile sidebar

//   const menuItems = [
//     {
//       icon: '/profilePageLogo.svg',
//       text: 'Profile',
//       route: '/',
//     },
//     {
//       icon: '/dashboard.svg',
//       text: 'Dashboard',
//       route: '/dashboard',

//     },
//     {
//       icon: '/Asset.svg',
//       text: 'Assets',
//       route: '/myAssets',
//     },
//     {
//       icon: '/profileS.svg',
//       text: 'Profile Settings',
//       route: '/profile',
//     },
//   ];

//   return (
//     <>
//       <div className={`sidebar ${isOpen ? "open" : ""}`}>
//         <div className="logo-container">
//           <Link to="/" className="logo-circle">
//             <span className="logo-text">S8</span>
//           </Link>
//         </div>
  
//         <div className="separator"></div>
//         <ul className="menu">
//           {menuItems.map((item, index) => (
//             <li key={index} className={`menu-item ${location.pathname === item.route ? 'active' : ''}`}>
//               <Link to={item.route} className="menu-link" onClick={() => setSearchString(null)}>
//                 <img src={item.icon} alt={item.text} className="icon" />
//                 <div className={`text ${isSidebarOpen ? "visible" : ""}`}>{item.text}</div>            
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Sidebar;