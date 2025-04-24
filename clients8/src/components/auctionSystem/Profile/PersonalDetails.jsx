import React from 'react';
import ProfileHeader from './ProfileHeader';

function UserSettings() {
  return (
    <div className="px-8 mt-6 w-full max-md:px-5 max-md:max-w-full">
      {/* Removed the <hr> to eliminate the line */}
      <h3 className="text-md font-semibold text-gray-600">Personal Details</h3>
      <div className="grid grid-cols-2 gap-4 mt-0 max-md:grid-cols-1"> {/* Removed gap-6 and set mt-0 to remove extra spacing */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-600">Name</label>
          <input id="name" type="text" placeholder="Enter your name..." className="w-full p-3 mt-1 border rounded-lg bg-gray-100" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-gray-600">Last Name</label>
          <input id="lastName" type="text" placeholder="Enter your last name..." className="w-full p-3 mt-1 border rounded-lg bg-gray-100" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-600">Email</label>
          <input id="email" type="email" placeholder="Enter your email..." className="w-full p-3 mt-1 border rounded-lg bg-gray-100" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="mobileNumber" className="text-gray-600">Mobile Number</label>
          <div className="flex items-center gap-2">
            <span className="p-3 bg-gray-200 border rounded-lg">+91</span>
            <input id="mobileNumber" type="tel" placeholder="Enter your mobile number..." className="w-full p-3 border rounded-lg bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="flex flex-col pt-2 bg-white min-h-screenh-screen bg-gray-200">
      {/* <ProfileHeader /> */}
      <UserSettings />
    </div>
  );
}

export default ProfilePage;
