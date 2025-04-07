import React from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

export function Contact() {
  return (
    <div className="overflow-hidden self-center pl-20 mt-10 ml-20 max-w-full bg-white border-zinc-500 w-[1298px] max-md:pl-5 max-md:mt-10">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto max-md:w-full">
          <div className="flex flex-col items-center w-full max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col items-center w-full max-md:max-w-full">
              <div className="flex flex-col items-center text-black w-full max-w-[545px]">
                <div className="text-6xl max-md:text-4xl text-center">
                  <span className="font-bold">Get in </span>
                  <span className="font-bold text-sky-900">Touch</span>
                </div>
{/*                 <div className="mt-5 text-sm font-semibold tracking-normal leading-6 text-center max-md:max-w-full">
                  Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.
                </div> */}
              </div>
              <ContactForm />
            </div>
            <ContactInfo />
          </div>
        </div>
        {/* <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="grow max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col">
              <div className="text-3xl font-bold text-sky-900 mb-4">
                Locate us 
              </div>
              <div className="w-full h-[500px] bg-sky-900">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.4538030887393!2d72.82579849999999!3d18.955555599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce17bb66695d%3A0x3bf6d99cbddc25e2!2sSabu%20Building%2C%20Cawasji%20Patel%20Tank%20Rd%2C%20Charni%20Road%20East%2C%20Cawasji%20Patel%20Tank%2C%20Bhuleshwar%2C%20Mumbai%2C%20Maharashtra%20400004!5e0!3m2!1sen!2sin!4v1738952599779!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Contact;
