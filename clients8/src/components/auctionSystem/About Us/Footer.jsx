import * as React from "react";
import { NavigationLinks } from "../components/Navigation Links";
import NewsletterForm from "../components/NewsletterForm";

function Footer() {
  return (
    <div className="flex flex-col px-16 py-10 w-full bg-zinc-800 max-md:px-4 max-md:max-w-full">
      <div className="flex flex-wrap items-start justify-between gap-12 max-md:max-w-full">
        <div className="flex flex-col text-white rounded-none min-w-[240px] w-[300px]">
          <div className="self-start text-3xl font-bold leading-8">
            S8 Auctions
          </div>
          <div className="mt-3 text-sm leading-6">
            2nd Floor, Sabu building, Cawasji Patel Tank Road (CP Tank Road),
            Gulal Wadi, Bhuleshwar,
            <br />
            Mumbai , Maharashtra
          </div>
        </div>
        
        <NavigationLinks />

        <div className="flex flex-col min-w-[240px] w-[350px] max-md:max-w-full">
          <NewsletterForm />
          <div className="self-start mt-3 text-sm font-light text-white">
            s8contact.us@gmail.com
          </div>
          <div className="self-start text-sm font-light text-white">
            +91 9820457323
          </div>
          <div className="flex flex-wrap gap-4 items-end mt-6 ml-px min-h-[70px] max-md:max-w-full">
            <button className="flex flex-col grow shrink justify-center px-3 py-2 text-base font-semibold text-white w-[130px]">
              <div className="gap-0 self-stretch">Terms &amp; Conditions</div>
            </button>
            <button className="flex flex-col grow shrink justify-center items-start px-3 py-2 text-base font-semibold text-white w-[130px] max-md:pr-4">
              <div className="gap-0 self-stretch">Privacy Policy</div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-6 mt-8 text-sm leading-relaxed text-white max-w-[1160px] max-md:mt-6 max-md:max-w-full">
        <div className="shrink basis-auto grow-0">
          2025 s8 Auction Online. All rights reserved
        </div>
        <div className="shrink-0 my-auto max-w-full h-0 border-white w-[500px]" />
      </div>
    </div>
  );
}

export default Footer;