import * as React from "react";
import { useNavigate } from "react-router-dom";

export function CategoryCard({ title, image, isImageOnly }) {
  const navigate = useNavigate();

  const handleClick = () => {
    switch (title) {
      case "Industrial":
        navigate("/selectproperty");
        break;
      case "Commercial":
        navigate("/commercial");
        break;
      case "Residential":
        navigate("/residential");
        break;
      case "Land":
        navigate("/land");
        break;
      default:
        break;
    }
  };

  if (isImageOnly) {
    return (
      <div 
        onClick={handleClick}
        className="group relative flex overflow-hidden flex-col self-stretch my-auto bg-white rounded-3xl min-w-[240px] w-[300px] cursor-pointer"
      >
        <img
          loading="lazy"
          src={image}
          alt=""
          className="object-contain w-full rounded-3xl aspect-[1.23]"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-3xl">
          <span className="text-white text-2xl font-semibold tracking-[4.8px] uppercase">{title}</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className="group relative flex overflow-hidden flex-col self-stretch my-auto bg-white rounded-3xl min-w-[240px] w-[300px] cursor-pointer"
    >
      <div className="flex relative flex-col px-8 pt-8 pb-36 rounded-3xl aspect-[1.23] max-md:px-5 max-md:pb-28">
        <img
          loading="lazy"
          src={image}
          alt={`${title} category`}
          className="object-cover absolute inset-0 size-full"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-2xl font-semibold tracking-[4.8px] uppercase">{title}</span>
        </div>
      </div>
    </div>
  );
}