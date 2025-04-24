import { useContext, useEffect, useState } from 'react';
// import properties from "../../dummyData"; // Import your dummy data
import './cards.scss';
import { AppContext } from '../../context/context';
import axios from 'axios';

const CardsContainer = () => {
  const [showAll, setShowAll] = useState(false); // State to control whether to show all cards
    const { properties, avatar } = useContext(AppContext);

  const defaultCardsToShow = 3;
  const cardsToDisplay = showAll ? properties : properties.slice(0, defaultCardsToShow);



  return (
    <div className="CardContainer">
      <h2>Latest Auctions</h2>
      <div className="viewAllContainer">
  <h3>Showing {cardsToDisplay.length} / {properties.length} results</h3>
  {!showAll && (
    <button className="viewAllButton" onClick={() => setShowAll(true)}>
      View All
    </button>
  )}
</div>
<div className="cardsScrollContainer">
        {properties.length === 0 ? (
          <div className="noDataMessage">Add Assets first to see result</div>
        ) : (
        <div className="assetsList">
          {cardsToDisplay.map((property) => (
            <div key={property._id} className="assetCard">
              <div className="cardHeader">
                <img src={property.image[0].url} alt={property.title} className="propertyImage" />
                <div className="userImageContainer">
                  <img src={avatar} alt="User" className="userImage" />
                </div>
              </div>
              <div className="cardBody">
                <h4>{property.title}</h4>
                <p className="propertyAddress">{property.address?.address}, {property.address?.city}, {property.address?.state} - {property.address?.pincode}</p>
                <p>{property.auctionDate}</p>
                <a href={`/property/${property._id}`} className="viewButton">View now</a>
              </div>
            </div>
          ))}
        </div>
       )}
      </div>
    </div>
  );
};

export default CardsContainer;
