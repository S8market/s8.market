import Header from "../../dashComponent/nav/header/Header";
import MyAssetList from "../../dashComponent/PropertyList/MyAssetList";
import Sidebar from "../../dashComponent/Sidebar/Sidebar";
import "./assetsView.scss";

const AssetsView = () => {
  return (
        <div className="myAssetsView">
          <div className="sideContainerV">
            <Sidebar />
          </div>
           <div className="AssetsViewCards">
           <Header />
           <div className="myAssetVCard">
           <MyAssetList/>
           </div>
          </div>
        </div>
       )
     }

export default AssetsView
