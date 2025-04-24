import React from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

export function Contact() {
  return (
    <div className="w-full bg-white mt-10 px-4 md:flex md:justify-center">
      <div className="w-full max-w-3xl md:px-10">
        <div className="text-black text-center mb-10">
          <div className="text-6xl font-bold max-md:text-4xl">
            Get in <span className="text-sky-900">Touch</span>
          </div>
        </div>
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  );
}

export default Contact;
