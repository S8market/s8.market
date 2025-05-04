import "./ProfilePage.scss";
import Latest from "../../dashComponent/LatestAssetsCards/latest";
import Sidebar from "../../dashComponent/Sidebar/Sidebar";
import News from "../../dashComponent/News & Updates/newsUpdate";
import Header from "../../dashComponent/nav/header/Header";
import CardsContainer from "../../dashComponent/Cards/Cards";
import AddNewAsset from "../../dashComponent/Add Asset/AddNewAsset";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/context";
import axios from "axios";

const Profilepage = () => {
  const { serverUrl, properties, setProperties } = useContext(AppContext);
  const [latestAsset, setLatestAsset] = useState(null);
  // const [isSidebarOpen, setSidebarOpen] = useState(false);
  // const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsSmallScreen(window.innerWidth <= 768);
  //     if (window.innerWidth > 768) {
  //       setSidebarOpen(false); // Auto-close sidebar when switching to medium/large screens
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await axios.get(`${serverUrl}/api/v1/bank-user/get-property`, {
          withCredentials: true,
        });
        if (data.success) {
          setProperties(data.properties);
          const latest = getLatestAuctionAsset(data.properties);
          setLatestAsset(latest);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [serverUrl, setProperties]);

  const getLatestAuctionAsset = (userAssets) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const upcomingOrOngoingAssets = userAssets.filter((asset) => {
      const auctionDate = new Date(asset.auctionDate);
      auctionDate.setHours(0, 0, 0, 0);
      return auctionDate >= currentDate;
    });

    const sortedAssets = upcomingOrOngoingAssets.sort(
      (a, b) => new Date(a.auctionDate) - new Date(b.auctionDate)
    );

    return sortedAssets.length > 0 ? sortedAssets[0] : null;
  };

  return (
    <div className="home">
      <div className="sideContainer">
        <Sidebar />
      </div>
      <div className="homeContainer">
        <Header />
        <div className="mainProfile">
          <div className="latestAssetContainer">
            {latestAsset ? <Latest /> : <AddNewAsset />}
            <News />
          </div>
          <div className="auctionersContainer">
            <CardsContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;