import * as React from "react";
import { NavLink, useParams, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import userIcon from "../../../assets/person_13924070.png";
import { AppContext } from "../../../context/context";
import { toast } from "react-toastify";
import { Menu } from "lucide-react";

const styles = {
  logoContainer: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    marginBottom: '10px',
    minHeight: '56px',
    marginTop: '1rem'
  },
  logoCircle: {
    width: '60px',
    height: '60px',
    backgroundColor: '#A7B5BE',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: '-10px'
  },
  logoText: {
    color: '#004663',
    fontSize: '24px',
    fontWeight: 'bold'
  }
};

export default function NavigationBar() {
  const { avatar, isAuthenticated, setIsAuthenticated, searchString, setSearchString, getProperties } = React.useContext(AppContext);
  const { section } = useParams();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = React.useState(null);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: "Home", isBold: true, to: "/" },
    { label: "Assets", isBold: false, to: "/properties" },
    { label: "About Us", isBold: false, to: "/about" },
    { label: "Contact Us", isBold: false, to: "/contact" },
  ];

  React.useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = navItems.findIndex(item => item.to === currentPath);
    setActiveIndex(activeItem);
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      toast.error("Login First");
    } else {
      e.preventDefault();
      if (!searchString || searchString.trim().length < 3) {
        alert("Search string must be at least 3 characters.");
        return;
      }
      navigate('/properties');
      getProperties();
    }
  };

  return (
    <div className="w-full bg-white px-9 py-3.5 max-md:px-5">
      <div className="flex justify-between items-center w-full">
        <div style={styles.logoContainer}>
          <Link to="/">
            <div style={styles.logoCircle}>
              <span style={styles.logoText}>S8</span>
            </div>
          </Link>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <form
            className="flex overflow-hidden relative gap-5 px-5 py-3 border border-solid bg-white border-zinc-300 rounded-[50px] w-full"
            onSubmit={handleSubmit}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b10ef0b9ed50f347e507ce263da543df27eb52dce5de8cd66bf0b6544ba8a03"
              alt="Search Icon"
              className="object-contain shrink-0 w-6 aspect-square"
            />
            <input
              type="search"
              className="flex-auto bg-transparent text-black border-none focus:outline-none"
              placeholder="Search for auctions near you ...."
              value={searchString}
              onChange={isAuthenticated ? (e) => setSearchString(e.target.value) : () => {
                navigate('/sign-in');
                toast.error("Login First");
              }}
            />
          </form>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) => `cursor-pointer ${isActive ? "font-bold" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full ${avatar ? "" : "bg-[#004663]"} cursor-pointer`}
              onClick={() => navigate('/profile1')}
            >
              <img
                src={avatar ? avatar : userIcon}
                alt="User Profile Icon"
                className={`object-contain ${avatar ? "w-12" : "w-6"} aspect-square filter ${avatar ? "" : "invert"}`}
              />
            </div>
          ) : (
            <NavLink to='/sign-in' className="gap-2.5 px-6 py-2.5 font-semibold text-white bg-sky-900 rounded-[55px]">
              Sign in
            </NavLink>
          )}
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4">
          <form
            className="flex overflow-hidden relative gap-5 px-5 py-3 border border-solid bg-white border-zinc-300 rounded-[50px] w-full"
            onSubmit={handleSubmit}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b10ef0b9ed50f347e507ce263da543df27eb52dce5de8cd66bf0b6544ba8a03"
              alt="Search Icon"
              className="object-contain shrink-0 w-6 aspect-square"
            />
            <input
              type="search"
              className="flex-auto bg-transparent text-black border-none focus:outline-none"
              placeholder="Search for auctions near you ...."
              value={searchString}
              onChange={isAuthenticated ? (e) => setSearchString(e.target.value) : () => {
                navigate('/sign-up');
                toast.error("Login First");
              }}
            />
          </form>

          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) => `cursor-pointer ${isActive ? "font-bold" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full ${avatar ? "" : "bg-[#004663]"} cursor-pointer`}
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/profile1');
              }}
            >
              <img
                src={avatar ? avatar : userIcon}
                alt="User Profile Icon"
                className={`object-contain ${avatar ? "w-12" : "w-6"} aspect-square filter ${avatar ? "" : "invert"}`}
              />
            </div>
          ) : (
            <NavLink to='/sign-in' className="gap-2.5 px-6 py-2.5 font-semibold text-white bg-sky-900 rounded-[55px]">
              Sign in
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
}
