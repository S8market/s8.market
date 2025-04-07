import React from 'react';

function CategoryCard({ title, image }) {
  return (
    <div className="flex overflow-hidden flex-col self-stretch my-auto text-2xl font-semibold text-center uppercase whitespace-nowrap bg-white rounded-3xl min-w-[240px] text-slate-900 tracking-[4.8px] w-[300px]">
      <div className="flex relative flex-col px-8 pt-8 pb-36 rounded-3xl aspect-[1.23] max-md:px-5 max-md:pb-28 group">
        <img
          loading="lazy"
          src={image}
          alt={title}
          className="object-cover absolute inset-0 size-full rounded-3xl"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-3xl" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-2xl font-semibold tracking-[4.8px] px-4">{title}</span>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
