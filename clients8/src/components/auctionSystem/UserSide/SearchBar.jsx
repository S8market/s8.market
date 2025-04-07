import * as React from "react";

export function SearchBar() {
  return (
    <>
      <div className="self-center mt-14 ml-6 text-4xl font-semibold text-center text-sky-900 max-md:mt-10 max-md:max-w-full">
        Get Assets according to your need !
      </div>
      <form className="self-end">
        <label htmlFor="searchAssets" className="sr-only">Search for assets or auctions</label>
        <input
          type="search"
          id="searchAssets"
          className="px-16 py-3.5 mt-11 max-w-full text-sm rounded-md bg-neutral-100 text-zinc-500 w-[417px] max-md:px-5 max-md:mt-10"
          placeholder="Search for assets/ auctions..."
          aria-label="Search for assets or auctions"
        />
      </form>
    </>
  );
}