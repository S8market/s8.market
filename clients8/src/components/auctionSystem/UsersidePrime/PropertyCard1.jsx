import * as React from "react";
import { useNavigate } from "react-router-dom";

export function PropertyCard({ image }) {
  const navigate = useNavigate();

  const handlePriceClick = () => {
    window.scrollTo(0, 0);
    navigate('/property');
  };

  const recentlyAdded = {
    title: "Recently Added Properties",
    description: "Discover our latest property listings that have just hit the market. These newly added properties offer unique opportunities for potential buyers and investors."
  };

  // Rest of the PropertyCard component code...
}

const properties = [
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4446c63f83f17ac0c7b5caed30723e47167bad11295d617f54588d280e0e0fb8?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031",
    name: "Azure Palace",
    location: "123 Main Street, Cityname",
    date: "January 20, 2025",
    price: "250,000"
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4446c63f83f17ac0c7b5caed30723e47167bad11295d617f54588d280e0e0fb8?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031",
    name: "Emerald Heights",
    location: "456 Park Avenue, Townsville",
    date: "January 25, 2025",
    price: "320,000"
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4446c63f83f17ac0c7b5caed30723e47167bad11295d617f54588d280e0e0fb8?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031",
    name: "Ruby Residences",
    location: "789 Lake Road, Riverside",
    date: "February 1, 2025",
    price: "280,000"
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4446c63f83f17ac0c7b5caed30723e47167bad11295d617f54588d280e0e0fb8?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031",
    name: "Sapphire Towers",
    location: "321 Ocean View, Beachside",
    date: "February 5, 2025",
    price: "420,000"
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4446c63f83f17ac0c7b5caed30723e47167bad11295d617f54588d280e0e0fb8?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031",
    name: "Diamond Plaza",
    location: "567 Mountain Road, Highland",
    date: "February 10, 2025",
    price: "350,000"
  }
];

const PropertyCardList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {properties.map((property, index) => (
        <PropertyCard key={index} image={property.image} />
      ))}
    </div>
  );
};

export { properties, PropertyCardList };