import PropTypes from "prop-types";
import "./gmap.scss";

function GMap({ items }) {
  if (!items || items.length === 0) {
    return <p>No location data available</p>;
  }

  const { latitude, longitude } = items[0]; // Show the first location

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${latitude},${longitude}`;

  return (
    <div className="mapContainer">
      <iframe
        title="Google Map"
        width="500"
        height="400"
        style={{ borderRadius: "0px",border:"none" }}
        loading="lazy"
        allowFullScreen
        src={mapUrl}
      ></iframe>
    </div>
  );
}

export default GMap;

GMap.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    })
  ).isRequired,
};






// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
// import PropTypes from "prop-types";
// import GPin from "./GPin"; // ✅ Import GPin component
// import { useState } from "react";
// import "./gmap.scss";

// const containerStyle = {
//   width: "500px",
//   height: "400px",
//   borderRadius: "20px",
// };

// const defaultCenter = {
//   lat: 18.9535,
//   lng: 72.8165,
// };

// function GMap({ items }) {
//   const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
//   console.log("Google Maps API Key:", apiKey);
//   console.log("Items Data:", items);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: apiKey,
//     id: "google-maps-script",
//     libraries: ["places"],
//   });

//   // State to track which marker is clicked
//   const [selectedItem, setSelectedItem] = useState(null);

//   if (!isLoaded) return <p>Loading Google Maps...</p>;

//   return (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={defaultCenter}
//       zoom={7}
//       options={{
//         streetViewControl: true,
//         mapTypeControl: true,
//         fullscreenControl: true,
//       }}
//     >
//       {items.map((item) => (
//         <GPin 
//           key={item.id} 
//           item={item} 
//           setSelectedItem={setSelectedItem} 
//           selectedItem={selectedItem} 
//         />
//       ))}
//     </GoogleMap>
//   );
// }

// export default GMap;

// GMap.propTypes = {
//   items: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//       latitude: PropTypes.number.isRequired,
//       longitude: PropTypes.number.isRequired,
//       img: PropTypes.string.isRequired,
//       title: PropTypes.string.isRequired,
//       category: PropTypes.string.isRequired,
//       price: PropTypes.number.isRequired,
//     })
//   ).isRequired,
// };


