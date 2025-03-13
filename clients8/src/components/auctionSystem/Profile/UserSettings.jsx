import React from 'react';
import PersonalDetails from './PersonalDetails';
import PasswordSettings from './PasswordSettings';

function UserSettings() {
  return (
    <div className="flex flex-col self-center px-4 pt-6 pb-12 mt-10 w-full text-base bg-white rounded-lg border border-gray-300 max-w-[900px] max-md:px-4 max-md:mt-4 max-md:max-w-full">
      <div className="self-start text-2xl font-semibold text-black">
        User Settings
      </div>
      {/* <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/30a95e94cf5d0f9601bba5df5fc72ee7f1d16a202f833cfdc63cab3192a57a73?placeholderIfAbsent=true&apiKey=289b2f6eb1774e2f9cac4324cda58d87"
        alt=""
        className="object-contain mt-2.5 max-w-full aspect-[166.67] w-[164px] max-md:ml-1.5"
      /> */}
      <div className="flex flex-col mt-14 max-md:mt-10 max-md:max-w-full">
        <PersonalDetails />
        <div className="mt-12 max-w-full min-h-0 border border-black border-solid w-[940px] max-md:mt-10" />
        <div className="mt-12 max-w-full min-h-0 border border-black border-solid w-[940px] max-md:mt-10" />
        <PasswordSettings />
      </div>
      <button className="overflow-hidden gap-2.5 self-end px-12 py-3 mt-20 mr-6 font-semibold text-white bg-sky-900 rounded-xl max-md:px-5 max-md:mt-10 max-md:mr-2.5">
        Save changes
      </button>
    </div>
  );
}

export default UserSettings;