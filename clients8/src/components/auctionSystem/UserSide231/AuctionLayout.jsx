import * as React from "react";
import { Hero } from "./Hero";
import { CategoryGrid } from "./CategoryGrid";
import { PropertyGrid } from "./PropertyGrid";
import { SearchBar } from "./SearchBar";

export default function AuctionLayout() {
  return (
    <div className="flex overflow-hidden flex-col items-center py-48 bg-white max-md:py-24">
      <Hero />
      <SearchBar />
      <CategoryGrid />
      <PropertyGrid />
    </div>
  );
}