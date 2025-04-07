import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation  } from 'react-router-dom'; // Import Link for navigation
// import properties from "../../dummyData"; // Import your dummy data
import './myAssetsCards.scss';
import { AppContext } from '../../context/context';
import axios from 'axios';

const MyAssetsCards = () => {
  const [showAll, setShowAll] = useState(false); // State to control whether to show all cards
  const { properties, avatar } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Number of cards to show by default
  const defaultCardsToShow = 3;
  const cardsToDisplay = showAll ? properties : properties.slice(0, defaultCardsToShow);

  return (
    <div className="myAssetsCardsContainer">
      <div className="headerContainer2">
        <h2>My Assets</h2>
        <h3>Showing {cardsToDisplay.length} / {properties.length} results</h3>
      </div>
      {/* {properties.length > defaultCardsToShow && (
        <div className="viewAllButton">
          {!showAll && (
            <button onClick={() => setShowAll(true)}>
              <Link to="/view">View All</Link>
            </button>
          )}
        </div>
         )} */}
      <div className="cardsScrollContainer">
      {properties.length === 0 ? (
          <div className="noDataMessage">There is no data to show</div>
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
                <div onClick={() => navigate(`/property/${property._id}`, { state: { from: location.pathname }})} 
                className="viewButton">View now</div>
              </div>
             
            </div>
          ))}
        </div>
        )}
        {properties.length > defaultCardsToShow && (
        <div className="viewAllButton">
          {!showAll && (
            <button onClick={() => setShowAll(true)}>
              <Link to="/view">View All</Link>
            </button>
          )}
        </div>
         )}
      </div>
    </div>
  );
};

export default MyAssetsCards;
