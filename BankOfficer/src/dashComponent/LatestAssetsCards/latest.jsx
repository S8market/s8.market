import PropTypes from "prop-types"; // Import PropTypes for type validation
import "./latest.scss";
import { useContext, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../context/context";

function Latest() {
  const {latestProperty} = useContext(AppContext)
  
  const location = useLocation(); // Get the current location

  const daysLeft = useMemo(() => {
    const auctionDate = new Date(latestProperty?.auctionDate);
    const today = new Date();
    const timeDiff = auctionDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  }, [latestProperty?.auctionDate]);

  return latestProperty && (
    <div className="cardContainer">
      <div className="cardImageContainer">
        <img
          loading="lazy"
          src={latestProperty.image[0].url || "default-image.jpg"} // ✅ Use first image from media array
          className="cardImage"
          alt={latestProperty.title}
        />
        <div className="cardTitle">Your latest asset</div>
        {/* <div className="cardDaysLeft">{`Auction starts on: ${asset.auctionDate}`}</div> */}
        <div className="cardDaysLeft">{daysLeft > 0 ? `Days left: ${daysLeft}` : "Ongoing"}
        </div>
      </div>
      <div className="cardDescription">
        {latestProperty.title}
      </div>
      <div className="cardDetails">
        <div className="detailAddress">
          <div>{latestProperty.address.city}, {latestProperty.address.state}</div>
          <div className="detailDate">{latestProperty.auctionDate}</div>
        </div>
        <Link to={`/property/${latestProperty._id}`}
        state={{ from: location.pathname }}>
          <div tabIndex="0" role="button" className="detailButton">View</div>
        </Link>
      </div>
    </div>
  );
}

// PropTypes for the 'asset' prop
Latest.propTypes = {
  asset: PropTypes.shape({
    id: PropTypes.number.isRequired,
    media: PropTypes.arrayOf(PropTypes.string), //  media prop validation
    title: PropTypes.string.isRequired,
    auctionDate: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};

export default Latest;
