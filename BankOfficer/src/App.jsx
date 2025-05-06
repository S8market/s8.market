
import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom";
import MyAssets from './officerPages/my Assets/MyAssets';
import Single from './officerPages/singlePage/single';
// import Auction from './officerPages/auction/Auction';
import AssetsView from './officerPages/my Assets/AssetsView';
import AddAsset from './officerPages/add new asset/AddAsset';
import Profilepage from './officerPages/profilePage/ProfilePage';
import Profile2 from './officerPages/profile Settings/Profile2';
import Dashboard from './officerPages/dashboard/dashboard';
import { useContext, useEffect } from 'react';
import { AppContext } from './context/context';
import axios from 'axios';
// import ChangePassword from './officerPages/ChangePassword';
import BankSignInPage from './officerPages/signInPage/SignIn';
import BankSignUpPage from './officerPages/signUpPage/SignUp';
import PrivateRoute from './dashComponent/PrivateRoute/PrivateRoute';

// import PropertyDetailsForm from './dashComponent/nAsset Forms/PropertyDetailForm';
// import AddressDetailsForm from './dashComponent/nAsset Forms/AddressForm';
// import AuctionDetailsForm from './dashComponent/nAsset Forms/AuctionForm';


function App() {
  const { serverUrl, isAuthenticated, setIsAuthenticated, setAuthChecked } = useContext(AppContext)
  const navigate = useNavigate()


  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/v1/bank-user/check-auth`, {
        withCredentials: true,
      });
      setIsAuthenticated(response.data.success);
    } catch (error) {
      console.error("Authentication check failed:", error);
      setIsAuthenticated(false);
    } finally {
      setAuthChecked(true); // Mark auth check as complete
    }
  };
  // Prevent rendering until authentication status is determined
  if (isAuthenticated === null) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<BankSignInPage />} />
        <Route path="/sign-up" element={<BankSignUpPage />} />
        <Route path="/dashboard" element={<PrivateRoute> <Dashboard /></PrivateRoute>} />
        <Route path="/myAssets" element={<PrivateRoute><MyAssets /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile2 /></PrivateRoute>} />
        <Route path="/view" element={<PrivateRoute><AssetsView /></PrivateRoute>} />
        <Route path="/property/:id" element={<PrivateRoute><Single /></PrivateRoute>} />
        <Route path="/addNew" element={<PrivateRoute><AddAsset /></PrivateRoute>} />
        <Route path="/" element={<Profilepage />} />
      </Routes>

    </>
  )
}

export default App
