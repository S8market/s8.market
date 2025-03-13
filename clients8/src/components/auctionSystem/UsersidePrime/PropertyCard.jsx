import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/context";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingWrapper from "../components/Loading";

function PropertyCard({category}) {
  const navigate = useNavigate();
  const { serverUrl, properties, setProperties, isAuthenticated, getProperties, searchString } = useContext(AppContext);
  const [showAllProperties, setShowAllProperties] = useState(false);

  const [prop, setProp] = useState([])
  // useEffect(() => {
  //   getProperties()
  // }, [getProperties])
  
  useEffect(() => {
    // If the search string (after trimming) has more than 2 characters, execute getProp.
    if (searchString?.trim().length > 2) {
      getProp();
    } else {
      // Otherwise, use the default 'properties' from context.
      setProp(properties);
    }
  }, [searchString, properties]);
  
  const getProp = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/v1/user/searchProperties`,
        { searchString },
        { withCredentials: true }
      );
      // Update state with the search results.
      setProp(response.data.data);
    } catch (error) {
      console.error("Error searching properties:", error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };

  // const [isLoading, setIsLoading] = React.useState(false);

  // useEffect(() => {
  //   if (searchString?.trim().length > 2) {
  //     getProp();
  //   } else {
  //     setProp(properties);
  //   }
  // }, [searchString, properties]);

  // const getProp = async () => {
  //   try {
  //     setIsLoading(true); // Start loading
  //     const response = await axios.post(
  //       `${serverUrl}/api/v1/user/searchProperties`,
  //       { searchString },
  //       { withCredentials: true }
  //     );
  //     setProp(response.data.data);
  //   } catch (error) {
  //     console.error("Error searching properties:", error);
  //     toast.error("Error searching properties");
  //   } finally {
  //     setIsLoading(false); // Stop loading regardless of success/error
  //   }
  // };

  const handleSeeDetails = (propertyId) => {
    window.scrollTo(0, 0);
    if(isAuthenticated){

      navigate(`/property/${propertyId}`);
    }else{
      navigate("/sign-up")
      toast.error("Login First")
    }
  };

  const handleViewAll = () => {
    setShowAllProperties(true);
  };
  // console.log(category)
  // Determine which properties to display
  let displayProperties;
  if(!category){
    displayProperties = showAllProperties ? prop : prop.slice(0, 4);
  }else{
    const newProp = prop.filter(item => item?.category?.toLowerCase() === category?.toLowerCase())
    displayProperties = showAllProperties ? newProp : newProp.slice(0, 4);
  }

  return (
    // <LoadingWrapper 
    //   isLoading={isLoading}
    //   className="min-h-[500px]" // Add minimum height to prevent layout shift
    // >
    <div>
      {/* Property Cards */}
      <div className="flex flex-wrap gap-5 justify-center">
        {displayProperties.map((property) => (
          <div 
            key={property._id} 
            className="flex flex-col bg-white rounded-lg shadow-lg w-[300px] min-h-[420px] transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-xl hover:scale-105"
            >
            <div className="p-4">
              <img
                loading="lazy"
                src={property.image[0]?.url || 'placeholder-image-url'}
                alt={property.title}
                className="object-cover w-full h-[200px] rounded-xl"
                />
            </div>
            
            <div className="flex flex-col p-6 w-full rounded-b-xl h-full relative">
              <div>
                <div className="text-xl font-semibold text-slate-500 text-left">{property.title}</div>
                
                <div className="text-sm text-slate-400 mt-2 text-left">{property.location}</div>
      
                <div className="flex items-center mt-4">
                  <div className="text-slate-500 text-sm mr-2">Bid Price:</div>
                  <div className="font-medium text-zinc-900">{property.price}</div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6">
                <button 
                  onClick={() => handleSeeDetails(property._id)}
                  className="flex justify-center items-center px-4 py-2 bg-sky-900 text-white rounded-lg hover:bg-sky-800 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                  >
                  <div className="text-sm font-medium">See Details</div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!showAllProperties && prop.length > 4 && (
        <div className="flex justify-end mt-8 mr-8">
          <button 
            onClick={handleViewAll}
            className="flex gap-2 justify-center items-center px-6 py-3 text-xl font-medium rounded-2xl bg-sky-900 bg-opacity-5 hover:bg-opacity-10 transition-all duration-300"
          >
            <div className="text-slate-600">View all...</div>
            <div className="flex gap-1 justify-center items-center self-stretch px-1 my-auto w-8 h-8 rounded-lg bg-sky-900 bg-opacity-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </button>
        </div>
      )}
    </div>
    // </LoadingWrapper>
  );
}

export default PropertyCard;
