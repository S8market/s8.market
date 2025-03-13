import React from 'react';

function PasswordSettings() {
  return (
    <div className="flex flex-col mt-12 w-full max-w-[989px] max-md:mt-10 max-md:max-w-full">
      <div className="self-start font-semibold text-center text-black">
        Password Settings
      </div>
      <div className="flex flex-wrap gap-10 items-end mt-9 max-md:max-w-full">
        <div className="flex flex-col min-w-[240px] w-[400px]">
          <div className="flex flex-col w-full">
            <label htmlFor="oldPassword" className="self-start text-black max-md:ml-2.5">
              Old Password
            </label>
            <input
              id="oldPassword"
              type="password"
              className="overflow-hidden px-7 py-3 mt-4 rounded-xl bg-zinc-400 bg-opacity-30 text-black text-opacity-30 max-md:px-5"
              placeholder="Enter your old password..."
            />
          </div>
          <div className="flex flex-col mt-8 w-full">
            <label htmlFor="newPassword" className="self-start text-black max-md:ml-2.5">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              className="overflow-hidden px-7 py-3 mt-4 rounded-xl bg-zinc-400 bg-opacity-30 text-black text-opacity-30 max-md:px-5"
              placeholder="Enter your new password..."
            />
          </div>
        </div>
        <div className="flex flex-col min-w-[240px] w-[400px]">
          <label htmlFor="confirmPassword" className="self-start text-black max-md:ml-2.5">
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="overflow-hidden px-7 py-3 mt-4 rounded-xl bg-zinc-400 bg-opacity-30 text-black text-opacity-30 max-md:px-5"
            placeholder="Confirm your new password..."
          />
        </div>
      </div>
    </div>
  );
}

export default PasswordSettings;