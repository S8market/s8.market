import React from "react";
import { cityOptions } from "./config/staticData";

export default function CitySelector() {
  return (
    <div className="relative py-6 pr-20 pl-7 mt-1.5 w-[918px] max-w-full bg-sky-900 bg-opacity-80 rounded-[0px_30px_30px_30px] max-md:px-5">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
          <select
            className="w-full bg-transparent rounded-[20px] px-4 py-2.5 text-neutral-200 
              focus:outline-none hover:border-zinc-100 
              appearance-none cursor-pointer transition-all duration-200 ease-in-out
              focus:bg-zinc-800/10"
            aria-label="Select city"
          >
            <option value="" disabled selected className="bg-zinc-800 text-neutral-400">
              Select city
            </option>
            {cityOptions.map((city) => (
              <option key={city.value} value={city.value} className="bg-zinc-800 text-neutral-200">
                {city.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}