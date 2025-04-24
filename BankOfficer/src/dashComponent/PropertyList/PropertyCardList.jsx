import { useState } from "react";
import "./PropertyCardList.scss";
import properties from "../../dummyData";
import { PropertyCards } from "../auction Cards/PropertyCards";

const PropertyCardsList = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedProperties = showAll ? properties : properties.slice(0, 3);

  return (
    <div className="propertyCardsWrapper">
      {/* Top-left counter */}
      <div className="cardsCounter">
        Showing {displayedProperties.length} / {properties.length} results
      </div>
      
      {/* Render property cards */}
      <div className="cardsContainer">
        {displayedProperties.map((property) => (
          <PropertyCards
            key={property.id}
            id={property.id}
            title={property.title}
            address={property.address}
            price={property.price}
            category={property.category}
            bankName={property.bankName}
            area={property.area}
            auctionDate={property.auctionDate}
            imageUrl={property.imageUrl}
          />
        ))}
      </div>

      {/* View All button */}
      <div className="viewAllWrapper">
        <button className="viewAllButton" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>
    </div>
  );
};

export default PropertyCardsList;
