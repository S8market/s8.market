import * as React from "react";

export default function SearchBar() {
  return (
    <form className="flex overflow-hidden relative gap-5 px-5 py-10 border border-solid bg-white bg-opacity-10 border-zinc-300 border-opacity-10 rounded-[50px] w-full max-md:px-3 max-md:py-2">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b10ef0b9ed50f347e507ce263da543df27eb52dce5de8cd66bf0b6544ba8a03?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031"
        alt="Search Icon"
        className="object-contain shrink-0 w-6 aspect-square max-md:w-4"
      />
      <label htmlFor="searchInput" className="sr-only">
        Search for auctions
      </label>
      <input
        type="search"
        id="searchInput"
        className="flex-auto my-auto bg-transparent text-white text-opacity-40 border-none focus:outline-none max-md:text-sm"
        placeholder="Search for auctions near you ...."
        aria-label="Search for auctions near you"
      />
    </form>
  );
}