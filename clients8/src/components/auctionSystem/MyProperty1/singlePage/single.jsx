import { useContext, useEffect, useState } from "react";
import GMap from "../map(Google)/Gmap";
import Header from "../nav/header/Header";
import SingleHeader from "../singlePage Header/singleHeader";
import Slider from "../slider/Slider";
import axios from "axios";
import "./single.scss";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from '../../../../context/context';

const Single = () => {
  const { id } = useParams(); // Get ID from the URL
  const { serverUrl, formData, setFormData, editProperty, setEditProperty, setUploadedFiles, propertyId, setPropertyId ,userDetails, avatar } = useContext(AppContext);
  const [property, setProperty] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPropertyById();
  }, []);

  const getPropertyById = async () => {
    try {
      const { data } = await axios.post(serverUrl + "/api/v1/user/get-property-by-id", { id }, {
        withCredentials: true,
      });

      if (data.success) {
        setProperty(data.property);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    try {
      const { data } = await axios.post(serverUrl + "/api/v1/bank-user/get-property-by-id", { id }, {
        withCredentials: true,
      });

      if (data.success) {
        const {
          title,
          category,
          auctionType,
          auctionDate,
          auctionTime,
          area,
          price,
          description,
          contact,
          nearbyPlaces,
          mapLocation,
          address,
          auctionUrl,
          borrower,
          amountDue,
          deposit,
          bidInc,
          inspectDate,
          inspectTime,
          reservPrice,
          message,
        } = data.property;

        setFormData((prevState) => ({
          ...prevState,
          title,
          category,
          auctionType,
          auctionDate,
          auctionTime,
          area,
          price,
          description,
          contact,
          nearbyPlaces,
          latitude: mapLocation?.latitude || "",
          longitude: mapLocation?.longitude || "",
          address: {
            address: address?.address || "",
            city: address?.city || "",
            state: address?.state || "",
            pincode: address?.pincode || "",
          },
          auctionUrl,
          borrower,
          amountDue,
          deposit,
          bidInc,
          inspectDate,
          inspectTime,
          reservPrice,
          message,
        }));
        setUploadedFiles(data.property.image);
        setEditProperty(true);
        setPropertyId(id);
        navigate("/addNew");

        console.log(formData);
        console.log(data.property);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProperty = async () => {
    try {
      const { data } = await axios.post(serverUrl + "/api/v1/bank-user/delete-property", { propertyId: id }, {
        withCredentials: true,
      });
      console.log(data);
      if (data.success) {
        navigate("/view");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!property) {
    return <h2>Property Not Found!</h2>; // If ID is invalid
  }

  const media = property?.image?.map(item => item.url) || [];

  const pageName = "My Assets";

  return (
    <div className="singlePage">
      <div className="singlePageContainer">
        {/* Main Header */}
        <Header />

        <div className="mainSContainer">
          {/* Single Page Header (Centered Above Both Sections) */}
          <SingleHeader pageName={pageName} title={property.title} />

          {/* Main Content Container */}
          <div className="mainSinglePage">
            {/* Left Side - Property Details */}
            <div className="leftSide">
              <div className="details">
                <Slider media={media} />
                <div className="info">
                  <div className="info-column">
                    <h1>{property.title}</h1>

                     {/* Bank info card*/}
                     <div className="bank-officer-card">

<div className="top-section">
  <div className="profile-image">
  <img src={avatar} alt="User" className="userImage" />
  </div>
  <div className="officer-info">
    <h2>{userDetails.firstName} {userDetails.lastName}</h2>
    <p className="designation">{userDetails.designation}</p>
  </div>
</div>

<div className="bank-details">
  <div className="bank-grid">
    <div className="row">
      <p className="label">Bank Name:</p>
      <p className="value">{userDetails.bankName}</p>
    </div>
    <div className="row">
      <p className="label">IFSC:</p>
      <p className="value">{userDetails.bankIFSC}</p>
    </div>
    <div className="row">
      <p className="label">Zone:</p>
      <p className="value">{userDetails.branchZone}</p>
    </div>
    <div className="row">
      <p className="label">Branch Name:</p>
      <p className="value">{userDetails.bankBranch}</p>
    </div>
  </div>
</div>
</div>

                    <div className="info-item">
                      <img src="/pin.svg" alt="location" className="info-icon" />
                      <span className="info-label">Address:</span>
                      <span className="info-value">{property.address?.address}, {property.address?.city}, {property.address?.state} - {property.address?.pincode}</span>
                    </div>

                    <div className="info-item">
                      <img src="/price-tag.svg" alt="price" className="info-icon" />
                      <span className="info-label">Price:</span>
                      <span className="info-value highligh">₹ {property.price}</span>
                    </div>


                    <div className="info-item">
                      <img src="/video.svg" alt="link" className="info-icon" />
                      <span className="info-label">Video Link:</span>
                      <a href={property.auctionUrl} className="info-link">{property.video}</a>
                    </div>

                    <div className="info-item">
                      <img src="/link.svg" alt="link" className="info-icon" />
                      <span className="info-label">Enquiry URL:</span>
                      <a href={property.auctionUrl} className="info-link">{property.auctionUrl}</a>
                    </div>

                    <div className="info-item description">
                      <img src="/description.svg" alt="description" className="info-icon" />
                      <span className="info-label">Description:</span>
                      <p className="info-value">{property.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Auction Details & Map */}
            <div className="rightSide">
              {/* Auction & Property Details */}
              <div className="auctionDetails">
                <div className="auction-column">
                  <div className="auctionItem">
                    <span className="label">Area:</span>
                    <span className="value">{property.area} sq.ft</span>
                  </div>
                  <div className="auctionItem">
                    <span className="label">Category:</span>
                    <span className="value">{property.category}</span>
                  </div>
                  <div className="auctionItem">
                    <span className="label">Borrowers:</span>
                    <span className="value">{property.borrower}</span>
                  </div>
                  <div className="auctionItem">
                    <span className="label">Bank Name:</span>
                    <span className="value">{property.bankName.toUpperCase()}</span>
                  </div>
                  <div className="auctionItem">
                    <span className="label">Amount Due:</span>
                    <span className="value">{property.amountDue}</span>
                  </div>
                  <div className="auctionItem">
                    <span className="label">Reserve Price:</span>
                    <span className="value">{property.reservPrice}</span>
                  </div>
                  <div className="auctionItem">
                    <span className="label">Earnest Money Deposit:</span>
                    <span className="value">{property.deposit}</span>
                  </div>
                  <div className="auctionItem">
                    <span className="label">Bid Increase Amount</span>
                    <span className="value">{property.bidInc}</span>
                  </div>
                  <div className="auctionItem">
                    <span className="label">Contact No.:</span>
                    <span className="value">{property.contact}</span>
                  </div>
                  <div className="auctionItem">
                    <span className="label">Auction Type:</span>
                    <span className="value">{property.auctionType}</span>
                  </div>
                  <div className="auctionItem">
                    <span className="label">Auction Date:</span>
                    <span className="value">{property.auctionDate}</span>
                  </div>
                  <div className="auctionItem">
                    <span className="label">Auction Time:</span>
                    <span className="value">{property.auctionTime}</span>
                  </div>
                  <div className="auctionItem">
                    <span className="label">Nearby Places:</span>
                    <span className="value">{property.nearbyPlaces}</span>
                  </div>
                  <div className="auctionItem">
                    <span className="label">City:</span>
                    <span className="value">{property.address.city}</span>
                  </div>
                  <div className="auctionItem">
                    <span className="label">State:</span>
                    <span className="value">{property.address.state}</span>
                  </div>
                  <div className="auctionItem">
                    <span className="label">Message:</span>
                    <span className="value highlight">{property.message}</span>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <h3>Property Location :</h3>
              <GMap
                items={[
                  {
                    id: property.id,
                    latitude: property.latitude,
                    longitude: property.longitude,
                  },
                ]}
              />

              {/* Action Buttons */}
              {/* <div className="actionButtons">
                <button className="delete" onClick={handleDeleteProperty}>
                  <img src="/delete2.svg" alt="Delete" className="button-icon" />
                  Delete
                </button>
                <button onClick={handleEdit} className="edit">
                  <img src="/edit.svg" alt="Edit" className="button-icon" />
                  Edit
                </button>
                <button className="done">
                  <img src="/done.svg" alt="Done" className="button-icon" />
                  Done
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;