// import * as React from "react";
// import { PropertyCard } from "../UserSide/PropertyCard";

// export function PropertyGrid() {
//   const properties = [
//     {
//       image: "https://cdn.builder.io/api/v1/image/assets/TEMP/commercial-1.jpg",
//       name: "Prime Office Space",
//       location: "Business District, Metro City",
//       date: "March 15, 2025",
//       price: "₹15,000,000"
//     },
//     {
//       image: "https://cdn.builder.io/api/v1/image/assets/TEMP/commercial-2.jpg",
//       name: "Retail Complex",
//       location: "Shopping District, City Center",
//       date: "March 20, 2025",
//       price: "₹25,000,000"
//     },
//     {
//       image: "https://cdn.builder.io/api/v1/image/assets/TEMP/commercial-3.jpg",
//       name: "Modern Warehouse",
//       location: "Industrial Area, Logistics Park",
//       date: "March 25, 2025",
//       price: "₹18,000,000"
//     },
//     {
//       image: "https://cdn.builder.io/api/v1/image/assets/TEMP/commercial-4.jpg",
//       name: "Boutique Hotel",
//       location: "Tourist Hub, City Center",
//       date: "March 30, 2025",
//       price: "₹35,000,000"
//     }
//   ];

//   return (
//     <div className="mt-16 w-full px-8 max-w-[1400px] mx-auto">
//       <h2 className="text-3xl font-bold text-zinc-900 mb-8">Featured Commercial Properties</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {properties.map((property, index) => (
//           <PropertyCard key={index} {...property} />
//         ))}
//       </div>
//     </div>
//   );
// }
