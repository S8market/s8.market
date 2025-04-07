import React from 'react';

function AboutHero() {
  return (
    <section 
      className="flex relative flex-col items-end px-16 pt-20 pb-56 w-full min-h-[744px] max-md:px-5 max-md:pb-24 max-md:max-w-full"
      aria-labelledby="about-heading"
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a45cd3f498de6ea92c1b0ff513a94ef6986022646bbc5ceca843df47a55ffd0e?placeholderIfAbsent=true&apiKey=2b64ceff962d4ae184f534c4b0acd108"
        alt="About section background"
        className="object-cover absolute inset-0 size-full"
        role="presentation"
      />
      <div className="relative mb-0 max-w-full w-[938px] max-md:mb-2.5">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[26%] max-md:ml-0 max-md:w-full">
            <h1 
              id="about-heading"
              className="relative text-7xl font-extrabold text-right leading-[63px] text-zinc-800 max-md:mt-10 max-md:text-4xl max-md:leading-10"
            >
              About <span className="text-8xl text-sky-900">S8</span>
            </h1>
          </div>
          <div className="flex flex-col ml-5 w-[74%] max-md:ml-0 max-md:w-full">
          <p className="relative text-lg leading-7 text-neutral-800 mt-7 max-md:max-w-full">
          S8 is an innovative online platform that streamlines the listing and valuation of banks' and financial institutions' distressed assets, making them available in a transparent and centralized marketplace. This enables entrepreneurs and investors to view detailed property information, facilitating informed decision-making with ease and confidence.
          </p>
          <p className="relative text-lg leading-7 text-neutral-800 mt-7 max-md:max-w-full">
            By bridging the gap between financial institutions and potential purchasers, S8 upends the traditional model of distressed asset sales. It develops a cost-effective, user-friendly platform on which investors are able to quickly move through, analyze, and compare properties according to their investment goals and risk preference. The platform enhances the assessment process by providing detailed property information, valuation, and supporting required documentation.

            </p>
            <p className="relative text-lg leading-7 text-neutral-800 mt-7 max-md:max-w-full">
            S8's innovative strategy facilitates a more competitive and transparent market for the sale of distressed assets. This creates win-win results, enhancing the efficiency of asset transactions for financial institutions while releasing latent value for investors. 

            </p>
            
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;