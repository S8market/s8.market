// import * as React from "react";

// function ProcessStep({ imageSrc, title, customStyles }) {
//   return (
//     <div 
//       className={`flex flex-col px-6 pt-14 w-[191px] ${customStyles}`}
//       role="listitem"
//       aria-label={title}
//     >
//       <img
//         loading="lazy"
//         src={imageSrc}
//         alt={title}
//         className="object-contain self-center aspect-square w-[100px]"
//       />
//       <div className="mt-14 max-md:mt-10">{title}</div>
//     </div>
//   );
// }

// export default ProcessStep;
import * as React from "react";

export default function ProcessStep({ iconSrc, title, extraClasses = "" }) {
  return (
    <div className={`flex flex-col items-center ${extraClasses}`}>
      <div className="flex flex-col justify-center items-center px-5 bg-sky-900 rounded-full h-[191px] w-[191px] max-md:h-[150px] max-md:w-[150px]">
        <img
          loading="lazy"
          src={iconSrc}
          alt={title}
          className="object-contain aspect-square w-[84px] max-md:w-[70px]"
        />
      </div>
      <div className="mt-5 text-lg leading-6 text-center text-sky-900 max-md:text-base">
        {title}
      </div>
    </div>
  );
}

// import React from 'react';
// import PropTypes from 'prop-types';

// const AuctionStep = ({ imageSrc, description, className }) => {
//   return (
//     <div className={`flex flex-col px-6 pt-14 w-[191px] ${className}`}>
//       <img
//         loading="lazy"
//         src={imageSrc}
//         alt={description}
//         className="object-contain self-center aspect-square w-[100px]"
//       />
//       <div className="mt-14 max-md:mt-10">{description}</div>
//     </div>
//   );
// };

// AuctionStep.propTypes = {
//   imageSrc: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   className: PropTypes.string
// };

// AuctionStep.defaultProps = {
//   className: ''
// };

// export default AuctionStep;