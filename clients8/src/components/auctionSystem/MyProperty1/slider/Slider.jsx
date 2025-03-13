import { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./slidNew.scss";

function Slider({ media = [] }) {
  const [mediaIndex, setMediaIndex] = useState(null); // Initialize as null (not 0)
  const scrollRef = useRef(null); // Ref for horizontal scrolling

  if (!media.length) return <p>No media available</p>;

  const isVideo = (file) => {
    if (!file) return false;
    return typeof file === "string" && (file.endsWith(".mp4") || file.includes("video"));
  };

  // Function to change slide
  const changeSlide = (direction) => {
    setMediaIndex((prev) =>
      direction === "left" ? (prev === 0 ? media.length - 1 : prev - 1) : (prev === media.length - 1 ? 0 : prev + 1)
    );
  };

  return (
    <div className="slider">
      {/* Fullscreen View */}
      {mediaIndex !== null && media[mediaIndex] && (
        <div className="fullSlider">
          <div className="arrow" onClick={() => changeSlide("left")}>
            <img src="/arrow.png" alt="Left Arrow" />
          </div>
          <div className="mediaContainer">
            {isVideo(media[mediaIndex]) ? (
              <div className="videoWrapper">
                <video key={media[mediaIndex]} controls autoPlay muted>
                  <source src={media[mediaIndex]} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <img src="/play-icon.svg" className="playOverlay" alt="Play Icon" />
              </div>
            ) : (
              <img src={media[mediaIndex]} alt="Large View" />
            )}
          </div>
          <div className="arrow" onClick={() => changeSlide("right")}>
            <img src="/arrow.png" className="right" alt="Right Arrow" />
          </div>
          <div className="close" onClick={() => setMediaIndex(null)}>X</div>
        </div>
      )}

      {/* Large Preview */}
      <div className="bigMedia" onClick={() => setMediaIndex(0)}>
        {isVideo(media[0]) ? (
          <div className="videoWrapper">
            <video controls muted>
              <source src={media[0]} type="video/mp4" />
            </video>
            <img src="/play-icon.svg" className="playOverlay" alt="Play Icon" />
          </div>
        ) : (
          <img src={media[0]} alt="Preview" />
        )}
      </div>

      {/* Scrollable Thumbnail Section */}
      <div className="smallMediaContainer" ref={scrollRef}>
        <div className="smallMedia">
          {media.map((file, index) => (
            <div key={index} className="thumbnail" onClick={() => setMediaIndex(index)}>
              {isVideo(file) ? (
                <div className="videoWrapper">
                  <video muted>
                    <source src={file} type="video/mp4" />
                  </video>
                  <img src="/videoThumbnail.svg" className="playOverlay" alt="Play Icon" />
                </div>
              ) : (
                <img src={file} alt={`Thumbnail ${index + 1}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Slider.propTypes = {
  media: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Slider;
