import React, { useState } from "react";

export function CitySelector() {
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  const handlePriceChange = (e) => {
    setPriceRange([0, parseInt(e.target.value)]);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="relative py-6 pr-20 pl-7 max-w-full shadow-2xl bg-sky-900 bg-opacity-80 w-[918px] max-md:px-5 rounded-[0px_30px_30px_30px]">
      <form className="flex gap-5 max-md:flex-col">
      <div className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
              <label htmlFor="location" className="sr-only">Location</label>
              <input 
                type="text"
                id="location"
                placeholder="Location"
                className="w-full bg-transparent rounded-[20px] px-4 py-2.5 text-neutral-200 
                  focus:outline-none hover:border-zinc-100 
                  appearance-none cursor-text transition-all duration-200 ease-in-out
                  focus:bg-zinc-800/10 placeholder-neutral-400"
              />
            </div>
        <div className="flex flex-col ml-5 w-[39%] max-md:ml-0 max-md:w-full">
          <div className="flex relative grow gap-8 text-base leading-9 text-neutral-200 max-md:mt-10">
            <div className="shrink-0 w-0.5 border-2 border-solid border-zinc-200 h-[52px]" />
            <label htmlFor="auctionType" className="sr-only">Choose Auction Type</label>
            <select 
                    id="auctionType" 
                    className="w-full bg-transparent rounded-[20px] px-4 py-2.5 text-neutral-200 
                      focus:outline-none hover:border-zinc-100 
                      appearance-none cursor-pointer transition-all duration-200 ease-in-out
                      focus:bg-zinc-800/10"
                    aria-label="Choose auction type"
                  >
                    <option value="" disabled selected className="bg-zinc-800 text-neutral-400">Select auction type</option>
                    <option value="Normal Auction" className="bg-zinc-800 text-neutral-200">Normal Auction</option>
                    <option value="E Auction" className="bg-zinc-800 text-neutral-200">E Auction</option>
                    {/* <option value="sealed" className="bg-zinc-800 text-neutral-200">Sealed Bid</option>
                    <option value="reverse" className="bg-zinc-800 text-neutral-200">Reverse Auction</option> */}
                  </select>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[37%] max-md:ml-0 max-md:w-full">
          <div className="flex relative grow gap-8 text-base leading-9 text-neutral-200 max-md:mt-10">
            <div className="shrink-0 w-0.5 border-2 border-solid border-zinc-200 h-[52px]" />
            <div className="flex flex-col grow">
              <label htmlFor="priceRange" className="text-sm text-neutral-200 mb-1">Price Range</label>
              <input
                type="range"
                id="priceRange"
                min="0"
                max="1000000"
                step="10000"
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="w-full accent-white"
                aria-label="Choose Price Range"
              />
              <div className="text-sm text-neutral-200 mt-1">
                {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}