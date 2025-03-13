import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import ProcessSteps from "./components/ProcessSteps";
// import PropertyCard from "./components/PropertyCard";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import PropertyAuctions from "./components/PropertyAuctions";
import PropertyCard from '../auctionSystem/UsersidePrime/PropertyCard';
import { toast } from 'react-toastify';
import Contact from './components/Contact';

export default function AuctionLanding() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: (
        <>
          <span className="text-yellow-900">V</span>
          <span className="text-white">alue,</span>{" "}
          <span className="text-yellow-600">B</span>
          <span className="text-white">uy, Sell</span>
        </>
      ),
      description: "Welcome to S8 where opportunity meets value: explore and acquire distressed assets from top banks with ease and confidence. ",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4fee83c532ee2cbc0dbe8438799b6e163611a329dff92d59d5826885bac100c5?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031"
    },
    {
      title: (
        <>
          <span className="text-yellow-900">E</span>
          <span className="text-white">xplore</span>{" "}
          <span className="text-yellow-600">P</span>
          <span className="text-white">roperty</span>
        </>
      ),
      description: " S8 houses a comprehensive listing of distressed properties, simplifying the search process for investors to identify profitable opportunities. We feature exhaustive listings, such as property details, reserve prices, and auction dates. ",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"
    },
    {
      title: (
        <>
          <span className="text-yellow-900">A</span>
          <span className="text-white">uction</span>{" "}
          <span className="text-yellow-600">D</span>
          <span className="text-white">eals</span>
        </>
      ),
      description: "S8 is involved in highlighting properties that have been put up for sale through bank auctions, providing transparency and ease of accessibility. Users can look through a range of assets, from residential to commercial property.",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3"
    },
    {
      title: (
        <>
          <span className="text-yellow-900">I</span>
          <span className="text-white">nvest</span>{" "}
          <span className="text-yellow-600">S</span>
          <span className="text-white">mart</span>
        </>
      ),
      description: "Investors can make smart choices by accessing authentic information and expert opinion. We help with assisting users in finding high-potential investments with low risk.",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3"
    },
    {
      title: (
        <>
          <span className="text-yellow-900">L</span>
          <span className="text-white">uxury</span>{" "}
          <span className="text-yellow-600">L</span>
          <span className="text-white">iving</span>
        </>
      ),
      description: "S8 also has luxury properties that blend luxury with value, targeting sophisticated buyers. These properties tend to feature exclusive homes in prime locations at competitive prices.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3"
    },
    {
      title: (
        <>
          <span className="text-yellow-900">T</span>
          <span className="text-white">rusted</span>{" "}
          <span className="text-yellow-600">C</span>
          <span className="text-white">hoice</span>
        </>
      ),
      description: "S8 is a trusted website supported by an assurance of precision and customer satisfaction. Our simple interface and comprehensive support make it the top choice of property investors.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <div className="pr-20 pl-2 w-full bg-[#004663] max-md:pr-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[64%] max-md:ml-0 max-md:w-full">
            <div className="flex relative flex-col items-start px-8 pt-12 w-full text-base text-right min-h-[643px] pb-[546px] text-white text-opacity-40 max-md:px-5 max-md:pb-24 max-md:max-w-full">
              <img
                loading="lazy"
                src={slides[currentSlide].image}
                alt={`Slide ${currentSlide + 1}`}
                className="object-cover absolute inset-0 size-full transition-opacity duration-500"
              />
              {/* SearchBar removed from here */}
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[36%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-20 max-md:mt-10 max-md:max-w-full">
              <div className="text-9xl font-extrabold text-yellow-900 leading-[112px] max-md:max-w-full max-md:text-4xl max-md:leading-10">
                {slides[currentSlide].title}
              </div>
              <div className="self-end mt-14 mr-7 text-xl leading-7 text-white max-md:mt-10 max-md:mr-2.5">
                {slides[currentSlide].description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 justify-between self-end mt-12 mr-24 max-w-full w-[682px] max-md:mt-10 max-md:mr-2.5">
        <div className="flex gap-4 items-center my-auto">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex shrink-0 self-stretch my-auto w-4 h-4 rounded-full transition-colors duration-300 ${
                index === currentSlide ? "bg-sky-900" : "bg-zinc-300 hover:bg-zinc-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        {/* <button className="flex gap-2 justify-center items-center px-6 py-4 rounded-2xl bg-sky-900 bg-opacity-10 max-md:px-5">
          <div className="self-stretch my-auto text-lg leading-none text-center rounded-lg text-zinc-900 w-[121px]">
            View Auctions
          </div>
          <div className="flex gap-1 justify-center items-center self-stretch px-1 my-auto w-8 h-8 rounded-lg bg-zinc-900 bg-opacity-10">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d6704744fb3259d66d38d3ecc5a305d56a73c2e8a355ce17304faa8ca159a55?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031"
              alt="View Arrow"
              className="object-contain self-stretch my-auto w-6 aspect-square"
            />
          </div>
        </button> */}
      </div>
      <div className="flex flex-col pr-7 pl-16 mt-12 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="shrink-0 self-end max-w-full h-px border border-black border-solid w-[1312px]" />
        <div className="flex gap-5 items-center mt-16 max-w-full leading-none w-[401px] max-md:mt-10">
          {/* <div className="text-xl text-black">Bid on item</div> */}
          {/* <div className="text-xl text-black">
          <button 
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate('/sign-up');
                }}
                className="text-xl text-black">
                Bid on item
              </button>

          </div>
          <div className="text-xl text-black">
          <button 
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate('/sign-up');
                }}
                className="text-xl text-black">
                Become a Seller
              </button>
            </div> */}
        </div>
        <div className="self-center mt-5 ml-7 text-2xl font-semibold leading-9 text-center text-sky-900 w-[1022px] max-md:mt-10 max-md:max-w-full">
        S8 facilitates an effortless registration experience, complemented by its seamless and efficient functionality. For a smooth and hassle-free experience follow the steps below:  
        </div>
        <ProcessSteps />
      </div>
      <div className="flex relative flex-col justify-center items-center px-16 py-24 mt-14 w-full min-h-[334px] max-md:px-5 max-md:pt-24 max-md:mt-10 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/424d8d6b4e807e290df9eebae9bcb92a30cda7be832bb9346b486b290eb12e8b?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031"
          alt="Footer Background"
          className="object-cover absolute inset-0 size-full"
        />
        <div className="relative max-w-full w-[873px]">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="relative text-2xl font-bold leading-9 text-right text-white max-md:mt-9 max-md:max-w-full">
                Empowering banks to showcase auctions effortlessly and
                connecting users to valuable opportunities seamlessly.
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <button 
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate('/sign-up');
                }}
                className="relative gap-5 px-9 py-5 mt-1.5 text-3xl font-bold text-white border-2 border-white border-solid max-md:px-5 max-md:mt-10 hover:bg-white hover:text-sky-900 transition-all duration-300">
                Register to get started
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <PropertyAuctions/> */}
      <div className="py-16">
        <p className="text-center text-4xl font-semibold text-[#004663] mb-8">Explore our latest property Auctions :</p>
        <PropertyCard/>
      </div>
      <div>
      <Contact/>
      </div>
      {/* {<PropertyCard/>} */}
      {/* <PropertyCard/>
      <ContactForm/>
      <ContactInfo/> */}
    </div>
  );
}
