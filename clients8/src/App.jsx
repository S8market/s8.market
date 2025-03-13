import { useContext, useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import AuctionLanding from './components/auctionSystem/AuctionLanding'
import About from './pages/About'
import NavigationBar from './components/auctionSystem/components/NavigationBar'
import Footer from './components/auctionSystem/About Us/Footer'
import SignUpPage from './pages/SignUp'
import { SignupForm } from './pages/SignupForm'
import Assets from './pages/Assets'
import Property from './components/auctionSystem/MyProperty/AuctionLayout'
import UserSideP from './components/auctionSystem/UsersidePrime/AuctionLayout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Contact } from './components/auctionSystem/components/Contact'
// import Profile from './components/auctionSystem/Profile/ProfilePage'
import Profile1 from './components/auctionSystem/profile1/Profile'
import Single from './components/auctionSystem/MyProperty1/singlePage/single'
import { AppContext } from './context/context'
import axios from 'axios'
import MyAssets from './components/auctionSystem/MyProperty1/AssetCards/MyAssetsCards'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const location = useLocation(); // Get current route path
  const hideFooterRoutes = ["/profile1"]; // Routes where the footer should be hidden

  const {serverUrl, isAuthenticated, setIsAuthenticated, setAuthChecked} = useContext(AppContext)
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get(serverUrl + "/api/v1/user/check-auth", {
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
      <ToastContainer position="top-right" autoClose={3000} />
      <NavigationBar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <UserSideP /> :<AuctionLanding />} />
        <Route path="/about" element={<About />} />
        <Route path="/properties" element={<Assets />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        {/* <Route path="/property" element={<Property />} /> */}
        {/* <Route path="/usersideprime" element={<UserSideP />} /> */}
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/property/:id" element={<PrivateRoute><Single /></PrivateRoute>} />
        <Route path="/profile1" element={<Profile1 />} />
        
      </Routes>

      {/* Hide Footer on /profile1 */}
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  )
}

export default App
