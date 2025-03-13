import React from "react";

export default function CategoryCard() {
  const categories = [
    {
      type: "INDUSTRIAL",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/8c28c58bac4778a9acd3ee18ce62f490004e3aaed8c22c88d8e324847e4fa2c0"
    },
    {
      type: "LAND",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/64997a3915347ac3911b6e70ae7acd3980249eb8de85f7bc80cff5f771e5774d"
    },
    {
      type: "COMMERCIAL",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4a5994cc8fa128698043d22203eb2ad450f557ffce407bca7606ce8659fccf0"
    },
    {
      type: "RESIDENTIAL",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/c26a87ba9b69c68509f10db9eba703ed6f6956506ef2b02870e65a89731045fb"
    }
  ];

  return (
    <>
      {categories.map((category, index) => (
        <div 
          key={index}
          className="flex overflow-hidden flex-col self-stretch my-auto bg-white rounded-3xl min-w-[240px] w-[300px]"
          role={category.type ? "button" : "presentation"}
          tabIndex={category.type ? 0 : -1}
          aria-label={category.type ? `View ${category.type} auctions` : undefined}
        >
          <div className="flex relative flex-col px-8 pt-8 pb-36 rounded-3xl aspect-[1.23] max-md:px-5 max-md:pb-28 group">
            <img 
              src={category.image} 
              alt={category.type ? `${category.type} category` : ""} 
              className="object-cover absolute inset-0 size-full rounded-3xl"
            />
            {category.type && (
              <>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-3xl" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-2xl font-semibold tracking-[4.8px] px-4">{category.type}</span>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
}