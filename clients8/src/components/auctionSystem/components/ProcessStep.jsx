import * as React from "react";

export default function ProcessStep({ iconSrc, title, extraClasses = "" }) {
  const isCloudUpload = iconSrc.includes("builder.io");
  const isManageList = iconSrc.includes("manage-list.svg");
  const isUpdateStatus = iconSrc.includes("update-status.svg");
  const isGavel = iconSrc.includes("gavel.svg");
  const isUserPlus = iconSrc.includes("user-plus.svg");

  return (
    <div className={`flex flex-col items-center mt-6 ${extraClasses}`}>
      {isCloudUpload || isManageList || isUpdateStatus || isGavel || isUserPlus ? (
        <div className="relative mb-4 mt-4"> {/* Added mt-4 here */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#004663] rounded-full h-[185px] w-[185px]"></div>
          <div className="relative flex justify-center items-center bg-white rounded-full h-44 w-44">
            <img
              loading="lazy"
              src={iconSrc}
              alt={title}
              className={`object-contain ${
                isManageList ? "w-32 h-32" :
                isUpdateStatus || isUserPlus ? "w-[160px] h-[160px] scale-75" :
                isGavel ? "w-[140px] h-[130px] scale-80" :
                "w-28 h-28"
              }`}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center bg-blue-700 rounded-full h-44 w-44 mb-4 mt-4">
          <img
            loading="lazy"
            src={iconSrc}
            alt={title}
            className="w-24 h-24 object-contain"
          />
        </div>
      )}
      <div className={`text-xl text-center ${isCloudUpload || isManageList || isUpdateStatus || isGavel || isUserPlus ? 'text-gray-700 font-semibold' : 'text-blue-700 font-medium'}`}>
        {title}
      </div>
    </div>
  );
}
