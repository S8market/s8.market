import * as React from "react";
import ProcessStep from "./ProcessStep";

const steps = [
  {
    iconSrc: "/icons/user-plus.svg", // User plus icon 
    title: "Register",
    extraClasses: "w-[320px] transform hover:scale-105 transition-transform duration-300",
  },
  {
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/162b4d65daa237d9427c3ab4272457f7e8b758ce9a1b1eb757af11afe41906e7?placeholderIfAbsent=true&apiKey=289b2f6eb1774e2f9cac4324cda58d87", // Cloud upload icon
    title: "Upload auction details",
    extraClasses: "w-[320px] transform hover:scale-105 transition-transform duration-300", 
  },
  {
    iconSrc: "/icons/manage-list.svg", // List management icon
    title: "Manage auction listings",
    extraClasses: "w-[320px] transform hover:scale-105 transition-transform duration-300",
  },
  {
    iconSrc: "/icons/update-status.svg", // Settings/gear icon
    title: "Update auction status",
    extraClasses: "w-[320px] transform hover:scale-105 transition-transform duration-300",
  },
  {
    iconSrc: "/icons/gavel.svg", // Gavel/hammer icon
    title: "Get Assets auctions near you!",
    extraClasses: "w-[320px] transform hover:scale-105 transition-transform duration-300",
  },
];

export default function ProcessSteps() {
  return (
    <div className="w-full py-20 px-8">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <ProcessStep key={index} iconSrc={step.iconSrc} title={step.title} extraClasses={step.extraClasses} />
          ))}
        </div>
      </div>
    </div>
  );
}
