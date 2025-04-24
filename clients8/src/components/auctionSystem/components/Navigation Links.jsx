import * as React from "react";
import { Link } from "react-router-dom";

const navigationItems = [
  { id: 1, text: "Home", path: "/" },
  { id: 2, text: "Assets", path: "/properties" },
  { id: 3, text: "About Us", path: "/about" },
  { id: 4, text: "Contact Us", path: "/contact" }
];

export function NavigationLinks() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="flex flex-col text-white w-[300px]">
      <div className="text-2xl leading-none font-[275]">Navigations</div>
      <div className="flex flex-col mt-4 max-w-full text-base w-[140px]">
        <div className="flex flex-col w-full">
          {navigationItems.map((item) => (
            <Link 
              key={item.id} 
              to={item.path}
              onClick={scrollToTop}
              className={`${item.id > 1 ? "mt-2" : ""} hover:text-gray-300 transition-colors`}
            >
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}