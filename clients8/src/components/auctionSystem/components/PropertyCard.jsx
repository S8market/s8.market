import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function PropertyCard({ image, name, location, date, price }) {
  const navigate = useNavigate();

  const handleSeeDetails = () => {
    window.scrollTo(0, 0);
    navigate('/property/${id}');
  };

  return (
    <div className="flex overflow-hidden flex-col items-start self-stretch px-3 pt-3 pb-8 my-auto bg-white rounded-3xl min-w-[240px] w-[340px] max-md:max-w-full">
      <img
        loading="lazy"
        src={image}
        alt={`Property view of ${name}`}
        className="object-contain self-stretch w-full rounded-3xl aspect-[1.42] max-md:max-w-full"
      />
      <div className="mt-5 ml-2 text-base leading-none text-gray-900">
        {name}
      </div>
      <div className="flex gap-4 mt-4 ml-2">
        <div className="flex flex-col my-auto leading-none text-gray-900">
          <div className="self-start">Location:</div>
          <div className="mt-4">Auction Date:</div>
          <div className="mt-3">Starting Price:</div>
        </div>
        <div className="flex flex-col items-start leading-6 text-slate-600">
          <div className="self-stretch">{location}</div>
          <div className="mt-1">{date}</div>
          <div className="mt-1">${price}</div>
        </div>
      </div>
      <button 
        onClick={handleSeeDetails}
        className="flex flex-col justify-center items-center px-4 py-2.5 mt-7 ml-2 leading-none text-white bg-sky-900 rounded-md hover:bg-sky-800 transition-all duration-300 hover:shadow-lg hover:shadow-sky-100 transform hover:-translate-y-0.5"
        aria-label={`See details for ${name}`}
      >
        <div className="gap-2 self-stretch">See Details</div>
      </button>
    </div>
  );
}