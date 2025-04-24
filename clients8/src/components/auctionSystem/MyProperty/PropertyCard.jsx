import React from "react";

export default function PropertyCard() {
  return (
    <div className="flex overflow-hidden flex-col items-start py-9 pr-20 pl-8 mt-14 w-full bg-white rounded-3xl border border-solid border-black border-opacity-30 max-w-[1309px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between ml-3 w-full max-w-[1041px] max-md:max-w-full">
        <div className="flex gap-3.5 text-2xl font-semibold text-black">
          <div className="grow">Auctions</div>
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6886b9d25f1e7b4fe1191ea50dca2852511f96bba3327a22b1dd9a75f32d73f0?placeholderIfAbsent=true&apiKey=289b2f6eb1774e2f9cac4324cda58d87" 
            alt="" 
            className="object-contain shrink-0 my-auto w-3.5 aspect-[0.58]" 
          />
          <div className="basis-auto">Sangam Niwas</div>
        </div>
        <div className="my-auto text-xl tracking-normal leading-none text-center text-gray-500">
          Showing Sangam Niwas
        </div>
      </div>
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b72c66185a6c1792b8b300b6435b6e861f038320f348977b480aac4132fc369f?placeholderIfAbsent=true&apiKey=289b2f6eb1774e2f9cac4324cda58d87" 
        alt="" 
        className="object-contain mt-3.5 ml-3 w-full aspect-[1000] max-w-[1041px] max-md:max-w-full" 
      />
      <div className="mt-7 w-full max-w-[1157px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start w-full max-md:mt-10 max-md:max-w-full">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e411a1e874e2d91c4eaebb4bab0ccc3d0d93717c0425b650223e5e2114487464?placeholderIfAbsent=true&apiKey=289b2f6eb1774e2f9cac4324cda58d87" 
                alt="Sangam Niwas property" 
                className="object-contain ml-3 max-w-full rounded-3xl aspect-[1.38] w-[507px]" 
              />
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/12c69fc134174db2ff94464ba3cd7be34fca26d00a272bbaee02a43a76baaddc?placeholderIfAbsent=true&apiKey=289b2f6eb1774e2f9cac4324cda58d87" 
                alt="Additional property view" 
                className="object-contain mt-4 max-w-full aspect-[3.53] w-[516px]" 
              />
              <div className="space-y-4">
            <div className="flex items-start gap-8">
              <div className="w-32 font-medium text-gray-700">Location :</div>
              <div className="flex-1 text-gray-600">Near Subham hall, Anand Vihar, Mumbai -68</div>
            </div>
            <div className="flex items-start gap-8">
              <div className="w-32 font-medium text-gray-700">Price :</div>
              <div className="flex-1 text-gray-600">₹1,00,00,000</div>
            </div>
            <div className="flex items-start gap-8">
              <div className="w-32 font-medium text-gray-700">Description :</div>
              <div className="flex-1 text-gray-600">Near Subham hall, Anand Vihar, Mumbai -68</div>
            </div>
            <div className="flex items-start gap-8">
              <div className="w-32 font-medium text-gray-700">Enquiry Url :</div>
              <div className="flex-1">
                <a href="http://www.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  www.google.com
                </a>
              </div>
            </div>
          </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-wrap grow gap-10 max-md:mt-10 max-md:max-w-full">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe3c6b42e4e078ede14b4a2a4c30939ba71609d0a6351cefaa2464dfb0dfb866?placeholderIfAbsent=true&apiKey=289b2f6eb1774e2f9cac4324cda58d87" 
                alt="" 
                className="object-contain shrink-0 w-px aspect-[0]" 
              />
              <div className="flex flex-col grow shrink-0 self-start basis-0 w-fit max-md:max-w-full">
                <div className="max-md:max-w-full">
                  <dl className="flex gap-5 max-md:flex-col">
                    <div className="flex flex-col w-[34%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow text-xl font-medium text-slate-600 max-md:mt-3">
                        <dt>Category :</dt>
                        <dt className="mt-7">Auction Date :</dt>
                        <dt className="mt-7">Auction Time :</dt>
                        <dt className="mt-7">Area (per sqft) :</dt>
                        <dt className="mt-7">Nearby Places :</dt>
                        <dt className="mt-7">Location :</dt>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[66%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col mt-1.5 text-xl font-light leading-snug text-slate-400 max-md:mt-5">
                        <div className="flex flex-col self-start ml-3.5 max-md:ml-2.5">
                          <dd className="max-md:mr-2.5">Housing property</dd>
                          <dd className="self-start mt-7">10/01/2025</dd>
                          <dd className="mt-8">10:30 am - 3:00 pm</dd>
                          <dd className="self-start mt-6">65,000 sqft</dd>
                        </div>
                        <dd className="mt-7">Shubham hall , Dmart , Pizza Hut</dd>
                      </div>
                    </div>
                  </dl>
                </div>
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c2f1bce556ac4bc18ebb5b8dada627d6be6d5f89f8f271a5a7439716dc94350f?placeholderIfAbsent=true&apiKey=289b2f6eb1774e2f9cac4324cda58d87" 
                  alt="Property location map" 
                  className="object-contain mt-7 w-full aspect-[1.97] max-md:mr-1.5 max-md:max-w-full" 
                />
                <button 
                  className="flex overflow-hidden gap-7 items-start self-center px-11 py-2.5 mt-20 ml-9 text-xl text-white bg-sky-900 rounded-xl max-md:px-5 max-md:mt-10"
                  aria-label="Enquire about this property"
                >
                  <img 
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5385dea9b48c3c7874eda6200f93e1e75173072413566b71df2586cca1a71dd6?placeholderIfAbsent=true&apiKey=289b2f6eb1774e2f9cac4324cda58d87" 
                    alt="" 
                    className="object-contain shrink-0 aspect-square w-[34px]" 
                  />
                  <span>Enquire Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}