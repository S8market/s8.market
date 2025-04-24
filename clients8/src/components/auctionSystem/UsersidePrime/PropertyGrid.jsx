import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from "../../../context/context";
import PropertyCard from './PropertyCard';

export function PropertyGrid() {
  const { serverUrl, properties, setProperties } = useContext(AppContext);
  const [showAllProperties, setShowAllProperties] = useState(false);

  const handleViewAll = () => {
    setShowAllProperties(true);
  };

  // Determine which properties to display
  const displayProperties = showAllProperties ? properties : properties.slice(0, 4);

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-5 justify-center mt-14 w-full font-medium max-w-[1325px] max-md:mt-10 max-md:max-w-full">
        {/* <div className="text-4xl text-slate-900">Recently Added</div>
        {!showAllProperties && properties.length > 4 && (
          <button 
            onClick={handleViewAll}
            className="flex gap-2 justify-center items-center px-6 py-2 rounded-2xl bg-sky-900 bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 ml-auto"
          >
            <div className="self-stretch my-auto text-lg leading-none text-center rounded-lg text-zinc-900">
              View all
            </div>
            <div className="flex gap-1 justify-center items-center self-stretch px-1 my-auto w-8 h-8 rounded-lg bg-zinc-900 bg-opacity-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d6704744fb3259d66d38d3ecc5a305d56a73c2e8a355ce17304faa8ca159a55?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031"
                alt="View all arrow"
                className="object-contain self-stretch my-auto w-6 aspect-square"
              />
            </div>
          </button>
        )} */}
        
      <div className="flex flex-wrap gap-5 mt-8">
        {/* {displayProperties.map((property) => (
          <PropertyCard key={property._id} {...property} />
        ))} */}
        <PropertyCard/>
      </div>
      </div>

    </div>
  );
}