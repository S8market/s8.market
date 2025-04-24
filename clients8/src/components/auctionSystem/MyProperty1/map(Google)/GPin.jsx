import { Marker, InfoWindow } from "@react-google-maps/api";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./gPin.scss";

function GPin({ item, setSelectedItem, selectedItem }) {
  return (
    <>
      <Marker
        position={{ lat: item.latitude, lng: item.longitude }}
        onClick={() => setSelectedItem(item)} // ✅ Set this pin as selected when clicked
      />
      
      {selectedItem && selectedItem.id === item.id && (
        <InfoWindow
          position={{ lat: item.latitude, lng: item.longitude }}
          onCloseClick={() => setSelectedItem(null)} // ✅ Close when clicking "X"
        >
          <div className="popupContainer">
            <img src={item.img} alt={item.title} />
            <div className="textContainer">
              <Link to={`/${item.id}`}>{item.title}</Link>
              <span>{item.category}</span>
              <b>₹ {item.price}</b>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default GPin;

GPin.propTypes = {
  item: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
};
