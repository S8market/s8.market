import { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

// Create the App context
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  // Dynamically set server URL based on environment
  const serverUrl = useMemo(() => {
    const mode = import.meta.env.MODE;
    const url = mode === "production"
      ? import.meta.env.VITE_SERVER_URL
      : import.meta.env.VITE_SERVER_URL_DEV;
    console.log(`${mode === "production" ? "Production" : "Development"} server URL:`, url);
    return url;
  }, []);

  // ======================= States =======================

  // Property editing and management
  const [editProperty, setEditProperty] = useState(false);
  const [propertyId, setPropertyId] = useState('');
  const [searchString, setSearchString] = useState('');
  const [newImages, setNewImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Property form default data
  const [formData, setFormData] = useState({
    title: "Prafull Sales Corporation: Residental Flat",
    category: "Residential",
    auctionType: "E-auction",
    auctionDate: "15/02/25",
    auctionTime: "12:00:00",
    area: "1832",
    price: "4836000",
    description:
      "All the part and parcel of land & building in the name of Prafull Sales Corporation: Residential Flat No. 705 admeasuring 1832 Sq. Ft. 7th floor, V. N. Pride, CTS No. 5984, S. No. 148/9, Nashik City-422003",
    contact: "8169178780",
    nearbyPlaces: "Dmart(1km away), AB School(200m away)",
    latitude: "1233",
    longitude: "123",
    address: {
      address: "Flat No. 705, 7th floor, V. N. Pride, CTS No. 5984, S. No. 148/9",
      city: "Nashik",
      state: "Maharashtra",
      pincode: "422003",
    },
    video: "",
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

  // Bank user profile
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bankAddress: "",
    branchZone: "",
    bankBranch: "",
    bankIFSC: "",
    designation: ""
  });

  const [userUpdateDetails, setUserUpdateDetails] = useState({ ...userDetails });
  const [avatar, setAvatar] = useState("/user.png");

  // Property list and authentication
  const [properties, setProperties] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // ======================= Side Effects =======================

  // Fetch bank user profile after login
  const handleProfile = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/v1/bank-user/get-profile`, {
        withCredentials: true
      });

      if (data.success) {
        const user = data.user;
        const updatedUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          bankAddress: user.bankAddress,
          branchZone: user.branchZone,
          bankBranch: user.bankBranch,
          bankIFSC: user.bankIFSC,
          designation: user.designation
        };
        setUserDetails(updatedUser);
        setUserUpdateDetails(updatedUser);
        if (user.bankProfileImage?.url) setAvatar(user.bankProfileImage.url);
      } else {
        console.warn("Failed to fetch user profile:", data.message);
      }
    } catch (error) {
      console.error("Error fetching profile:", error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) handleProfile();
  }, [isAuthenticated]);

  // Fetch properties
  const getProperties = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/v1/bank-user/get-property`, {
        withCredentials: true
      });
      if (data.success) {
        setProperties(data.properties);
      } else {
        console.warn("Failed to fetch properties:", data.message);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) getProperties();
  }, [isAuthenticated]);

  // ======================= Memoized Values =======================

  const latestProperty = useMemo(() => {
    return properties.length > 0 ? properties[properties.length - 1] : null;
  }, [properties]);

  // ======================= Context Value =======================

  const value = {
    serverUrl,
    formData, setFormData,
    uploadedFiles, setUploadedFiles,
    editProperty, setEditProperty,
    newImages, setNewImages,
    removedImages, setRemovedImages,
    propertyId, setPropertyId,
    searchString, setSearchString,
    userDetails, setUserDetails,
    userUpdateDetails, setUserUpdateDetails,
    avatar, setAvatar,
    properties, setProperties,
    latestProperty,
    getProperties,
    isAuthenticated, setIsAuthenticated,
    authChecked, setAuthChecked,
    handleProfile,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
