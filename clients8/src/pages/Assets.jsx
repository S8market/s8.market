import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../components/auctionSystem/UsersidePrime/PropertyCard';
import { toast } from 'react-toastify';

const Assets = () => {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <div className="flex overflow-hidden flex-col py-12 w-full bg-slate-50 max-md:max-w-full">

        <div className="self-center w-full px-5 md:px-0">
          <div className="text-5xl font-medium leading-none text-sky-900 max-md:text-4xl">
            Explore our latest property Auctions :
          </div>
        </div>

        <div className="flex flex-col pl-20 pr-20 mt-7 w-full max-md:pl-5 max-md:pr-5 max-md:max-w-full">
          <div className="flex flex-wrap gap-5 justify-between w-full text-sky-900 max-w-[1346px] max-md:max-w-full">
            <div className="text-3xl leading-none font-[250]">Latest Assets</div>
          </div>

          <div className="flex flex-wrap gap-5 justify-center mt-8">
            {/* {properties.map((property, index) => (
              <PropertyCard key={index} />
            ))} */}
            <PropertyCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets;
