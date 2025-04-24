import React, { useRef } from "react";
import ProcessStep from "./ProcessStep";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Modern icons

const steps = [
  {
    iconSrc: "/icons/user-plus.svg",
    title: "Register",
    extraClasses: "w-[320px] transform hover:scale-105 transition-transform duration-300",
  },
  {
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/162b4d65daa237d9427c3ab4272457f7e8b758ce9a1b1eb757af11afe41906e7?placeholderIfAbsent=true&apiKey=289b2f6eb1774e2f9cac4324cda58d87",
    title: "Upload auction details",
    extraClasses: "w-[320px] transform hover:scale-105 transition-transform duration-300",
  },
  {
    iconSrc: "/icons/manage-list.svg",
    title: "Manage auction listings",
    extraClasses: "w-[320px] transform hover:scale-105 transition-transform duration-300",
  },
  {
    iconSrc: "/icons/update-status.svg",
    title: "Update auction status",
    extraClasses: "w-[320px] transform hover:scale-105 transition-transform duration-300",
  },
  {
    iconSrc: "/icons/gavel.svg",
    title: "Get Assets auctions near you!",
    extraClasses: "w-[320px] transform hover:scale-105 transition-transform duration-300",
  },
];

export default function ProcessSteps() {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    if (!containerRef.current) return;
    const scrollAmount = 340;
    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full py-20 px-8 overflow-hidden">
      {/* Arrows only on small screens */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md md:hidden"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="max-w-[1800px] mx-auto">
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-4 scroll-smooth no-scrollbar md:justify-between"
        >
          {steps.map((step, index) => (
            <div key={index} className="flex-shrink-0">
              <ProcessStep
                iconSrc={step.iconSrc}
                title={step.title}
                extraClasses={step.extraClasses}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md md:hidden"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
