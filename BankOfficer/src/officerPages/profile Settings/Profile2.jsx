import "./profile2.scss";
import Header from "../../dashComponent/nav/header/Header";
import Sidebar from "../../dashComponent/Sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/context";
import axios from "axios";

const Profile2 = () => {
  const [image, setImage] = useState(null); // For file upload
  const { serverUrl, avatar, setAvatar, userDetails, setUserDetails } = useContext(AppContext);
  const [editAvatar, setEditAvatar] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [userUpdateDetails, setUserUpdateDetails] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (userDetails) {
      setUserUpdateDetails({
        firstName: userDetails.firstName || "",
        lastName: userDetails.lastName || "",
        email: userDetails.email || "",
        phone: userDetails.phone || "",
        bankName: userDetails.bankName || "",
        bankAddress: userDetails.bankAddress || { address: "", city: "", state: "", pincode: "" },
        branchZone: userDetails.branchZone || "",
        bankBranch: userDetails.bankBranch || "",
        bankIFSC: userDetails.bankIFSC || "",
        designation: userDetails.designation || ""
      });

      if (userDetails.avatarUrl) {
        setAvatar(userDetails.avatarUrl);
      }
    }
  }, [showForm, userDetails, setAvatar]);

  const handleUpdateProfile = async () => {
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/v1/bank-user/update-profile`,
        userUpdateDetails,
        { withCredentials: true }
      );

      if (data && data.user) {
        setUserDetails(data.user);
        if (data.user.avatarUrl) {
          setAvatar(data.user.avatarUrl);
        }
      } else {
        console.warn("No user data returned from update-profile API");
      }

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
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
        formData.append("image", image);

        const { data } = await axios.post(
          `${serverUrl}/api/v1/bank-user/update-profile-image`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        setAvatar(data.avatarUrl || "/user.png");
        setUserDetails((prev) => ({ ...prev, avatarUrl: data.avatarUrl }));
        setEditAvatar(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(file);
      setAvatar(imageUrl); // Show preview
      setEditAvatar(true);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    if (name === "bankAddress") {
      setUserUpdateDetails((prev) => ({
        ...prev,
        bankAddress: { ...prev.bankAddress, address: value }
      }));
    } else {
      setUserUpdateDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  if (!userDetails) return <div>Loading...</div>;

  return (
    <div className="profile">
      <div className="sideContainer2"><Sidebar /></div>
      <div className="mainContent">
        <Header />
        <div className="mainWrapper">
          <div className="profile-container">
            {/* Avatar Section */}
            <div className="avatar-section">
              <img
                src={avatar || "/user.png"}
                alt="User Avatar"
                className="avatar"
                onClick={() => document.getElementById("avatarUpload").click()}
              />
              <h3>@{userDetails.firstName || "User"}</h3>
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

            {/* Info Display */}
            <div className="details-section">
              <div className="info">
                <h4>Information</h4>
                <p><strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Tel:</strong> {userDetails.phone}</p>
                <button onClick={() => setShowForm(!showForm)} className="update-details-btn">Update Details</button>
              </div>
              <div className="info2">
                <h4>Professional Details</h4>
                <p><strong>Bank name:</strong></p>
                <p><strong>Job Title:</strong> {userDetails.designation}</p>
                <p><strong>IFSC:</strong> {userDetails.bankIFSC}</p>
                {/* <p><strong>Branch Name:</strong> {userDetails.bankBranch}</p> */}
                {/* <p><strong>Branch Zone:</strong> {userDetails.branchZone}</p> */}
                <p><strong>Branch Address:</strong> {userDetails.bankAddress?.address} {userDetails.bankAddress?.city} {userDetails.bankAddress?.state}-{userDetails.bankAddress?.pincode}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          {showForm && (
            <div className="form-container">
              <h3 className="form-title">User Settings</h3>
              <div className="form-section">
                <h4>Personal Details</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="firstName" value={userUpdateDetails.firstName} onChange={handleUpdateChange} />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={userUpdateDetails.lastName} onChange={handleUpdateChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={userUpdateDetails.email} onChange={handleUpdateChange} />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <div className="mobile-input">
                      <span className="country-code">+91</span>
                      <input type="text" name="phone" value={userUpdateDetails.phone} onChange={handleUpdateChange} />
                    </div>
                  </div>
                </div>
              </div>
              <hr className="custom-hr" />
              <div className="form-section">
                <h4>Professional Details</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Bank Name</label>
                    <input type="text" name="bankName" value={userUpdateDetails.bankName} onChange={handleUpdateChange} />
                  </div>
                  <div className="form-group">
                    <label>Branch Name</label>
                    <input type="text" name="bankBranch" value={userUpdateDetails.bankBranch} onChange={handleUpdateChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>IFSC Code</label>
                    <input type="text" name="bankIFSC" value={userUpdateDetails.bankIFSC} onChange={handleUpdateChange} />
                  </div>
                  <div className="form-group">
                    <label>Job Title</label>
                    <input type="text" name="designation" value={userUpdateDetails.designation} onChange={handleUpdateChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Branch Zone</label>
                    <input type="text" name="branchZone" value={userUpdateDetails.branchZone} onChange={handleUpdateChange} />
                  </div>
                  <div className="form-group">
                    <label>Branch Address</label>
                    <textarea name="bankAddress" value={userUpdateDetails.bankAddress?.address} onChange={handleUpdateChange} rows="1" />
                  </div>
                </div>
              </div>
              <hr className="custom-hr" />
              <button className="save-btn" onClick={handleUpdateProfile}>Save changes</button>
              <button className="save-btn" onClick={() => setShowPasswordPopup(true)}>Change Password</button>

              {showPasswordPopup && (
                <div className="popup-overlay">
                  <div className="popup-content">
                    <h3>Change Password</h3>
                    <input
                      type="password"
                      placeholder="Old Password"
                      name="oldPassword"
                      value={passwords.oldPassword}
                      onChange={handlePasswordChange}
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                    <button onClick={() => setShowPasswordPopup(false)}>Close</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Popup after saving */}
          {showPopup && (
            <div className="popup-message">
              Profile updated successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile2;
