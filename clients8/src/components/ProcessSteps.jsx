// import * as React from "react";
// import ProcessStep from "./ProcessStep";

// function ProcessSteps() {
//   const steps = [
//     {
//       imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/162b4d65daa237d9427c3ab4272457f7e8b758ce9a1b1eb757af11afe41906e7?placeholderIfAbsent=true&apiKey=a758ebeaca3540fcaac54d04196cb9ec",
//       title: "Upload auction details"
//     },
//     {
//       imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/bc8265876370a94b4972c12bdfb447f60366e87cc1c2ee2f336ccf69c4bd6359?placeholderIfAbsent=true&apiKey=a758ebeaca3540fcaac54d04196cb9ec",
//       title: "manage auction listings"
//     },
//     {
//       imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/661a2062404772b8e4c868faf8ff3e556c380aafb51e2f69b3c93b7dd82aed56?placeholderIfAbsent=true&apiKey=a758ebeaca3540fcaac54d04196cb9ec",
//       title: "update auction status"
//     }
//   ];

//   return (
//     <div 
//       className="flex overflow-hidden flex-col justify-center items-center px-16 py-28 text-lg leading-6 text-center text-sky-900 bg-white max-md:px-5 max-md:py-24"
//       role="region"
//       aria-label="Auction Process Steps"
//     >
//       <div 
//         className="flex flex-wrap gap-10 items-end max-md:max-w-full"
//         role="list"
//       >
//         <div 
//           className="px-14 pt-56 leading-snug whitespace-nowrap w-[197px] max-md:px-5 max-md:pt-24"
//           role="listitem"
//         >
//           Register
//         </div>
        
//         {steps.map((step, index) => (
//           <ProcessStep
//             key={index}
//             imageSrc={step.imageSrc}
//             title={step.title}
//             customStyles={index === 1 ? "max-md:pr-5" : "max-md:px-5"}
//           />
//         ))}

//         <div 
//           className="flex flex-col pl-1.5 w-[197px]"
//           role="listitem"
//         >
//           <div 
//             className="flex shrink-0 rounded-full border-2 border-sky-900 border-solid h-[191px]"
//             aria-hidden="true"
//           />
//           <div className="mt-5">Get Assets auctions near you !</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProcessSteps;

// import * as React from "react";
// import ProcessStep from "./ProcessStep";

// export default function ProcessSteps() {
//   const steps = [
//     {
//       iconSrc:
//         "https://cdn.builder.io/api/v1/image/assets/TEMP/c493260a9422173a2ff2dcfb881d9102f9b97997126a6fa54e411e144943688f?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031",
//       title: "Register",
//       extraClasses: "pr-1.5 w-[197px]",
//     },
//     {
//       iconSrc:
//         "https://cdn.builder.io/api/v1/image/assets/TEMP/2633e5778d3b724d71aeed627b0daab77bfb9e5e6461ed277e46deb17258c7cb?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031",
//       title: "Upload auction details",
//       extraClasses: "w-[191px]",
//     },
//     {
//       iconSrc:
//         "https://cdn.builder.io/api/v1/image/assets/TEMP/42e706cbf25568048b7ace5d85898f59c42bf52d0be4e565d302adb8c825adba?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031",
//       title: "manage auction listings",
//       extraClasses: "w-[191px]",
//     },
//     {
//       iconSrc:
//         "https://cdn.builder.io/api/v1/image/assets/TEMP/34ab0704c8bc005e24a8607330f3e68ec71560e29320db4cbd9799e1ea40a0c1?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031",
//       title: "update auction status",
//       extraClasses: "pl-1.5 w-[197px]",
//     },
//   ];

//   return (
//     <div className="flex flex-wrap gap-10 items-start self-center mt-24 max-md:mt-10 max-md:max-w-full">
//       {steps.map((step, index) => (
//         <ProcessStep
//           key={index}
//           iconSrc={step.iconSrc}
//           title={step.title}
//           extraClasses={step.extraClasses}
//         />
//       ))}
//     </div>
//   );
// }

import * as React from "react";
import ProcessStep from "./ProcessStep"

const ProcessSteps = () => {
  const steps = [
    {
      iconSrc:"https://cdn.builder.io/api/v1/image/assets/TEMP/c493260a9422173a2ff2dcfb881d9102f9b97997126a6fa54e411e144943688f?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031",
      description: 'Upload action details'
    },
    {
      imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/bc8265876370a94b4972c12bdfb447f60366e87cc1c2ee2f336ccf69c4bd6359',
      description: 'manage auction listings'
    },
    {
      imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/661a2062404772b8e4c868faf8ff3e556c380aafb51e2f69b3c93b7dd82aed56',
      description: 'update auction status'
    }
  ];

  return (
    <div className="flex overflow-hidden flex-col justify-center items-center px-16 py-28 text-lg leading-6 text-center text-sky-900 bg-white max-md:px-5 max-md:py-24">
      <div className="flex flex-wrap gap-10 items-end max-md:max-w-full">
        <div className="px-14 pt-56 leading-snug whitespace-nowrap w-[197px] max-md:px-5 max-md:pt-24">
          Register
        </div>
        
        {steps.map((step, index) => (
          <ProcessStep
            key={index}
            imageSrc={step.imageSrc}
            description={step.description}
            className={index === 1 ? 'max-md:pr-5' : 'max-md:px-5'}
          />
        ))}

        <div className="flex flex-col pl-1.5 w-[197px]">
          <div className="flex shrink-0 rounded-full border-2 border-sky-900 border-solid h-[191px]" />
          <div className="mt-5">Get Assets auctions near you !</div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSteps;
