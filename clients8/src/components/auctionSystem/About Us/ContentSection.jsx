import React from 'react';

function ContentSection() {
  return (
    <section 
      className="flex z-10 flex-col pl-16 pr-16 mt-0 w-full max-md:pl-5 max-md:pr-5 max-md:max-w-full pb-24"
      aria-labelledby="content-heading"
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/df192b26d58b7bf2032821a18822751aa88e0af9f8b2fb06f6c2405135c82008?placeholderIfAbsent=true&apiKey=2b64ceff962d4ae184f534c4b0acd108"
        alt="Content section illustration"
        className="object-contain w-full aspect-[2.02] max-w-[1312px] max-md:max-w-full"
      />
      <h2  
        id="content-heading"
        className="self-start mt-28 ml-36 pr-16 text-5xl font-bold leading-none text-black max-md:mt-10 max-md:ml-2.5 max-md:pr-5 max-md:text-4xl"
      >
        Vision Statement :
      </h2>
      <div className="shrink-0 self-center mt-9 ml-9 max-w-full h-px border border-black border-solid w-[1089px]" />
      <div className="flex items-center mt-6 max-md:flex-col">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7124222beb660e291682604bfdc18cb0cf810f3cdbdc751aa3e97a91eeb00ce?placeholderIfAbsent=true&apiKey=2b64ceff962d4ae184f534c4b0acd108"
          alt="Featured content image"
          className="object-contain z-10 ml-60 mr-4 w-[437px] h-[323px] max-md:max-w-full"
        />
        <div className="flex flex-col w-[32%] max-md:ml-0 max-md:w-full text-base leading-6 text-neutral-800">
          <p>
            Our vision is to create a more interactive and classified platform tailored for bankers, ensuring a seamless and efficient process for managing distressed assets. We strive to transform stressed assets into valuable opportunities, empowering financial institutions to offload properties with ease while enabling buyers to access and evaluate assets more effectively. By bridging the gap between banks and investors, we aim to foster a transparent, data-driven, and dynamic marketplace that benefits all stakeholders.
          </p>
        </div>
      </div>
      <h2  
        id="content-heading"
        className="self-start mt-28 ml-36 pr-16 text-5xl font-bold leading-none text-black max-md:mt-10 max-md:ml-2.5 max-md:pr-5 max-md:text-4xl"
      >
        Mission Statement :
      </h2>
      <div className="shrink-0 self-center mt-9 ml-9 max-w-full h-px border border-black border-solid w-[1089px]" />
      <div className="flex flex-row-reverse items-center mt-6 max-md:flex-col">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7124222beb660e291682604bfdc18cb0cf810f3cdbdc751aa3e97a91eeb00ce?placeholderIfAbsent=true&apiKey=2b64ceff962d4ae184f534c4b0acd108"
          alt="Featured content image"
          className="object-contain z-10 mr-60 ml-4 w-[437px] h-[323px] max-md:max-w-full"
        />
        <div className="flex flex-col w-[32%] max-md:ml-0 max-md:w-full text-base leading-6 text-neutral-800">
          <p>
            Our mission is to revolutionize the way distressed assets are listed, accessed, and acquired in an increasingly digital and fast-paced world. By providing a seamless and interactive online platform, we enable bankers to reach a wider pool of buyers beyond traditional newspaper listings, maximizing asset visibility and market potential. Our goal is to simplify and enhance the auction process, ensuring a more efficient, transparent, and user-friendly experience for both bankers and buyers. Through innovation and technology, we strive to make asset transactions smoother, smarter, and more accessible for all.
          </p>
        </div>
      </div>
    </section>
  );
}


export default ContentSection;

// import React from 'react';

// function ContentSection() {
//   return (
//     <section 
//       className="flex z-10 flex-col pl-16 mt-0 w-full max-md:pl-5 max-md:max-w-full"
//       aria-labelledby="content-heading"
//     >
//       <img
//         loading="lazy"
//         src="https://cdn.builder.io/api/v1/image/assets/TEMP/df192b26d58b7bf2032821a18822751aa88e0af9f8b2fb06f6c2405135c82008?placeholderIfAbsent=true&apiKey=2b64ceff962d4ae184f534c4b0acd108"
//         alt="Content section illustration"
//         className="object-contain w-full aspect-[2.02] max-w-[1312px] max-md:max-w-full"
//       />
//       <h2 
//         id="content-heading"
//         className="self-start mt-28 ml-36 text-5xl font-bold leading-none text-black max-md:mt-10 max-md:ml-2.5 max-md:text-4xl"
//       >
//         Vision Statement :
//       </h2>
      
//       <div className="shrink-0 self-center mt-9 ml-9 max-w-full h-px border border-black border-solid w-[1089px]" />
//       <div className="self-end mt-6 w-full max-w-[1229px] max-md:max-w-full">
//         <div className="flex gap-5 max-md:flex-col">
//         <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
//                   <img
//                     loading="lazy"
//                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7124222beb660e291682604bfdc18cb0cf810f3cdbdc751aa3e97a91eeb00ce?placeholderIfAbsent=true&apiKey=2b64ceff962d4ae184f534c4b0acd108"
//                     alt="Featured content image"
//                     className="object-contain z-10 mr-0 w-full aspect-[1.35] max-md:max-w-full"
//                   />
//                 </div>
//           <div className="flex flex-col w-[32%] max-md:ml-0 max-md:w-full">
//             <div className="mt-9 text-base leading-6 text-neutral-800 max-md:mt-10">
//               <p>
//               Our mission is to revolutionize the way distressed assets are listed, accessed, and acquired in an increasingly digital and fast-paced world. By providing a seamless and interactive online platform, we enable bankers to reach a wider pool of buyers beyond traditional newspaper listings, maximizing asset visibility and market potential. Our goal is to simplify and enhance the auction process, ensuring a more efficient, transparent, and user-friendly experience for both bankers and buyers. Through innovation and technology, we strive to make asset transactions smoother, smarter, and more accessible for all.
//               </p>
//               {/* <p className="mt-6">
//                 Nulla phasellus vitae amet, molestie. Dignissim augue in rhoncus
//                 eget nibh adipiscing. Magna feugiat proin semper convallis
//                 pretium auctor condimentum lorem lobortis. Pretium, facilisis
//                 amet enim hac. In ut sit gravida quam eu vitae, ultrices
//                 rhoncus. Viverra quis libero nulla egestas quis ornare vitae.
//               </p> */}
//             </div>
//           </div>
//           <div className="flex flex-col ml-5 w-[68%] max-md:ml-0 max-md:w-full">
//             <div className="grow max-md:mt-10 max-md:max-w-full">
//               <div className="flex gap-5 max-md:flex-col">
                
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <h2 
//         id="content-heading"
//         className="self-start mt-28 ml-36 text-5xl font-bold leading-none text-black max-md:mt-10 max-md:ml-2.5 max-md:text-4xl"
//       >
//         Mission Statement :
//       </h2>
//       <div className="shrink-0 self-center mt-9 ml-9 max-w-full h-px border border-black border-solid w-[1089px]" />
//       <div className="self-end mt-6 w-full max-w-[1229px] max-md:max-w-full">
//         <div className="flex gap-5 max-md:flex-col">
//           <div className="flex flex-col w-[32%] max-md:ml-0 max-md:w-full">
//             <div className="mt-9 text-base leading-6 text-neutral-800 max-md:mt-10">
//               <p>
//               Our mission is to revolutionize the way distressed assets are listed, accessed, and acquired in an increasingly digital and fast-paced world. By providing a seamless and interactive online platform, we enable bankers to reach a wider pool of buyers beyond traditional newspaper listings, maximizing asset visibility and market potential. Our goal is to simplify and enhance the auction process, ensuring a more efficient, transparent, and user-friendly experience for both bankers and buyers. Through innovation and technology, we strive to make asset transactions smoother, smarter, and more accessible for all.
//               </p>
//               {/* <p className="mt-6">
//                 Nulla phasellus vitae amet, molestie. Dignissim augue in rhoncus
//                 eget nibh adipiscing. Magna feugiat proin semper convallis
//                 pretium auctor condimentum lorem lobortis. Pretium, facilisis
//                 amet enim hac. In ut sit gravida quam eu vitae, ultrices
//                 rhoncus. Viverra quis libero nulla egestas quis ornare vitae.
//               </p> */}
//             </div>
//           </div>
//           <div className="flex flex-col ml-5 w-[68%] max-md:ml-0 max-md:w-full">
//             <div className="grow max-md:mt-10 max-md:max-w-full">
//               <div className="flex gap-5 max-md:flex-col">
//                 <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
//                   <img
//                     loading="lazy"
//                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7124222beb660e291682604bfdc18cb0cf810f3cdbdc751aa3e97a91eeb00ce?placeholderIfAbsent=true&apiKey=2b64ceff962d4ae184f534c4b0acd108"
//                     alt="Featured content image"
//                     className="object-contain z-10 mr-0 w-full aspect-[1.35] max-md:max-w-full"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ContentSection;
