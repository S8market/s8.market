import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing search icon from react-icons

export default function SearchHeader() {
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [location, setLocation] = useState('');
  const [properties, setProperties] = useState([]); // This will store the filtered properties

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

  // Simulated property data (you can replace this with actual data from an API or database)
  const allProperties = [
    { id: 1, location: 'Mumbai', price: 500000, name: 'Property 1' },
    { id: 2, location: 'Delhi', price: 200000, name: 'Property 2' },
    { id: 3, location: 'Bangalore', price: 350000, name: 'Property 3' },
    // Add more properties as needed
  ];

  const handleSearch = () => {
    const filteredProperties = allProperties.filter(property => {
      return (
        property.location.toLowerCase().includes(location.toLowerCase()) &&
        property.price <= priceRange[1]
      );
    });
    setProperties(filteredProperties);
  };

  return (
    <div className="flex flex-col px-16 w-full max-md:px-5 max-md:max-w-full">
      <div className="flex relative flex-col items-center px-20 py-20 w-full min-h-[634px] rounded-[50px] max-md:px-5 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b3596eea36edcb84a1e41805976e3724c325066aa90d93985003cec585d3439?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf"
          alt=""
          className="object-cover absolute inset-0 size-full mx-auto"
        />
        <div className="relative text-6xl font-semibold text-slate-900 max-md:max-w-full max-md:text-4xl">
          Find the nearest auction
          <br />
          events now !
        </div>
        <div className="relative mt-4 text-2xl leading-9 text-slate-600 max-md:max-w-full">
          We provide a complete service for the sale,
          <br />
          purchase or rental of real estate.
        </div>
        <div className="relative px-7 py-0.5 mt-16 text-sm font-medium leading-9 uppercase whitespace-nowrap bg-white rounded-[16px_16px_0px_0px] text-slate-900 tracking-[2.8px] max-md:px-5 max-md:mt-10">
          Auctions
        </div>
        <div className="relative py-6 pr-20 pl-7 max-w-full rounded-[0px_30px_30px_30px] shadow-2xl bg-sky-900 bg-opacity-80 w-[918px] max-md:px-5">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
              <label htmlFor="location" className="sr-only">Location</label>
              <input 
                type="text"
                id="location"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent rounded-[20px] px-4 py-2.5 text-neutral-200 
                  focus:outline-none hover:border-zinc-100 
                  appearance-none cursor-text transition-all duration-200 ease-in-out
                  focus:bg-zinc-800/10 placeholder-neutral-400"
              />
            </div>
            <div className="flex flex-col ml-5 w-[39%] max-md:ml-0 max-md:w-full">
              <div className="flex relative items-center gap-4 text-base leading-9 text-neutral-200 max-md:mt-10 group">
                <div className="shrink-0 w-0.5 border-2 border-solid border-zinc-200 h-[52px]" />
                <div className="flex-1 relative">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="priceRange" className="text-sm text-neutral-300">
                      Price Range
                    </label>
                    <span className="text-sm text-neutral-300">
                      {formatPrice(priceRange[1])}
                    </span>+
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
            <div className="flex flex-col ml-5 w-[37%] max-md:ml-0 max-md:w-full">
              <div className="flex relative items-center gap-4 text-base leading-9 text-neutral-200 max-md:mt-10 group">
                <div className="shrink-0 w-0.5 border-2 border-solid border-zinc-200 h-[52px]" />
                <div className="flex-1 relative">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={handleSearch}
                      className="bg-blue-500 text-white rounded-full p-3"
                    >
                      <FaSearch size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl text-slate-800">Available Properties</h2>
          {properties.length > 0 ? (
            <ul>
              {properties.map((property) => (
                <li key={property.id} className="mt-4">
                  <div className="text-xl text-slate-600">{property.name}</div>
                  <div className="text-lg text-slate-500">Location: {property.location}</div>
                  <div className="text-lg text-slate-500">Price: {formatPrice(property.price)}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div>No properties found for the selected location and price range.</div>
          )}
        </div>
      </div>
    </div>
  );
}
