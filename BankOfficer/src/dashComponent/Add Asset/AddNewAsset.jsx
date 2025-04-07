import "./AddNewAsset.scss";
import { Link } from 'react-router-dom'; // Import Link for navigation

const AddNewAsset = () => {
    return (
      <div className="addNewAssetContainer">
          <img
            loading="lazy"
            src="addnew.png"
            className="cardImage2"
            alt="Latest asset"
          />
          <h3>Add new Assets for <br/> auction now!</h3>
          {/* <h3></h3> */}
          <button className="addAssetButton">
            <Link to="/addNew">Add new Asset</Link>
          </button>
        </div>
    );
  };
  
  export default AddNewAsset;