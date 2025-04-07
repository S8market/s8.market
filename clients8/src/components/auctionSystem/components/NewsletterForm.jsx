import * as React from "react";

function NewsletterForm() {
  return (
    <form className="flex flex-wrap gap-0.5 items-start w-full text-base font-bold text-white min-h-[72px] max-md:max-w-full">
      <div className="grow shrink text-xl leading-none w-[291px]">
        subscribe to our newsletter
      </div>
      <label htmlFor="emailInput" className="sr-only">
        Email address
      </label>
      <input
        id="emailInput"
        type="email"
        className="grow shrink leading-relaxed text-white py-2.5 text-opacity-40 w-[221px] bg-transparent"
        placeholder="enter your email address"
        aria-label="Email address"
      />
      <button
        type="submit"
        className="grow shrink gap-2.5 px-5 py-2.5 whitespace-nowrap border border-white border-solid w-[62px]"
      >
        Send
      </button>
      <div className="grow shrink h-px border border-white border-solid min-w-[240px] w-[322px]" />
    </form>
  );
}

export default NewsletterForm;

// import * as React from "react";

// export default function NewsletterForm() {
//   return (
//     <form className="flex flex-col mt-12 w-full max-md:mt-10 max-md:max-w-full">
//       <div className="flex flex-wrap gap-7 w-full max-md:max-w-full">
//         <div className="flex flex-col grow shrink-0 items-start basis-0 w-fit max-md:max-w-full">
//           <label htmlFor="newsletter-email" className="text-xl font-bold leading-none text-white">
//             subscribe to our newsletter
//           </label>
//           <input
//             type="email"
//             id="newsletter-email"
//             className="mt-4 w-full bg-transparent text-base leading-relaxed text-white text-opacity-40 border-b border-white"
//             placeholder="enter your email address"
//             aria-label="Email address for newsletter"
//           />
//         </div>
//         <button
//           type="submit"
//           className="gap-2.5 self-end px-5 py-2.5 mt-8 text-base font-bold text-white whitespace-nowrap border border-white border-solid"
//         >
//           Send
//         </button>
//       </div>
//     </form>
//   );
// }