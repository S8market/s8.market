import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [editProperty, setEditProperty] = useState(false);
  const [propertyId, setPropertyId] = useState(null);
  const [searchString, setSearchString] = useState('');

  // New state for tracking added and removed images
  const [newImages, setNewImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);

  const [formData, setFormData] = useState({
    title: "Prafull Sales Corporation:Residental Flat",
    category: "Residential",
    auctionType: "E-auction",
    auctionDate: "15/02/25",
    auctionTime: "12:00:00",
    area: "1832",
    price: "4836000",
    description:
      "All the part and parcel of land & building in the name of Prafull Sales Corporation: Residential Flat No. 705 admeasuring 1832 Sq. Ft. 7th floor, V. N. Pride, CTS No. 5984, S. No. 148/9, Nashik City-422003",
    contact: "8169178780",
    nearbyPlaces: "Dmart(1km away),AB School(200m away)",
    latitude: "1233",
    longitude: "123",
    address: {
      address:
        "Flat No. 705 , 7th floor, V. N. Pride, CTS No. 5984, S. No. 148/9",
      city: "Nashik",
      state: "Maharashtra",
      pincode: "422003",
    },
    auctionUrl: "https://baanknet.com",
    borrower: "M/s Prafull Sales",
    amountDue: "24055879",
    deposit: "10% of the reserve price",
    bidInc: "50000",
    inspectDate: "15/03/25",
    inspectTime: "12:00:00",
    reservPrice: "4836000",
    message:
      "All bidders are requested to visit the above site & complete the registration, KYC updation & payment 3 to 4 days before date of E-auction to avoid last minute rush",
  });

  // const [formData, setFormData] = useState({
  //   title: "",
  //   category: "",
  //   auctionType: "",
  //   auctionDate: "",
  //   auctionTime: "",
  //   area: "",
  //   price: "",
  //   description: "",
  //   contact: "",
  //   nearbyPlaces: "",
  //   latitude: "",
  //   longitude: "",
  //   address: {
  //     address: "",
  //     city: "",
  //     state: "",
  //     pincode: "",
  //   },
  //   auctionUrl: "",
  //   borrower: "",
  //   amountDue: "",
  //   deposit: "",
  //   bidInc: "",
  //   inspectDate: "",
  //   inspectTime: "",
  //   reservPrice: "",
  //   message: "",
  // });

  const [uploadedFiles, setUploadedFiles] = useState([]);

  // State for bankuser details
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // bankName: "",
    bankAddress: "",
    branchZone: "",
    bankBranch: "",
    bankIFSC: "",
    designation: ""
  });

  const [avatar, setAvatar] = useState(false)
  
  const [properties, setProperties] = useState([]); // State to store properties

    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Get Profile Details
  const handleProfile = async () => {
    try {
      const { data } = await axios.get(serverUrl + "/api/v1/bank-user/get-profile", 
        { withCredentials: true }
      );
      if (data.success) {
        setUserDetails({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phone: data.user.phone,
          bankName: data.user.bankName,
          bankAddress: data.user.bankAddress,
          branchZone: data.user.branchZone,
          bankBranch: data.user.bankBranch,
          bankIFSC: data.user.bankIFSC,
          designation: data.user.designation
        });
        setAvatar(data.user.bankProfileImage.url)
      }else{
        console.log(data.message)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    handleProfile();
  }, [isAuthenticated])


  // Update user details
  const [userUpdateDetails, setUserUpdateDetails] = useState({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userDetails.email,
    phone: userDetails.phone,
    bankName: userDetails.bankName,
    bankAddress: userDetails.bankAddress,
    branchZone: userDetails.branchZone,
    bankBranch: userDetails.bankBranch,
    bankIFSC: userDetails.bankIFSC,
    designation: userDetails.designation
  });



  // const [properties, setProperties] = useState(null);

  useEffect(() => {
    getProperties();
  }, [searchString, isAuthenticated]);

  // Function to get properties
  const getProperties = async () => {
      try {
        const { data } = await axios.get( serverUrl + "/api/v1/bank-user/get-property", {
          withCredentials: true,
        });
        if (data.success) {
          setProperties(data.properties);
        }else{
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }




    // Latest Property
    const latestProperty = properties[properties.length - 1]

  const value = {
    serverUrl,
    formData,
    setFormData,
    uploadedFiles,
    setUploadedFiles,
    editProperty,
    setEditProperty,
    newImages,
    setNewImages,
    removedImages,
    setRemovedImages,
    propertyId,
    setPropertyId,
    userDetails,searchString, setSearchString, getProperties,latestProperty,isAuthenticated, setIsAuthenticated,
    setUserDetails,avatar, setAvatar, properties, setProperties, handleProfile, userUpdateDetails, setUserUpdateDetails
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
