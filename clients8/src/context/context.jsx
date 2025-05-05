import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // const serverUrl = 'http://localhost:4000';
  var serverUrl;

  if(import.meta.env.MODE === "development"){
    serverUrl = import.meta.env.VITE_SERVER_URL;
    console.log("Development server URL: ", serverUrl);
  }
  else if(import.meta.env.MODE === "production"){
    serverUrl = import.meta.env.VITE_SERVER_URL;
    console.log("Production server URL: ", serverUrl);
  }
  else{
    serverUrl = import.meta.env.VITE_SERVER_URL_DEV;
    console.log("Unknown environment, using development server URL: ", serverUrl);
  }

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [authChecked, setAuthChecked] = useState(false);

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    bankBranch: "",
    empId: "",
    designation: "",
  });

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const getProfile = async () => {
    try {
      const response = await axios.get(serverUrl + "/api/v1/user/get-profile", {
        withCredentials: true,
      });
      if (response.data.success) {
        const profileData = response.data.user;
        setUserInfo({
          name: profileData.name || "",
          email: profileData.email || "",
          phone: profileData.phone || "",
          address: profileData.address.address || "",
          city: profileData.address.city || "",
          state: profileData.address.state || "",
          pincode: profileData.address.pincode || "",
        });
        setAvatar(profileData.profileImage?.url);
        // Optionally update the avatar if the profile has one
        // if (profileData.image) {
        //   setImage(profileData.image);
        // }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  useEffect(() => {
    getProfile();
  }, [isAuthenticated]);

  const [avatar, setAvatar] = useState("user.png");

  const [properties, setProperties] = useState([]);

  const getProperties = async () => {
    try {
      const { data } = await axios.get(
        serverUrl + "/api/v1/user/get-properties",
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setProperties(data.properties);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const getGuestProperties = async () => {
    try {
      const { data } = await axios.get(
        serverUrl + "/api/v1/user/get-guest-properties"
      );
      if (data.success) {
        setProperties(data.properties);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getProperties();
    } else {
      getGuestProperties();
    }
  }, [isAuthenticated]);

  const [userFormValues, setUserFormValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    verificationMethod: "email",
  });

  const [bankOfficerFormValues, setBankOfficerFormValues] = useState({
    "first-name": "",
    "last-name": "",
    email: "",
    password: "",
    phone: "",

    address: "",
    city: "",
    state: "",
    pincode: "",

    bankName: "",
    bankbranch: "",
    bankIFSC: "",
    branchZone: "",
    employeeID: "",
    designation: "",
    verificationMethod: "email",
  });

  return (
    <AppContext.Provider
      value={{
        serverUrl,
        userDetails,
        setUserDetails,
        properties,
        setProperties,
        getProperties,
        bankOfficerFormValues,
        setBankOfficerFormValues,
        userFormValues,
        searchString,
        setSearchString,
        authChecked,
        setAuthChecked,
        setUserFormValues,
        userInfo,
        setUserInfo,
        avatar,
        setAvatar,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
