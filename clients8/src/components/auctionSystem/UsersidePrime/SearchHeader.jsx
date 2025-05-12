import React, { useState, useContext } from 'react';
import { Search } from 'lucide-react';
import { AppContext } from '../../../context/context';
import axios from 'axios';

export default function SearchHeader() {
  const { serverUrl, setProperties } = useContext(AppContext);
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  const handlePriceChange = (e) => {
    setPriceRange([0, parseInt(e.target.value)]);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/v1/user/searchProperties`,
        {
          searchString: location,
          priceRange: priceRange[1],
        },
        { withCredentials: true }
      );
      setProperties(response.data.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex flex-col px-16 max-md:px-6 w-full">
      <div className="flex relative flex-col items-start px-20 py-20 rounded-[50px] w-full min-h-[634px] max-md:px-6 max-md:py-10">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b3596eea36edcb84a1e41805976e3724c325066aa90d93985003cec585d3439?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf"
          alt=""
          className="object-cover absolute inset-0 w-full h-full rounded-[50px]"
        />

        <div className="relative text-6xl font-semibold text-slate-900 max-md:text-4xl max-md:max-w-full">
          Find the nearest auction
          <br />
          events now!
        </div>

        <div className="relative mt-4 text-2xl leading-9 text-slate-600 max-md:text-base max-md:leading-7">
          We provide a complete service for the sale,
          <br />
          purchase or rental of real estate.
        </div>

        <div className="relative px-7 py-0.5 mt-16 text-sm font-medium leading-9 uppercase bg-white rounded-[16px_16px_0_0] text-slate-900 tracking-[2.8px] max-md:px-5 max-md:mt-10">
          Auctions
        </div>

        <div className="relative py-6 pr-20 pl-7 mt-6 max-w-full w-[918px] bg-sky-900 bg-opacity-80 shadow-2xl rounded-[0px_30px_30px_30px] max-md:pr-5 max-md:pl-5 max-md:w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-4">

            {/* Location Input */}
            <div className="flex flex-col w-[24%] max-md:w-full">
              <label htmlFor="location" className="sr-only">Location</label>
              <input 
                type="text"
                id="location"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent rounded-[20px] px-4 py-2.5 text-neutral-200 
                  focus:outline-none placeholder-neutral-400 
                  transition-all duration-200 ease-in-out
                  focus:bg-zinc-800/10 border border-zinc-400 hover:border-zinc-100"
              />
            </div>

            {/* Price Range Slider */}
            <div className="flex flex-col ml-5 w-[37%] max-md:ml-0 max-md:w-full">
              <div className="flex relative items-center gap-4 text-base leading-9 text-neutral-200 group">
                <div className="shrink-0 w-0.5 border-2 border-solid border-zinc-200 h-[52px] group-hover:border-zinc-300 transition-colors duration-200 rounded-full max-md:hidden" />
                <div className="flex-1 relative w-full">
                  <div className="flex justify-between mb-2 text-sm text-neutral-300">
                    <label htmlFor="priceRange">Price Range</label>
                    <span>{formatPrice(priceRange[1])}+</span>
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

            {/* Search Button */}
            <div className="flex flex-col ml-5 w-[12%] max-md:ml-0 max-md:w-full">
              <div className="flex relative items-center gap-4 text-base leading-9 text-neutral-200 group">
                <div className="shrink-0 w-0.5 border-2 border-solid border-zinc-200 h-[52px] group-hover:border-zinc-300 transition-colors duration-200 rounded-full max-md:hidden" />
                <button 
                  onClick={handleSearch}
                  className="flex items-center justify-center w-12 h-12 bg-zinc-700 hover:bg-zinc-600 rounded-full transition duration-200"
                  aria-label="Search"
                >
                  <Search className="text-white w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
