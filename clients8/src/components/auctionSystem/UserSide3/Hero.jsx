import * as React from "react";

export function Hero() {
  return (
    <div className="flex flex-col items-center px-16 pt-20 w-full max-md:px-5">
      <div className="flex flex-col items-center max-w-[1200px]">
        <div className="text-5xl font-bold text-center text-zinc-900 max-md:max-w-full max-md:text-4xl">
          Residential Properties for Auction
        </div>
        <div className="mt-6 text-xl text-center text-zinc-900 max-w-[800px]">
          Find your dream home through our residential property auctions. From apartments to luxury villas, discover your perfect living space.
        </div>
      </div>
    </div>
  );
}
