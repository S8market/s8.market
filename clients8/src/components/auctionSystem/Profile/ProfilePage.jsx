import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';
import UserSettings from './UserSettings';

function ProfilePage() {
  return (
    <div className="flex overflow-hidden flex-col pt-16 bg-white">
      <ProfileHeader />
      <div className="flex flex-col px-8 mt-6 w-full max-md:px-5 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff43229835cfd703f819113df90025c7a1454f6c07f6051d75c88988a2f02aa0?placeholderIfAbsent=true&apiKey=289b2f6eb1774e2f9cac4324cda58d87"
          alt=""
          className="object-contain w-full aspect-[1000] max-md:max-w-full"
        />
        <ProfileInfo />
        <button className="overflow-hidden gap-2.5 self-start px-9 py-2.5 mt-6 ml-60 text-xl font-light text-white bg-sky-900 rounded-xl max-md:px-5 max-md:ml-2.5">
          Upload new avatar
        </button>
        <UserSettings />
      </div>
    </div>
  );
}

export default ProfilePage;