import "./newsUpdate.scss";
// import { useNavigate } from "react-router-dom";

const News = () => {
  // const navigate = useNavigate();

  return (
    <div className="container">
      <div className="image-container">
        <img
          loading="lazy"
          src="/welcomeM.png" // Use your desired image here
          alt="News"
          className="Nimage"
        />
        <button
          className="exploreNowButton"
          // onClick={() => (window.location.href = "https://example.com")}
          onClick={() => window.location.href = 'https://s8market.com'}>
         Home Page
        </button>
      </div>
    </div>
  );
};

export default News;
