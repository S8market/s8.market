import * as React from "react";

export default function ContactForm() {
  return (
    <form className="flex flex-col mt-10 w-full text-sm max-w-[545px] text-zinc-500 max-md:max-w-full">
      <div className="mb-5">
        <label htmlFor="name" className="sr-only">Name</label>
        <input
          type="text"
          id="name"
          required
          className="gap-2.5 self-stretch px-5 py-3.5 w-full tracking-normal leading-6 border border-solid border-neutral-200 min-h-[50px]"
          placeholder="Name *"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          type="email"
          id="email"
          className="gap-2.5 self-stretch px-5 py-3.5 w-full tracking-normal leading-6 border border-solid border-neutral-200 min-h-[50px]"
          placeholder="Email"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="phone" className="sr-only">Phone number</label>
        <input
          type="tel"
          id="phone"
          required
          className="gap-2.5 self-stretch px-5 py-3.5 w-full tracking-normal leading-6 border border-solid border-neutral-200 min-h-[50px]"
          placeholder="Phone number *"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="source" className="sr-only">How did you find us?</label>
        <select
          id="source"
          className="flex flex-wrap gap-10 justify-between items-center px-5 py-3.5 w-full tracking-normal leading-6 text-black border border-solid border-neutral-200 min-h-[50px]"
        >
          <option value="">How did you find us?</option>
          <option value="search">Search Engine</option>
          <option value="social">Social Media</option>
          <option value="referral">Referral</option>
        </select>
      </div>
      <button
        type="submit"
        className="gap-2.5 self-stretch px-6 py-4 w-full text-base font-bold text-white uppercase whitespace-nowrap bg-sky-900 min-h-[50px] max-md:px-5"
      >
        send
      </button>
    </form>
  );
}