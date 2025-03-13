import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import PropertyCard from "./PropertyCard";

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

export default function AuctionLayout() {
  const [priceRange, setPriceRange] = useState([0, 500000]);

  const handlePriceChange = (e) => {
    setPriceRange([0, parseInt(e.target.value)]);
  };

  return (
    <div className="flex overflow-hidden flex-col items-center pt-9 pb-20 bg-white">
      <PropertyCard />
    </div>
  );
}