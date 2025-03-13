import React from 'react';

function ProfileHeader() {
  return (
    <div className="flex flex-col ml-40 max-w-full text-2xl text-black w-[516px]">
      <div className="flex flex-wrap gap-10 items-center max-md:max-w-full">
        <div className="self-stretch my-auto text-3xl font-semibold text-sky-900">
          Profile{" "}
        </div>
        <div className="self-stretch my-auto">My Saved Assets</div>
        <div className="self-stretch my-auto">History</div>
      </div>
    </div>
  );
}

export default ProfileHeader;