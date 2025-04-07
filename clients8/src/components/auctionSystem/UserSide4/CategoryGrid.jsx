import * as React from "react";
import { CategoryCard } from "../UserSide/CategoryCard";

export function CategoryGrid() {
  const categories = [
    {
      title: "Agricultural Land",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/agricultural-land.jpg",
    },
    {
      title: "Residential Plots",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/residential-plots.jpg",
    },
    {
      title: "Commercial Land",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/commercial-land.jpg",
    },
    {
      title: "Industrial Land",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/industrial-land.jpg",
    },
  ];

  return (
    <div className="mt-16 w-full px-8 max-w-[1400px] mx-auto">
      <h2 className="text-3xl font-bold text-zinc-900 mb-8">Land Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>
    </div>
  );
}
