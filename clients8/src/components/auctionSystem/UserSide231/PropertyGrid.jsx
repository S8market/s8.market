import * as React from "react";
import PropertyCard from "./PropertyCard";
import { properties } from "./config/staticData";

export default function PropertyGrid() {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center self-center mt-20 w-full max-w-[1381px] max-md:mt-10 max-md:max-w-full">
      {properties.map((property, index) => (
        <PropertyCard key={index} {...property} />
      ))}
    </div>
  );
}