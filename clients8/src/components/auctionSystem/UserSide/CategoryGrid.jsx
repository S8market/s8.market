import * as React from "react";
import { CategoryCard } from "./CategoryCard";

const categories = [
  { title: "Industrial", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/8c28c58bac4778a9acd3ee18ce62f490004e3aaed8c22c88d8e324847e4fa2c0?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf" },
  { title: "Land", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/64997a3915347ac3911b6e70ae7acd3980249eb8de85f7bc80cff5f771e5774d?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf" },
  { title: "Commercial", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4a5994cc8fa128698043d22203eb2ad450f557ffce407bca7606ce8659fccf0?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf" },
  { title: "Residential", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/c26a87ba9b69c68509f10db9eba703ed6f6956506ef2b02870e65a89731045fb?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf" }
];

export function CategoryGrid() {
  return (
    <div className="flex flex-col mt-10 w-full max-w-[1365px] max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-center self-center max-md:max-w-full">
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff43229835cfd703f819113df90025c7a1454f6c07f6051d75c88988a2f02aa0?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf"
        alt=""
        className="object-contain mt-5 w-full aspect-[1000] max-md:max-w-full"
      />
    </div>
  );
}