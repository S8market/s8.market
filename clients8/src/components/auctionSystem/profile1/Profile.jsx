import "./Profile.scss";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../../context/context";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // Default avatar image state
  const [image, setImage] = useState("/user.png");
  const [isLoading, setIsLoading] = useState(true);
  const {
    serverUrl,
    userInfo,
    setUserInfo,
    avatar,
    setAvatar,
    isAuthenticated,
    setIsAuthenticated,
    setUserFormValues,
    setBankOfficerFormValues,
  } = useContext(AppContext);
  const [editAvatar, setEditAvatar] = useState(false);
  const navigate = useNavigate();

  // Handle avatar image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(file); // Set the image file
      setAvatar(imageUrl);
      setEditAvatar(true);
    }
  };

  // Popup state for save confirmation
  const [showPopup, setShowPopup] = useState(false);

  // Handle input changes for any field in userDetails
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle Save Button Click and send request to the backend using axios
  const handleSave = async () => {
    try {
      // Send a POST request to the backend
      console.log(userInfo);
      const response = await axios.post(
        serverUrl + "/api/v1/user/update-profile",
        userInfo,
        { withCredentials: true }
      );
      console.log(response.data);
      setShowPopup(true);

      // Hide the popup after 2 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const updateProfileImage = async () => {
    try {
      if (!editAvatar) {
        document.getElementById("avatarUpload").click();
      } else {
        const formData = new FormData();

        formData.append("image", image); // Append the image file

        const { data } = await axios.post(
          serverUrl + "/api/v1/user/update-profile-image",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        console.log(data);
        setEditAvatar(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(serverUrl + "/api/v1/user/logout", {
        withCredentials: true,
      });
      console.log(data);

      // Clear local authentication state
      setIsAuthenticated(false);
      setUserFormValues({
        name: "",
        email: "",
        password: "",
        phone: "",
        verificationMethod: "email",
      });
      setBankOfficerFormValues({
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
      setAvatar(null);
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      // Always redirect to the specified URL
      navigate("/");
    }
  };

  return (
    isAuthenticated && (
      <div className="profile">
        {/* <div className="sideContainer2">
        <Sidebar />
      </div> */}
        <div className="mainContent">
          {/* <Header /> */}
          <div className="mainWrapper">
            <div className="profile-container">
              {/* Avatar Section */}
              <div className="avatar-section">
                <img
                  src={avatar ? avatar : "/user.png"}
                  alt="User Avatar"
                  className="avatar"
                />
                <h3>@{userInfo.name || "User"}</h3>
                <p>{userInfo.email || "user@email.com"}</p>
                <input
                  type="file"
                  id="avatarUpload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <button onClick={updateProfileImage} className="upload-btn">
                  {editAvatar ? "Update" : "Upload Bank Logo"}
                </button>
              </div>

              {/* Information Section (Auto Updates) */}
              <div className="details-section">
                <div className="info">
                  <h4>Information</h4>
                  <p>
                    <strong>Name:</strong> {userInfo.name || "Name"}
                  </p>
                  <p>
                    <strong>Email:</strong> {userInfo.email || "user@email.com"}
                  </p>
                  <p>
                    <strong>Tel:</strong>{" "}
                    {userInfo.phone
                      ? `+91 ${userInfo.phone}`
                      : "+91 966 696 123"}
                  </p>
                  <p>
                    <strong>Address:</strong> {userInfo.address || ""}{" "}
                    {userInfo.city || ""} {userInfo.state || ""}{" "}
                    {userInfo.pincode || ""}
                  </p>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleLogout}
                      className="w-1/3 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* User Settings Form */}
            <div className="form-container">
              <h3 className="form-title">User Settings</h3>

              {/* Personal Details */}
              <div className="form-section">
                <h4>Personal Details</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={userInfo.name}
                      placeholder="Enter your full name..."
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={userInfo.email}
                      placeholder="Enter your email..."
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <div className="mobile-input">
                      <span className="country-code">+91</span>
                      <input
                        type="text"
                        name="phone"
                        value={userInfo.phone}
                        placeholder="Enter your number..."
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="custom-hr" />

              {/* Address Details */}
              <div className="form-section">
                <h4>Address</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Flat No:</label>
                    <input
                      type="text"
                      name="address"
                      value={userInfo.address}
                      placeholder="Enter your Flat number..."
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={userInfo.city}
                      placeholder="Enter city..."
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      value={userInfo.state}
                      placeholder="Enter state..."
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input
                      type="number"
                      name="pincode"
                      value={userInfo.pincode}
                      placeholder="Enter pincode..."
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <hr className="custom-hr" />

              {/* Password Settings */}
              <div className="form-section">
                <h4>Password Settings</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Old Password</label>
                    <input
                      type="password"
                      placeholder="Enter your old password..."
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      placeholder="Enter your new password..."
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-pass">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Re-enter your new password..."
                    />
                  </div>
                </div>
              </div>

              <button className="save-btn" onClick={handleSave}>
                Save changes
              </button>
            </div>
          </div>
        </div>

        {showPopup && (
          <div className="popupMessage">
            <p>Profile saved successfully!</p>
          </div>
        )}
      </div>
    )
  );
};

export default Profile;
