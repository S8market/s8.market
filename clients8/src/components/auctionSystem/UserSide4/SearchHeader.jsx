import React, { useState } from 'react';

export default function SearchHeader() {
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
    <div className="flex flex-col px-16 w-full max-md:px-5 max-md:max-w-full">
      <div className="flex relative flex-col items-start px-20 py-20 w-full min-h-[634px] rounded-[50px] max-md:px-5 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b3596eea36edcb84a1e41805976e3724c325066aa90d93985003cec585d3439?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf"
          alt=""
          className="object-cover absolute inset-0 size-full"
        />
        <div className="relative text-6xl font-semibold text-slate-900 max-md:max-w-full max-md:text-4xl">
          Land Properties
          <br />
          for Auction
        </div>
        <div className="relative mt-4 text-2xl leading-9 text-slate-600 max-md:max-w-full">
          Discover prime land opportunities through our auction platform.
          <br />
          From agricultural to commercial plots, find your perfect investment.
        </div>
        <div className="relative px-7 py-0.5 mt-16 text-sm font-medium leading-9 uppercase whitespace-nowrap bg-white rounded-[16px_16px_0px_0px] text-slate-900 tracking-[2.8px] max-md:px-5 max-md:mt-10">
          Land Auctions
        </div>
        <div className="relative py-6 pr-20 pl-7 max-w-full rounded-[0px_30px_30px_30px] shadow-2xl bg-sky-900 bg-opacity-80 w-[918px] max-md:px-5">
          <div className="flex gap-5 max-md:flex-col">
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
              <div className="flex relative items-center gap-4 text-base leading-9 text-neutral-200 max-md:mt-10 group">
                <div className="shrink-0 w-0.5 border-2 border-solid border-zinc-200 h-[52px] group-hover:border-zinc-300 transition-colors duration-200 rounded-full" />
                <div className="flex-1 relative">
                  <select 
                    id="landType" 
                    className="w-full bg-transparent rounded-[20px] px-4 py-2.5 text-neutral-200 
                      focus:outline-none hover:border-zinc-100 
                      appearance-none cursor-pointer transition-all duration-200 ease-in-out
                      focus:bg-zinc-800/10"
                    aria-label="Choose land type"
                  >
                    <option value="" disabled selected className="bg-zinc-800 text-neutral-400">Select land type</option>
                    <option value="agricultural" className="bg-zinc-800 text-neutral-200">Agricultural Land</option>
                    <option value="residential" className="bg-zinc-800 text-neutral-200">Residential Plot</option>
                    <option value="commercial" className="bg-zinc-800 text-neutral-200">Commercial Land</option>
                    <option value="industrial" className="bg-zinc-800 text-neutral-200">Industrial Land</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[37%] max-md:ml-0 max-md:w-full">
              <div className="flex relative items-center gap-4 text-base leading-9 text-neutral-200 max-md:mt-10 group">
                <div className="shrink-0 w-0.5 border-2 border-solid border-zinc-200 h-[52px] group-hover:border-zinc-300 transition-colors duration-200 rounded-full" />
                <div className="flex-1 relative">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="priceRange" className="text-sm text-neutral-300">
                      Price Range
                    </label>
                    <span className="text-sm text-neutral-300">
                      {formatPrice(priceRange[1])}
                    </span>
                  </div>
                  <input
                    type="range"
                    id="priceRange"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
