import * as React from "react";

export function Hero() {
  return (
    <div className="flex flex-col items-center px-16 pt-20 w-full max-md:px-5">
      <div className="flex flex-col items-center max-w-[1200px]">
        <div className="text-5xl font-bold text-center text-zinc-900 max-md:max-w-full max-md:text-4xl">
          Land Properties for Auction
        </div>
        <div className="mt-6 text-xl text-center text-zinc-900 max-w-[800px]">
          Discover prime land opportunities through our auction platform. From residential plots to commercial land, find your perfect investment.
        </div>
      </div>
    </div>
  );
}
