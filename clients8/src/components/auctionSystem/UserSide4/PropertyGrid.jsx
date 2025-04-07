import * as React from "react";
import { PropertyCard } from "../UserSide/PropertyCard";

export function PropertyGrid() {
  const properties = [
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/land-1.jpg",
      name: "Prime Agricultural Land",
      location: "Rural District, Green Valley",
      date: "March 15, 2025",
      price: "₹2,500,000"
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/land-2.jpg",
      name: "Commercial Plot",
      location: "Business District, Metro City",
      date: "March 20, 2025",
      price: "₹5,000,000"
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/land-3.jpg",
      name: "Residential Plot",
      location: "Suburban Area, New Town",
      date: "March 25, 2025",
      price: "₹1,800,000"
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/land-4.jpg",
      name: "Industrial Land",
      location: "Industrial Zone, Tech Park",
      date: "March 30, 2025",
      price: "₹8,000,000"
    }
  ];

  return (
    <div className="mt-16 w-full px-8 max-w-[1400px] mx-auto">
      <h2 className="text-3xl font-bold text-zinc-900 mb-8">Featured Land Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((property, index) => (
          <PropertyCard key={index} {...property} />
        ))}
      </div>
    </div>
  );
}
