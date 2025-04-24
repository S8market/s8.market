// import React, { useState } from 'react';
// import ChangePassword from './ChangePassword';

// const ChangePassword = () => {
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (newPassword !== confirmPassword) {
//       setError("New passwords do not match.");
//       return;
//     }

//     // Mock API call / Password update logic
//     setTimeout(() => {
//       setSuccess("Password changed successfully!");
//       setOldPassword('');
//       setNewPassword('');
//       setConfirmPassword('');
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-semibold mb-6 text-center">Change Password</h2>

//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         {success && <p className="text-green-500 mb-4">{success}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Old Password
//             </label>
//             <input
//               type="password"
//               value={oldPassword}
//               onChange={(e) => setOldPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               New Password
//             </label>
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Confirm New Password
//             </label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
//           >
//             Update Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;
