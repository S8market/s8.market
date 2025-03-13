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
            S8 is an innovative digital platform designed to streamline the listing and assessment of distressed assets owned by banks and financial institutions, making them easily accessible to the market and potential buyers. By providing a centralized and transparent marketplace, S8 empowers entrepreneurs and investors with comprehensive property insights, enabling them to evaluate opportunities with confidence and ease.
            </p>
            <p className="relative text-lg leading-7 text-neutral-800 mt-7 max-md:max-w-full">
            More than just a platform, S8 is a game-changer for both buyers and banks navigating the complex world of distressed assets. We simplify the process by seamlessly connecting financial institutions looking to offload assets with investors eager to discover hidden opportunities.
            </p>
            <p className="relative text-lg leading-7 text-neutral-800 mt-7 max-md:max-w-full">
            Our platform aggregates listings from multiple banks and their branches, creating a robust database of distressed assets for prospective buyers. With an intuitive and user-friendly interface, investors can efficiently explore, compare, and assess properties that align with their investment goals and risk appetite. S8 enhances the evaluation process by providing in-depth property insights, valuation data, and essential documentation—empowering buyers to make well-informed decisions before placing their bids in the auction.
            </p>
            <p className="relative text-lg leading-7 text-neutral-800 mt-7 max-md:max-w-full">
            By bridging the gap between financial institutions and investors, S8 fosters a more efficient, transparent, and competitive marketplace for distressed asset transactions, ultimately driving better outcomes for all stakeholders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;