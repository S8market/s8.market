import Header from "../../dashComponent/nav/header/Header";
import Sidebar from "../../dashComponent/Sidebar/Sidebar";
import ImageUpload from "../../dashComponent/upload/ImageUpload";
import "./addAsset.scss"

import { useState } from "react";
import PropertyDetailsForm from "../../dashComponent/nAsset Forms/PropertyDetailForm";
import AddressDetailsForm from "../../dashComponent/nAsset Forms/AddressForm";
import AuctionDetailsForm from "../../dashComponent/nAsset Forms/AuctionForm";
import Breadcrumb from "../../dashComponent/nAsset Forms/Breadcrumb";

const AddAsset = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="addAsset">
     <div className="sideContainerAdd">
       <Sidebar />
     </div>
     <div className="addAssetContainer">
      <Header />
     <div className="mainAddAsset">
      {/* Top header */}
     <div className="container-header">
      <span>Assets &gt; </span>
      <span className="active">Add New Asset</span>
     </div>

      {/* Left Side */}
     <div className="imaegFormContainer">
      <ImageUpload />


{/* Rigt Side */}
{/* Breadcrumb with Dynamic Step Navigation */}
     <div className="formWrapper">
        {/* Breadcrumb Component */}
        <Breadcrumb step={step} setStep={setStep} />
    

      {/* Form Content */}
      {step === 1 && <PropertyDetailsForm nextStep={nextStep} />}


      {step === 2 && <AddressDetailsForm nextStep={nextStep} prevStep={prevStep}/>}

            
      {step === 3 && <AuctionDetailsForm nextStep={handleSubmit} prevStep={prevStep} />}


          {/* Navigation Buttons */}
          {/* <div className="buttonContainer">
          {step > 1 && <button onClick={prevStep} className="btn">Back</button>}
          {step < 3 ? (
            <button onClick={nextStep} className="btn">Next</button>
          ) : (
            <button className="btn submit">Submit</button>
          )}
        </div> */}
            
            </div>
     </div>
     </div>
     </div>
     </div>
   
  
  )
}

export default AddAsset
