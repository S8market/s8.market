import * as React from "react";

export default function NavigationBar() {
  const navItems = [
    { label: "Home", isBold: true },
    { label: "Assets", isBold: false },
    { label: "About Us", isBold: false },
    { label: "Contact Us", isBold: false },
  ];

  return (
    <div className="flex flex-wrap gap-5 justify-between px-9 py-3.5 w-full bg-white max-md:px-5 max-md:max-w-full">
      <div className="flex text-3xl font-extrabold leading-none text-sky-900 whitespace-nowrap">
      
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a227a67fb1aa60ea4fcfdf701adff7cfa910ebdd82c2188f253364885db64408?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031"
          alt="Company Logo"
          className="object-contain shrink-0 w-16 aspect-[0.79]"
        />
        <div className="self-start mt-11 max-md:mt-10">s8</div>
      
      </div>
      <div className="flex  text-base text-right text-black max-md:max-w-full">
        {navItems.map((item, index) => (
          <div key={index} className={`mx-2 ${item.isBold ? 'font-bold' : ''}`}>
            {item.label}
          </div>
          
        ))}
      </div>
    </div>
  );
}