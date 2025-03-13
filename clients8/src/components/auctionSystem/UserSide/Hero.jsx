import * as React from "react";
import { CitySelector } from "./CitySelector";

export function Hero() {
  return (
    <div className="flex flex-col self-stretch px-16 w-full max-md:px-5 max-md:max-w-full">
      <div className="flex relative flex-col items-start px-20 py-20 w-full min-h-[634px] rounded-[50px] max-md:px-5 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b3596eea36edcb84a1e41805976e3724c325066aa90d93985003cec585d3439?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf"
          alt="Auction hero background"
          className="object-cover absolute inset-0 size-full"
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
        <CitySelector />
      </div>
    </div>
  );
}