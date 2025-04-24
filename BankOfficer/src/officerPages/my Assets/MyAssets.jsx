import AddNewAsset from "../../dashComponent/Add Asset/AddNewAsset";
import MyAssetsCards from "../../dashComponent/AssetCards/MyAssetsCards";
import AuctionHistory from "../../dashComponent/Auction Table/Table";
import Header from "../../dashComponent/nav/header/Header";
import Sidebar from "../../dashComponent/Sidebar/Sidebar";
import './myAssets.scss';

const MyAssets = () => {

  return (
    <div className="myAssets">
      <div className="sideContainer2">
        <Sidebar />
        </div>
       <div className="myAssetsContainer">
       <Header />
       <div className="myLikedAssetsContainer">
       <AddNewAsset/>
       <MyAssetsCards/>
       </div>
       <div className="card2Container">
        <AuctionHistory/>
       </div>
     </div>
    </div>
  )
}

export default MyAssets
