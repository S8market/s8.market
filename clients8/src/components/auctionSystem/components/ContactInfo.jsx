import * as React from "react";

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/91181e0d2a5baf572ac5879e283dd1ca959a256a67799f42940a86b36cc1ded6?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031",
      label: "PHONE",
      value: "+91 9820457323",
      alt: "Phone icon"
    },
    // {
    //   icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/67520576c13f25c927db3d6d72224c53b0055c26ea469f84785c2a68f93b2a89?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031",
    //   label: "FAX",
    //   value: "03 5432 1234",
    //   alt: "Fax icon"
    // },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/69a27f8c47ce4b228218a96b6579489f1511f14188e02935b2f74ddc809f41f3?placeholderIfAbsent=true&apiKey=94eb20460e0f412389c7e1a6f1ae6031",
      label: "EMAIL",
      value: " s8contact.us@gmail.com",
      alt: "Email icon"
    }
  ];

  return (
    <div className="flex flex-wrap gap-10 items-start max-md:max-w-full pt-4 pb-8">
      {contactDetails.map((detail, index) => (
        <div key={index} className="flex gap-4 items-center">
          <img
            loading="lazy"
            src={detail.icon}
            alt={detail.alt}
            className="object-contain shrink-0 self-stretch my-auto w-7 aspect-square"
          />
          <div className="self-stretch my-auto text-sm tracking-wide leading-5 text-yellow-900">
            <span className="font-semibold">{detail.label}</span>
            <br />
            <span className="text-yellow-900">{detail.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
