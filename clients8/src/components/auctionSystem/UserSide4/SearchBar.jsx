import * as React from "react";

export function SearchBar() {
  return (
    <div className="flex justify-center w-full px-4 mt-12">
      <div className="flex gap-4 justify-between items-center px-8 py-6 max-w-[1200px] w-full bg-sky-900 bg-opacity-80 rounded-[30px] shadow-lg">
        <div className="flex flex-1 min-w-0">
          <input
            type="text"
            placeholder="Search land properties..."
            className="w-full px-6 py-3 bg-transparent text-white placeholder-gray-300 border border-white/20 rounded-full focus:outline-none focus:border-white/40"
          />
        </div>
        <div className="flex gap-4">
          <select className="px-6 py-3 bg-transparent text-white border border-white/20 rounded-full focus:outline-none focus:border-white/40">
            <option value="" className="bg-sky-900">Land Type</option>
            <option value="agricultural" className="bg-sky-900">Agricultural</option>
            <option value="residential" className="bg-sky-900">Residential</option>
            <option value="commercial" className="bg-sky-900">Commercial</option>
            <option value="industrial" className="bg-sky-900">Industrial</option>
          </select>
          <button className="px-8 py-3 bg-white text-sky-900 rounded-full hover:bg-gray-100 transition-colors duration-200">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
