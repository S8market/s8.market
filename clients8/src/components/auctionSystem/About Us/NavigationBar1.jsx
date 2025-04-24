import React, { useState } from 'react';

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Properties', href: '#' },
  { label: 'About Us', href: '#', isActive: true },
  { label: 'Contact Us', href: '#' }
];

function NavigationBar1() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex flex-wrap gap-5 justify-between px-9 py-3.5 w-full bg-white max-md:px-5 max-md:max-w-full">
      <div className="flex text-3xl font-extrabold leading-none text-sky-900 whitespace-nowrap">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a227a67fb1aa60ea4fcfdf701adff7cfa910ebdd82c2188f253364885db64408?placeholderIfAbsent=true&apiKey=2b64ceff962d4ae184f534c4b0acd108"
          alt="S8 Company Logo"
          className="object-contain shrink-0 w-16 aspect-[0.79]"
        />
        <div className="self-start mt-11 max-md:mt-10">s8</div>
      </div>
      <nav 
        className="flex flex-col pb-4 my-auto text-base text-right text-black max-md:max-w-full"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex flex-wrap gap-10 justify-between items-center py-2.5 w-full max-md:max-w-full">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`self-stretch my-auto hover:text-sky-900 transition-colors ${
                item.isActive ? 'text-xl font-semibold' : ''
              }`}
              aria-current={item.isActive ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
          <button 
            className="gap-2.5 self-stretch px-6 py-2.5 my-auto font-semibold text-white bg-sky-900 rounded-[55px] max-md:px-5 hover:bg-sky-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-900 focus:ring-offset-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Sign in"
          >
            Sign in
          </button>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1eef4d3689a4ee03f7a540c8b9c5bc8f04fea091b4fd8328e2e6f46766bf69cf?placeholderIfAbsent=true&apiKey=2b64ceff962d4ae184f534c4b0acd108"
          alt=""
          className="object-contain z-10 mt-0 ml-28 aspect-[26.32] w-[79px] max-md:ml-2.5"
        />
      </nav>
    </header>
  );
}

export default NavigationBar1;