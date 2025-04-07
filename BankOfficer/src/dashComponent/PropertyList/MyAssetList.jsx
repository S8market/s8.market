import "./MyAssetList.scss";
// import { singlePostData } from "../../dummyData";
import { PropertyCards } from "../auction Cards/PropertyCards";
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { AppContext } from "../../context/context";
// import {Link, useLocation} from "react-router-dom";

const MyAssetList = () => {
  
  // const location = useLocation(); // Get the current path
  const {serverUrl, properties, getProperties, searchString} = useContext(AppContext)
  const [prop, setProp] = useState([])
  // useEffect(() => {
  //   getProperties()
  // }, [getProperties])
  
  useEffect(() => {
    // If the search string (after trimming) has more than 2 characters, execute getProp.
    if (searchString?.trim().length > 2) {
      getProp();
    } else {
      // Otherwise, use the default 'properties' from context.
      setProp(properties);
    }
  }, [searchString, properties]);
  
  const getProp = async () => {
    try {
      // console.log("")
      const response = await axios.post(
        `${serverUrl}/api/v1/bank-user/searchProperties`,
        { searchString },
        { withCredentials: true }
      );
      // Update state with the search results.
      setProp(response.data.data);
    } catch (error) {
      console.error("Error searching properties:", error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };

  // Format price with proper currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { // Changed to Indian format
    //   style: 'currency',
    //   currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Format date as MM/DD/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return prop && (
    <div className="propertyCardsWrapper">
       <div className="sectionTitle">
         <h2>My Assets</h2>
         <h3>Showing {prop.length} results</h3>
       </div>
      <div className="cardsContainer2">
        {prop.map((asset) => (
          <PropertyCards
          key={asset._id}
          id={asset._id}
          title={asset.title}
          address={<p>{asset.address?.address}, {asset.address?.city}, {asset.address?.state} - {asset.address?.pincode}</p>}
          // price={formatPrice(asset.price.replace(/,/g, ''))} // Ensure price is formatted properly            category={asset.category}
          price={asset.price} // Ensure price is formatted properly            category={asset.category}
          bankName={asset.bankName.toUpperCase()}
          category={asset.category}
            area={asset.area}
            auctionDate={asset.auctionDate}
            // image={asset.media && asset.media.length > 0 ? asset.media[0] : "default-image.jpg"} // Fixed syntax
            image={asset.image?.[0]?.url || "default-image.jpg"}

            />
          ))}       
      </div>
    </div>
  );
};

export default MyAssetList;