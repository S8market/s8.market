import * as React from "react";
import { PropertyCard } from "../UserSide/PropertyCard";

export function PropertyGrid() {
  const properties = [
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/residential-1.jpg",
      name: "Luxury Apartment",
      location: "Downtown, Metro City",
      date: "March 15, 2025",
      price: "₹8,500,000"
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/residential-2.jpg",
      name: "Modern Villa",
      location: "Suburban Area, Green Valley",
      date: "March 20, 2025",
      price: "₹12,000,000"
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/residential-3.jpg",
      name: "Penthouse Suite",
      location: "City Center, High Rise",
      date: "March 25, 2025",
      price: "₹15,000,000"
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/residential-4.jpg",
      name: "Family Home",
      location: "Residential District, New Town",
      date: "March 30, 2025",
      price: "₹9,000,000"
    }
  ];

  return (
    <div className="mt-16 w-full px-8 max-w-[1400px] mx-auto">
      <h2 className="text-3xl font-bold text-zinc-900 mb-8">Featured Residential Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((property, index) => (
          <PropertyCard key={index} {...property} />
        ))}
      </div>
    </div>
  );
}
