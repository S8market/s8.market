// import React, { useState } from 'react';
// import SearchHeader from './SearchHeader';
// import CategoryCard from './CategoryCard';
// import PropertyCard from './PropertyCard';

// const categories = [
//   { title: 'INDUSTRIAL', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/79f55df53452d15f44fba67b67e84656bc7f77caac885b0d9f1ae0efca81e3ec?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf' },
//   { title: 'LAND', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/59ea53c8e6b9178a814ecb3192432b96b90e4404b660a72c651413b2cee1c10f?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf' },
//   { title: 'COMMERCIAL', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b110cbe65b0ee4b3ff4a0c079afb56314a0a104403b875370e9eb8afcab9c20a?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf' },
//   { title: 'RESIDENTIAL', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6b1629408ec0a67067984f7a3671ffd768fc989a8b2e5578c32567c3ad8f2235?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf' }
// ];

// const allProperties = [
//   {
//     image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/79f55df53452d15f44fba67b67e84656bc7f77caac885b0d9f1ae0efca81e3ec?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf',
//     title: 'Prime Office Space',
//     location: 'Business District, Mumbai',
//     bidPrice: '1,50,00,000',
//     bank: 'HDFC Bank'
//   },
//   {
//     image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/59ea53c8e6b9178a814ecb3192432b96b90e4404b660a72c651413b2cee1c10f?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf',
//     title: 'Retail Complex',
//     location: 'Shopping District, Delhi',
//     bidPrice: '2,25,00,000',
//     bank: 'ICICI Bank'
//   },
//   {
//     image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b110cbe65b0ee4b3ff4a0c079afb56314a0a104403b875370e9eb8afcab9c20a?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf',
//     title: 'Modern Warehouse',
//     location: 'Industrial Area, Bangalore',
//     bidPrice: '1,80,00,000',
//     bank: 'State Bank of India'
//   },
//   {
//     image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6b1629408ec0a67067984f7a3671ffd768fc989a8b2e5578c32567c3ad8f2235?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf',
//     title: 'Boutique Hotel',
//     location: 'Tourist Hub, Goa',
//     bidPrice: '3,50,00,000',
//     bank: 'Axis Bank'
//   },
//   {
//     image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/79f55df53452d15f44fba67b67e84656bc7f77caac885b0d9f1ae0efca81e3ec?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf',
//     title: 'Shopping Mall',
//     location: 'City Center, Pune',
//     bidPrice: '5,00,00,000',
//     bank: 'Yes Bank'
//   },
//   {
//     image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/59ea53c8e6b9178a814ecb3192432b96b90e4404b660a72c651413b2cee1c10f?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf',
//     title: 'Business Center',
//     location: 'Tech Park, Hyderabad',
//     bidPrice: '2,75,00,000',
//     bank: 'Kotak Bank'
//   }
// ];

// function AuctionLayout() {
//   const [showAll, setShowAll] = useState(false);
//   const displayedProperties = showAll ? allProperties : allProperties.slice(0, 3);

//   const handleViewAll = () => {
//     setShowAll(true);
//     // Smooth scroll to the properties section
//     const propertiesSection = document.getElementById('properties-section');
//     propertiesSection?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div className="flex overflow-hidden flex-col pt-7 pb-14 bg-white">
//       <SearchHeader />
//       <div className="flex flex-wrap gap-10 items-center self-center mt-11 max-md:mt-10 max-md:max-w-full">
//         {categories.map((category, index) => (
//           <CategoryCard key={index} {...category} />
//         ))}
//       </div>
//       <div id="properties-section" className="flex flex-wrap gap-4 justify-center items-center self-center mt-20 w-full max-w-[1381px] max-md:mt-10 max-md:max-w-full">
//         {displayedProperties.map((property, index) => (
//           <PropertyCard key={index} {...property} />
//         ))}
//       </div>
//       {!showAll && (
//         <button 
//           onClick={handleViewAll}
//           className="flex gap-2 justify-center items-center self-end px-6 py-3 mt-16 mr-14 text-xl font-medium rounded-2xl bg-sky-900 bg-opacity-5 hover:bg-opacity-10 transition-all duration-300 max-md:mt-10 max-md:mr-2.5"
//         >
//           <div className="text-slate-600">View all...</div>
//           <div className="flex gap-1 justify-center items-center self-stretch px-1 my-auto w-8 h-8 rounded-lg bg-sky-900 bg-opacity-5">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-600">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
//             </svg>
//           </div>
//         </button>
//       )}
//     </div>
//   );
// }

// export default AuctionLayout;
