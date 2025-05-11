import React, { useState } from 'react';
import SearchHeader from './SearchHeader';
import CategoryCard from './CategoryCard';
import PropertyCard from './PropertyCard';
import { PropertyCardList } from './PropertyCard1';

const categories = [
  {
    title: 'INDUSTRIAL',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/79f55df53452d15f44fba67b67e84656bc7f77caac885b0d9f1ae0efca81e3ec?apiKey=643dc8ae27ef4b1eb644562c7626beaf',
  },
  {
    title: 'LAND',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/59ea53c8e6b9178a814ecb3192432b96b90e4404b660a72c651413b2cee1c10f?apiKey=643dc8ae27ef4b1eb644562c7626beaf',
  },
  {
    title: 'COMMERCIAL',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b110cbe65b0ee4b3ff4a0c079afb56314a0a104403b875370e9eb8afcab9c20a?apiKey=643dc8ae27ef4b1eb644562c7626beaf',
  },
  {
    title: 'RESIDENTIAL',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6b1629408ec0a67067984f7a3671ffd768fc989a8b2e5578c32567c3ad8f2235?apiKey=643dc8ae27ef4b1eb644562c7626beaf',
  },
];

const allProperties = [
  {
    title: 'Thakur Complex',
    location: 'Phuket, Thailand',
    bidPrice: '65,03,099',
    bank: 'State Bank of India',
    category: 'RESIDENTIAL',
  },
  {
    title: 'Diamond Plaza',
    location: 'Mumbai',
    bidPrice: '85,00,000',
    bank: 'HDFC Bank',
    category: 'COMMERCIAL',
  },
  {
    title: 'Sunshine Towers',
    location: 'Marine Drive, Mumbai',
    bidPrice: '95,50,000',
    bank: 'ICICI Bank',
    category: 'INDUSTRIAL',
  },
];

function AuctionLayout() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const displayedProperties = selectedCategory
    ? allProperties.filter((property) => property.category === selectedCategory)
    : allProperties;

  return (
    <div className="flex flex-col pt-7 pb-14 bg-white">
      <SearchHeader />

      {/* Categories Section */}
      <div className="flex flex-wrap justify-center gap-y-6 sm:gap-10 mt-8 sm:mt-11 px-4">
  {categories.map((category, index) => (
    <div
      key={index}
      className="w-full sm:w-auto flex justify-center"
      onClick={() => handleCategoryClick(category.title)}
    >
      <div className="w-[85%] sm:w-auto cursor-pointer mr-4">
        <CategoryCard {...category} />
      </div>
    </div>
  ))}
</div>

      {/* Properties Section */}
      <div
        id="properties-section"
        className="flex flex-col items-center mt-12 sm:mt-20 w-full max-w-[1381px] px-4"
      >
        <div className="text-2xl sm:text-4xl text-slate-900 mb-6 text-center">
          {selectedCategory ? `${selectedCategory} Properties` : 'Recently Added'}
        </div>

        <div className="flex flex-wrap gap-4 justify-center items-center w-full">
          <PropertyCard category={selectedCategory} />
        </div>
      </div>
    </div>
  );
}

export default AuctionLayout;
