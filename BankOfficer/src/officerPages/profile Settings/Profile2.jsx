import "./profile2.scss";
import Header from "../../dashComponent/nav/header/Header";
import Sidebar from "../../dashComponent/Sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/context";
import axios from "axios";
// import ChangePassword from "../ChangePassword";
import { useNavigate } from "react-router-dom";
const Profile2 = () => {
    const [image, setImage] = useState("/user.png"); // Default avatar
    const { serverUrl, avatar, setAvatar, userDetails, setUserDetails, handleProfile } = useContext(AppContext);
    const [editAvatar, setEditAvatar] = useState(false)
    const [showForm, setShowForm] = useState(false); // State to control form visibility
    const [userUpdateDetails, setUserUpdateDetails] = useState({})

    useEffect(() => {
        // Fetch user details from the database
        
        console.log(userDetails)
            // Update user details
    setUserUpdateDetails({
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
    }, [showForm]); 

    // update user Profile
    const handleUpdateProfile = async () => {
      try {
        const formData = new FormData();
        formData.append("firstName", userUpdateDetails.firstName);
        formData.append("lastName", userUpdateDetails.lastName);
        formData.append("email", userUpdateDetails.email);
        formData.append("phone", userUpdateDetails.phone);
        formData.append("bankBranch", userUpdateDetails.bankBranch);
        formData.append("bankIFSC", userUpdateDetails.bankIFSC);
        formData.append("branchZone", userUpdateDetails.branchZone);
        formData.append("designation", userUpdateDetails.designation);
        formData.append("bankAddress", JSON.stringify(userUpdateDetails.bankAddress));
        // if (image) {
        //   formData.append("files", image); // Append the image file
        // }

        const { data } = await axios.post(serverUrl + "/api/v1/bank-user/update-profile", userUpdateDetails, 
          {
            // headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        console.log(data)
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
      } catch (error) {
        console.log(error);
      }
    }

    const updateProfileImage = async () => {

      try {
        if (!editAvatar) {
          document.getElementById("avatarUpload").click()
          
        } else {
          
        
        const formData = new FormData();
        
        formData.append("image", image); // Append the image file
        

        const { data } = await axios.post(serverUrl + "/api/v1/bank-user/update-profile-image", formData, 
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        console.log(data)
        setEditAvatar(null)
      }
      } catch (error) {
        console.log(error);
      }
    }

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImage(file); // Set the image file
        setAvatar(imageUrl)
        setEditAvatar(true)
      }
    };

    // For Pop-up Message
    const [showPopup, setShowPopup] = useState(false); // State for popup

    // Handle Save Button Click
    const handleSave = () => {
      handleUpdateProfile(); // Update user profile
      setShowPopup(true); // Show the popup

      // Hide the popup after 2 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    };

    



    // Handle input changes
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
      }));
    };

    const handleUpdateChange = (event) => {
      const { name, value } = event.target;
      setUserUpdateDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
      }));
    };

    const [showPasswordPopup, setShowPasswordPopup] = useState(false);
      const [passwords, setPasswords] = useState({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    const handlePasswordChange = (e) => {
      const { name, value } = e.target;
      setPasswords((prev) => ({
        ...prev,
        [name]: value
      }));
    };

    return userDetails.firstName && (
    <div className="profile">
      <div className="sideContainer2">
        <Sidebar />
      </div>
      <div className="mainContent">
        <Header />
        <div className="mainWrapper">
        <div className="profile-container">
               {/* Avatar Section */}
      <div className="avatar-section">
        <img src={avatar ? avatar : "/user.png"} alt="User Avatar" className="avatar" onClick={() => document.getElementById("avatarUpload").click()}/>
        <h3>@{userDetails.firstName || "User"}</h3>
        <input
          type="file"
          id="avatarUpload"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <button onClick={updateProfileImage} className="upload-btn">
          {editAvatar ? "Update": "Upload Bank Logo"}
        </button>
      </div>

       {/* Information Section (Auto Updates) */}
      <div className="details-section">
        <div className="info">
          <h4>Information</h4>
          <p><strong>Name:</strong> {userDetails.firstName || "First Name" } {userDetails.lastName}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Tel:</strong> {userDetails.phone}</p>
          <button className="update-details-btn" onClick={() => setShowForm(!showForm)} >
            Update Details
          </button>
        </div>
        <div className="info2">
          <h4>Professional Details</h4>
          <p><strong>Bank name:</strong> {userDetails.bankName.toUpperCase()}</p>
          <p><strong>Job Title:</strong> {userDetails.designation}</p>
          <p><strong>IFSC:</strong> {userDetails.bankIFSC }</p>
          <p><strong>Branch Name:</strong> {userDetails.bankBranch }</p>
          <p><strong>Branch Zone:</strong> {userDetails.branchZone}</p>
          <p><strong>Branch Address:</strong> {userDetails.bankAddress.address } {userDetails.bankAddress.city } {userDetails.bankAddress.state }-{userDetails.bankAddress.pincode }</p>
        </div>
       </div>
      </div>

          {/* Show form only when showForm is true */}
          {showForm && (
           <div className="form-container">
                            <h3 className="form-title">User Settings</h3>

                            {/* Personal Details */}
                        <div className="form-section">
                            <h4>Personal Details</h4>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" name="firstName" value={userUpdateDetails.firstName} placeholder="Enter your first name..." onChange={handleUpdateChange} />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" name="lastName" value={userUpdateDetails.lastName} placeholder="Enter your last name..." onChange={handleUpdateChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" value={userUpdateDetails.email} placeholder="Enter your email..." onChange={handleUpdateChange} />
                                </div>
                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <div className="mobile-input">
                                        <span className="country-code">+91</span>
                                        <input type="text" name="phone" value={userUpdateDetails.phone} placeholder="Enter your number..." onChange={handleUpdateChange} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* horrizontal line */}
                        <hr className="custom-hr" /> 

             {/* Professional Details Form */}
                       <div className="form-section">
                            <h4>Professional Details</h4>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Bank Name</label>
                                    <input type="text" name="bankName" value={userUpdateDetails.bankName} placeholder="Enter your bank name..." onChange={handleUpdateChange} />
                                </div>
                                <div className="form-group">
                                    <label>Branch Name</label>
                                    <input type="text" name="bankBranch" value={userUpdateDetails.bankBranch} placeholder="Enter branch name..." onChange={handleUpdateChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>IFSC Code</label>
                                    <input type="text" name="bankIFSC" value={userUpdateDetails.bankIFSC} placeholder="Enter IFSC code..." onChange={handleUpdateChange} />
                                </div>
                                <div className="form-group">
                                    <label>Job Title</label>
                                    <input type="text" name="designation" value={userUpdateDetails.designation} placeholder="Enter job title..." onChange={handleUpdateChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Branch Zone</label>
                                    <input type="text" name="branchZone" value={userUpdateDetails.branchZone} placeholder="Enter branch zone..." onChange={handleUpdateChange} />
                                </div>
                                <div className="form-group">
                                    <label>Branch Address</label>
                                    <textarea type="text" name="bankAddress" value={userUpdateDetails.bankAddress} placeholder="Enter branch address..." onChange={handleUpdateChange}  rows="1"/> 
                                </div>
                             </div>
                        </div>

                  {/* horrizontal line */}
                  <hr className="custom-hr" /> 

           

            <button className="save-btn" onClick={handleSave}>Save changes</button>

 {/* Password Settings*/}
           
            {showPasswordPopup && (
  <div className="password-popup-overlay">
    <div className="password-popup">
      <h2 className="a1"><b>Change Password</b></h2>
      <div className="popup-input-group">
        <label>Old Password</label>
        <input
          className="a2"
          type="password"
          name="oldPassword"
          value={passwords.oldPassword}
          onChange={handlePasswordChange}
          placeholder="Enter old password"
        />
      </div>
      <div className="popup-input-group">
        <label>New Password</label>
        <input
          className="a2"
          type="password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handlePasswordChange}
          placeholder="Enter new password"
        />
      </div>
      <div className="popup-input-group">
        <label>Confirm New Password</label>
        <input
          className="a2"
          type="password"
          name="confirmPassword"
          value={passwords.confirmPassword}
          onChange={handlePasswordChange}
          placeholder="Re-enter new password"
        />
      </div>
      <div className="popup-buttons a3">
        <button onClick={() => setShowPasswordPopup(false)}>Cancel</button>
        <button onClick={() => {
  
          console.log(passwords);
          setShowPasswordPopup(false);
        }}>Submit</button>
      </div>
    </div>
  </div>
)}
<button className="save-btn" onClick={() => setShowPasswordPopup(true)}>Change Password</button>

           </div>
           )}
        </div>
      </div>

      {showPopup && (
        <div className="popupMessage">
          <p>Profile saved successfully!</p>
        </div>
      )}

    </div>
  );
};

export default Profile2;