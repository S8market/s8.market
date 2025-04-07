import { useContext } from "react";
import "./addressForm.scss";
import PropTypes from "prop-types";
import { AppContext } from "../../context/context";

const AddressDetailsForm = ({ nextStep, prevStep }) => {
  const { formData, setFormData } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value
      }
    });
  };

  return (
    <main className="addressFormContainer">
      <div className="formContent">
        {/* Asset Address */}
        <section className="formGroup">
          <label>Asset Address:</label>
          <div className="inputWrapper">
            <textarea
              type="text"
              name="address"
              value={formData.address.address}
              onChange={handleChange}
              placeholder="Enter Asset Address"
              aria-label="Asset Address"
            />
          </div>
        </section>

         {/* Pincode  */}
        <section className="formGroup">
        <label>Pincode:</label>
          <div className="inputWrapper">
            <input
              type="text"
              name="pincode"
              value={formData.address.pincode}
              onChange={handleChange}
              placeholder="Enter Pincode"
              aria-label="Pincode"
            />
          </div>
        </section>

         {/* City */}
        <section className="formGroup">
          <label>City:</label>
          <div className="inputWrapper">
            <input
              type="text"
              name="city"
              value={formData.address.city}
              onChange={handleChange}
              placeholder="Enter City"
              aria-label="City"
            />
          </div>
        </section>

        {/* State */}
        <section className="formGroup">
          <label>State:</label>
          <div className="inputWrapper">
            <input
              type="text"
              name="state"
              value={formData.address.state}
              onChange={handleChange}
              placeholder="Enter State"
              aria-label="State"
            />
          </div>
        </section>
      
        {/* Asset Longitude , Latitude */}
        <div className="form-row">
        <section className="formGroup">
           <label>Latitude:</label>
           <div className="inputWrapper">
           <input
  type="number"
  step="any"
  value={formData.latitude || ""}
  onChange={(e) =>
    setFormData({
      ...formData,
      address: { ...formData, latitude: parseFloat(e.target.value) || "" }
    })
  }
  placeholder="Enter Asset Latitude"
/>
           </div>
        </section>

        <section className="formGroup">
         <label>Longitude:</label>
          <div className="inputWrapper">
           <input
            type="number"
            step="any"
            value={formData.longitude || ""}
            onChange={(e) =>
            setFormData({
             ...formData,
            address: { ...formData,longitude: parseFloat(e.target.value) || "" }
            })}
             placeholder="Enter Asset Longitude"/>
           </div>
        </section>
        </div>

        {/* Nearby Place */}
        <section className="formGroup">
          <label>Nearby Place:</label>
          <div className="inputWrapper">
            <textarea 
              type="text"
              name="nearbyPlaces"
              value={formData.nearbyPlaces}
              onChange={(e) => setFormData({ ...formData, nearbyPlaces: e.target.value })}
              placeholder="Enter Nearby Place"
              aria-label="Nearby Place"
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
        <button className="nextButton" onClick={nextStep}>
          <img src="/check2.svg" className="buttonIcon" alt="Next" />
          Next
        </button>
      </footer>
    </main>
  );
};

AddressDetailsForm.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
};

export default AddressDetailsForm;