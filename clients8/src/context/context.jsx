import { createContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { getServerUrl } from "../utils/getServerUrl";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const serverUrl = getServerUrl();

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
  const [avatar, setAvatar] = useState("user.png");
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setIsAuthenticated(false);
          setAuthChecked(true);
          return;
        }

        const res = await axios.get(`${serverUrl}/api/v1/user/get-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Auth check response:", res.data);

        if (res.data.success) {
          setIsAuthenticated(true);
          const profileData = res.data.user;
          setUserInfo({
            name: profileData.name || "",
            email: profileData.email || "",
            phone: profileData.phone || "",
            address: profileData.address?.address || "",
            city: profileData.address?.city || "",
            state: profileData.address?.state || "",
            pincode: profileData.address?.pincode || "",
          });
          setAvatar(profileData.profileImage?.url || "user.png");
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [serverUrl]);

  const getProperties = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${serverUrl}/api/v1/user/get-properties`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const { data } = await axios.get(`${serverUrl}/api/v1/user/get-guest-properties`);
      if (data.success) {
        setProperties(data.properties);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error fetching guest properties:", error);
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

  const contextValue = useMemo(() => ({
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
  }), [
    serverUrl,
    userDetails,
    properties,
    bankOfficerFormValues,
    userFormValues,
    searchString,
    authChecked,
    userInfo,
    avatar,
    isAuthenticated,
  ]);

  return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
