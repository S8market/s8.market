// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// const AvatarWithDropdown = ({ avatar, userIcon, handleLogout }) => {
//   const navigate = useNavigate();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <div className="relative">
//       <div
//         className={`flex items-center justify-center w-12 h-12 rounded-full ${avatar ? "" : "bg-[#004663]"} cursor-pointer`}
//         onClick={toggleDropdown}
//       >
//         <img
//           loading="lazy"
//           src={avatar ? avatar : userIcon}
//           alt="User Profile Icon"
//           className={`object-contain shrink-0 ${avatar ? "w-12" : "w-6"} aspect-square max-md:w-5 filter ${avatar ? "" : "invert"}`}
//         />
//       </div>
//       {isDropdownOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
//           <ul className="py-2">
//             <li>
//               <Link to="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
//                 <img src="user1.png" alt="Profile Icon" className="w-5 h-5 mr-2" />
//                 <span>Profile</span>
//               </Link>
//             </li>
//             <li
//               onClick={handleLogout}
//               className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
//             >
//               <img src="power.png" alt="Logout Icon" className="w-5 h-5 mr-2" />
//               <span>Logout</span>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AvatarWithDropdown;
