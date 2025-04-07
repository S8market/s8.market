import React, { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import PropertyCard from "./PropertyCard";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import NewsletterForm from "./NewsletterForm";

export default function PropertyAuctions() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

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

  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <div className="flex overflow-hidden flex-col py-12 w-full bg-slate-50 max-md:max-w-full">
        <div className="self-center text-5xl font-medium leading-none text-sky-900 max-md:max-w-full max-md:text-4xl">
          Explore our latest property Auctions :
        </div>
        <div className="flex flex-col pl-20 pr-20 mt-7 w-full max-md:pl-5 max-md:max-w-full">
          <div className="flex flex-wrap gap-5 justify-between w-full text-sky-900 max-w-[1346px] max-md:max-w-full">
            <div className="text-3xl leading-none font-[250]">Latest Assets</div>
            <button className="flex gap-2 justify-center items-center px-6 py-2 rounded-2xl bg-sky-900 bg-opacity-10 hover:bg-opacity-20 transition-all duration-300">
              <div 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigate('/properties');
                }}
                className="self-stretch my-auto text-lg leading-none text-center rounded-lg text-zinc-900 cursor-pointer hover:text-blue-600 transition-colors duration-300"
              >
                See all result
              </div>
              <div className="flex gap-1 justify-center items-center self-stretch px-1 my-auto w-8 h-8 rounded-lg bg-zinc-900 bg-opacity-10">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d6704744fb3259d66d38d3ecc5a305d56a73c2e8a355ce17304faa8ca159a55?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031"
                  alt="View all arrow"
                  className="object-contain self-stretch my-auto w-6 aspect-square"
                />
              </div>
            </button>
          </div>
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto pb-4 mt-11 max-md:mt-10 cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-sky-900/20 hover:[&::-webkit-scrollbar-thumb]:bg-sky-900/40 active:[&::-webkit-scrollbar-thumb]:bg-sky-900/60"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <div className="flex gap-10 items-center text-xs font-semibold min-w-max">
                {properties.map((property, index) => (
                  <PropertyCard key={index} {...property} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden self-center pl-20 mt-5 ml-20 ml-8 max-w-full bg-white border-zinc-500 w-[1298px] max-md:pl-5 max-md:mt-10">
  <div className="flex gap-5 max-md:flex-col">
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto max-md:w-full">
      <div className="flex flex-col items-center w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col items-center w-full max-md:max-w-full">
          <div className="flex flex-col items-center text-black w-full max-w-[545px]">
            <div className="text-6xl max-md:text-4xl text-center">
              <span className="font-bold">Get in </span>
              <span className="font-bold text-sky-900">Touch</span>
            </div>
            <div className="mt-5 text-sm font-semibold tracking-normal leading-6 text-center max-md:max-w-full">
              Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.
            </div>
          </div>
          <ContactForm />
        </div>
        <ContactInfo />
      </div>
    </div>
    {/* <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
      <div className="grow max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col">
          <div className="text-3xl font-bold text-sky-900 mb-4">
            Locate us 
          </div>
          <div className="w-full h-[500px] bg-sky-900">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.4538030887393!2d72.82579849999999!3d18.955555599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce17bb66695d%3A0x3bf6d99cbddc25e2!2sSabu%20Building%2C%20Cawasji%20Patel%20Tank%20Rd%2C%20Charni%20Road%20East%2C%20Cawasji%20Patel%20Tank%2C%20Bhuleshwar%2C%20Mumbai%2C%20Maharashtra%20400004!5e0!3m2!1sen!2sin!4v1738952599779!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div> */}
  </div>
</div>

    </div>
    
  );
}