import { useContext, useState } from "react";
import "./auctionForm.scss";
import PropTypes from "prop-types";
import { AppContext } from "../../context/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuctionDetailsForm = ({ prevStep }) => {
  const {
    formData,
    setFormData,
    uploadedFiles,
    setUploadedFiles,
    serverUrl,
    editProperty,
    setEditProperty,
    propertyId, setPropertyId,
  } = useContext(AppContext);
  const navigate = useNavigate()

  const [showPopup, setShowPopup] = useState(false); // State for popup message
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message content

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      const newFormData = new FormData();
      newFormData.append("title", formData.title);
      newFormData.append("category", formData.category);
      newFormData.append("auctionType", formData.auctionType);
      newFormData.append("auctionDate", formData.auctionDate);
      newFormData.append("auctionTime", formData.auctionTime);
      newFormData.append("area", formData.area);
      newFormData.append("price", formData.price);
      newFormData.append("video", formData.video);
      newFormData.append("description", formData.description);
      newFormData.append("contact", formData.contact);
      newFormData.append("nearbyPlaces", formData.nearbyPlaces);
      newFormData.append("latitude", formData.latitude);
      newFormData.append("longitude", formData.longitude);
      newFormData.append("address", JSON.stringify(formData.address));
      newFormData.append("auctionUrl", formData.auctionUrl);
      newFormData.append("borrower", formData.borrower);
      newFormData.append("amountDue", formData.amountDue);
      newFormData.append("deposit", formData.deposit);
      newFormData.append("bidInc", formData.bidInc);
      newFormData.append("inspectDate", formData.inspectDate);
      newFormData.append("inspectTime", formData.inspectTime);
      newFormData.append("reservPrice", formData.reservPrice);
      newFormData.append("message", formData.message);
      
      if (!editProperty) {
        uploadedFiles.forEach((file) => newFormData.append("files", file));

        const { data } = await axios.post(
          serverUrl + "/api/v1/bank-user/add-property",
          newFormData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        console.log(data);
        if (data.success) {
          setPopupMessage("Asset information has been submitted!");
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
        }
        setFormData({
          title: "",
          category: "",
          auctionType: "",
          auctionDate: "",
          auctionTime: "",
          area: "",
          price: "",
          video: "",
          description: "",
          contact: "",
          nearbyPlaces: "",
          latitude: "",
          longitude: "",
          address: {
            address: "",
            city: "",
            state: "",
            pincode: "",
          },
          auctionUrl: "",
          borrower: "",
          amountDue: "",
          deposit: "",
          bidInc: "",
          inspectDate: "",
          inspectTime: "",
          reservPrice: "",
          message: "",
        });
        navigate('/view')
      } else {
        newFormData.append("propertyId", propertyId);
        // console.log("Updating property");
        // let newObj
        // console.log(formData);
        console.log(newFormData);
        for (let [key, value] of newFormData.entries()) {
          console.log(`${key}: ${value}`);
      }
        const { data } = await axios.post(
          serverUrl + "/api/v1/bank-user/update-property",
          newFormData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        console.log(data);
        if (data.success) {
          setPopupMessage("Asset information has been updated!");
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
        }
        setEditProperty(false);
        console.log(formData)
        setFormData({
          title: "",
          category: "",
          auctionType: "",
          auctionDate: "",
          auctionTime: "",
          area: "",
          price: "",
          video: "",
          description: "",
          contact: "",
          nearbyPlaces: "",
          latitude: "",
          longitude: "",
          address: {
            address: "",
            city: "",
            state: "",
            pincode: "",
          },
          auctionUrl: "",
          borrower: "",
          amountDue: "",
          deposit: "",
          bidInc: "",
          inspectDate: "",
          inspectTime: "",
          reservPrice: "",
          message: "",
        });
        setUploadedFiles([]);
        navigate(`/property/${propertyId}`)
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to update an existing property *******************************
  const handleUpdateProperty = async () => {
    try {
      const updateFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        updateFormData.append(key, value)
      );

      // Append new images
      newImages.forEach((file) => updateFormData.append("files", file));

      // Append removed images list
      updateFormData.append("removedImages", JSON.stringify(removedImages));

      const { data } = await axios.post(
        `${serverUrl}/api/v1/bank-user/update-property`,
        updateFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (data.success) {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <main className="auctionFormContainer">
      <div className="formContent">
        {/* Borrower/Mortgagor/Guarantors */}
        <section className="formGroup">
          <label>Borrower/Mortgagor/Guarantors:</label>
          <div className="inputWrapper">
            <input
              type="text"
              name="borrower"
              value={formData.borrower}
              onChange={handleChange}
              placeholder="Enter the name"
              aria-label="Borrower/Mortgagor/Guarantors"
            />
          </div>
        </section>

        {/* Amount Due */}
        <section className="formGroup">
          <label>Amount Due:</label>
          <div className="inputWrapper">
            <input
              type="text"
              name="amountDue"
              value={formData.amountDue}
              onChange={handleChange}
              placeholder="Enter the due amount"
              aria-label="Amount Due"
            />
          </div>
        </section>

        {/* Reserve Price */}
        <section className="formGroup">
          <label>Reserve Price:</label>
          <div className="inputWrapper">
            <input
              type="text"
              name="reservPrice"
              value={formData.reservPrice}
              onChange={handleChange}
              placeholder="Enter reserve price"
              aria-label="Reserve price"
            />
          </div>
        </section>

        {/* Earnest Money Deposit */}
        <section className="formGroup">
          <label>Earnest Money Deposit:</label>
          <div className="inputWrapper">
            <input
              type="text"
              name="deposit"
              value={formData.deposit}
              onChange={handleChange}
              placeholder="Enter Earnest Money Deposit"
              aria-label="Earnest Money Deposit"
            />
          </div>
        </section>

        {/* Bid Amount */}
        <section className="formGroup">
          <label>Bid Amount:</label>
          <div className="inputWrapper">
            <input
              type="text"
              name="bidInc"
              value={formData.bidInc}
              onChange={handleChange}
              placeholder="Enter the bidding amount"
              aria-label="Bid Amount"
            />
          </div>
        </section>

        {/* Auction Type */}
        <section className="formGroup">
          <label>Auction Type:</label>
          <div className="inputWrapper">
            <select
              name="auctionType"
              onChange={handleChange}
              value={formData.auctionType}
            >
              <option value="">Select the type</option>
              <option value="E-auction">E-auction</option>
              <option value="B">Normal</option>
              {/* <option value="C">C</option> */}
            </select>
          </div>
        </section>

        {/* Property Inspection Date */}
        <section className="formGroup">
          <label>Property Inspection Date:</label>
          <div className="inputWrapper">
            <input
              type="date"
              name="inspectDate"
              value={formData.inspectDate}
              onChange={handleChange}
              placeholder="DD-MM-YYYY"
              aria-label="Property Inspection Date"
            />
            {/* <img
              src="/calendar.svg"
              className="inputIcon"
              alt="Calendar Icon"
            /> */}
          </div>
        </section>

        {/* Property Inspection Time */}
        <section className="formGroup">
          <label>Property Inspection Time:</label>
          <div className="inputWrapper">
            <input
              type="text"
              name="inspectTime"
              value={formData.inspectTime}
              onChange={handleChange}
              placeholder="Enter time"
              aria-label="Property Inspection Time"
            />
            <img src="/clock.svg" className="inputIcon" alt="Clock Icon" />
          </div>
        </section>

        {/* Auction URL */}
        <section className="formGroup">
          <label>Auction URL:</label>
          <div className="inputWrapper">
            <input
              type="text"
              name="auctionUrl"
              value={formData.auctionUrl}
              onChange={handleChange}
              placeholder="Enter the auction URL"
              aria-label="Auction URL"
            />
          </div>
        </section>

        {/* Enquiry Contact */}
        <section className="formGroup">
          <label>Enquiry Contact:</label>
          <div className="inputWrapper">
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter the enquiry contact number"
              aria-label="Enquiry Contact"
            />
          </div>
        </section>

        {/* Important Note or Message */}
        <section className="formGroup">
          <label>Message:</label>
          <div className="inputWrapper">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any important message for the auctioneer"
              aria-label="Message"
            />
          </div>
        </section>
      </div>

      {/* Action Buttons */}
      <footer className="actions">
        <button className="cancelButton" onClick={prevStep}>
          <img src="/back.svg" className="buttonIcon" alt="Back" />
          Back
        </button>
        {editProperty ? (
          <button className="nextButton" onClick={handleFormSubmit}>
            <img src="/check2.svg" className="buttonIcon" alt="Submit" />
            Update
          </button>
        ) : (
          <button className="nextButton" onClick={handleFormSubmit}>
            <img src="/check2.svg" className="buttonIcon" alt="Submit" />
            Submit
          </button>
        )}
      </footer>

       {/* Popup Message */}
       {showPopup && (
        <div className="popupMessage">
          <p>{popupMessage}</p>
        </div>
      )}
    </main>
  );
};

AuctionDetailsForm.propTypes = {
  prevStep: PropTypes.func.isRequired,
};

export default AuctionDetailsForm;
