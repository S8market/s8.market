import React from 'react';

function ProfileInfo() {
  return (
    <div className="self-center mt-16 w-full max-w-[1102px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        {/* User Profile Section (Unchanged) */}
        <div className="flex flex-col w-[31%] max-md:ml-0 max-md:w-full">
          <div className="flex overflow-hidden flex-col grow items-center px-16 py-8 w-full font-semibold whitespace-nowrap rounded-3xl bg-slate-100 border-black border-opacity-30 max-md:px-5 max-md:mt-10">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee948e6199fa2db1125415598e2a5f13507a43b32528073265496531844cdff1?placeholderIfAbsent=true&apiKey=289b2f6eb1774e2f9cac4324cda58d87"
              alt="User profile"
              className="object-contain self-stretch w-full rounded-full aspect-square"
            />
            <div className="mt-4 text-lg text-sky-900">@User-Name</div>
            <div className="mt-2 text-sm text-zinc-500">user@email.com</div>
          </div>
        </div>

        {/* Updated Information and Professional Details Section */}
        <div className="flex flex-col ml-5 w-[69%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col px-11 py-14 mx-auto mt-3 w-full text-black bg-white rounded-3xl border-black border-opacity-30 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            {/* Information and Professional Details in Grid Layout */}
            <div className="grid grid-cols-2 gap-x-16 gap-y-6">
              {/* Information Section */}
              <div className="col-span-1">
                <h2 className="text-2xl font-medium text-gray-500 mb-6">Information</h2>
                <div className="space-y-4">
                  <div className="flex gap-2 items-center">
                    <label className="text-gray-600">Name:</label>
                    <span className="text-gray-800">Name, Last Name</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <label className="text-gray-600">Email:</label>
                    <span className="text-gray-800">user@email.com</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <label className="text-gray-600">Tel:</label>
                    <span className="text-gray-800">+51 966 696 123</span>
                  </div>
                </div>
              </div>

              {/* Professional Details Section */}
              <div className="col-span-1">
                <h2 className="text-2xl font-medium text-gray-500 mb-6">Professional Details</h2>
                <div className="space-y-4">
                  <div className="flex gap-2 items-center">
                    <label className="text-gray-600">Bank name:</label>
                    <span className="text-gray-800">State Bank of India</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <label className="text-gray-600">IFSC:</label>
                    <span className="text-gray-800">SBIN1000511</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <label className="text-gray-600">Job Title:</label>
                    <span className="text-gray-800">Manager</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <label className="text-gray-600">Address:</label>
                    <span className="text-gray-800">Hardcoded</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
