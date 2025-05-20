import { useContext, useEffect } from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import AuctionLanding from './components/auctionSystem/AuctionLanding';
import About from './pages/About';
import NavigationBar from './components/auctionSystem/components/NavigationBar';
import Footer from './components/auctionSystem/About Us/Footer';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import Assets from './pages/Assets';
import UserSideP from './components/auctionSystem/UsersidePrime/AuctionLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Contact } from './components/auctionSystem/components/Contact';
import Profile1 from './components/auctionSystem/profile1/Profile';
import Single from './components/auctionSystem/MyProperty1/singlePage/single';
import { AppContext } from './context/context';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const location = useLocation();
  const hideFooterRoutes = ['/profile1', '/sign-up', '/sign-in'];

  const { serverUrl, isAuthenticated, setIsAuthenticated, setAuthChecked } = useContext(AppContext);

  // Set axios to send credentials (cookies) on every request globally
  axios.defaults.withCredentials = true;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/v1/user/check-auth`);
      setIsAuthenticated(response.data.success);
    } catch (error) {
      if (error.response?.status === 401) {
        setIsAuthenticated(false);
      } else {
        console.error('Unexpected authentication error:', error);
      }
    } finally {
      setAuthChecked(true);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <NavigationBar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <UserSideP /> : <AuctionLanding />} />
        <Route path="/about" element={<About />} />
        <Route path="/properties" element={<Assets />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/property/:id"
          element={
            <PrivateRoute>
              <Single />
            </PrivateRoute>
          }
        />
        <Route path="/profile1" element={<Profile1 />} />
      </Routes>

      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
