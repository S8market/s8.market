import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import "./dashCharts.scss";
import { AppContext } from "../../context/context";
import * as XLSX from "xlsx"; // Import XLSX for Excel export
import { Link, useLocation } from "react-router-dom";

const DashCharts = () => {
  // **State for Assets & Filters**
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { serverUrl } = useContext(AppContext);

  const location = useLocation(); // Get the current location
  
  // **Fetch Data from API**
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const { data } = await axios.get(`${serverUrl}/api/v1/bank-user/get-property`, {
          withCredentials: true,
        });

        if (data.success) {
          setAssets(data.properties);
        } else {
          console.log("Error:", data.message);
        }
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [serverUrl]);

  // **Extract Unique City Names & Categories**
  const cityOptions = ["All", ...new Set(assets.map(item => item.address?.city).filter(Boolean))];
  const categoryOptions = ["All", ...new Set(assets.map(item => item.category).filter(Boolean))];

  //status options
  const getStatus = (auctionDate) => {
    if (!auctionDate) return "Unknown"; // Handle cases with no date
  
    const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
    const auctionDay = new Date(auctionDate).toISOString().split("T")[0];
  
    if (auctionDay > today) return "Upcoming";
    if (auctionDay === today) return "Ongoing";
    return "Closed";
  };

  // **Filter Data Based on Selection**
  const filteredData = assets.filter(asset =>
    (selectedCity === "All" || asset.address?.city === selectedCity) &&
    (selectedCategory === "All" || asset.category === selectedCategory) &&
    (selectedStatus === "All" || getStatus(asset.auctionDate) === selectedStatus) &&
    (selectedDate === "" || new Date(asset.auctionDate).toISOString().split("T")[0] === selectedDate) &&
    (!minPrice || asset.price >= parseFloat(minPrice)) &&
    (!maxPrice || asset.price <= parseFloat(maxPrice))
  );

  // **Total Assets Calculation**
  const totalAssets = filteredData.length;

  // **Category-wise Count Calculation**
  const categoryCount = filteredData.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  // **Formatted Data for Pie Chart**
  const pieData = Object.keys(categoryCount).map(category => ({
    name: category,
    value: categoryCount[category],
    color: getCategoryColor(category),
  }));

  // **Function to Assign Colors to Categories**
  function getCategoryColor(category) {
    const colors = {
      Residential: "#60A5FA",
      Commercial: "#A78BFA",
      Industrial: "#FB923C",
      Land: "#86EFAC", // Fixed "Land" to "Agricultural"
    };
    return colors[category] || "#F472B6"; // Default color if category is missing
  }

  // **User Interactions Line Chart Data (Placeholder)**
  const userData = [
    { month: "Jan", views: 20 },
    { month: "Feb", views: 15 },
    { month: "Mar", views: 18 },
    { month: "Apr", views: 25 },
    { month: "May", views: 30 },
    { month: "Jun", views: 27 },
  ];

  // **Price Range Analysis**
  const priceRangeData = filteredData.reduce((acc, asset) => {
    acc[asset.category] = (acc[asset.category] || 0) + 1;
    return acc;
  }, {});
  
  const pricePieData = Object.keys(priceRangeData).map(category => ({
    name: category,
    value: priceRangeData[category],
    color: getCategoryColor(category),
  }));


  //Table Page Pagination

  // const PaginatedTable = ({ filteredData }) => {
    // State for Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Change this for more/less rows per page
  
    // Calculate total pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
    // Get current page data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  
    // Pagination Handlers
    const nextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    const goToPage = (page) => {
      setCurrentPage(page);
    };
  
     // Export data to Excel
     const exportToExcel = () => {
      // Map data to a flat format for Excel
      const worksheet = XLSX.utils.json_to_sheet(
        filteredData.map((asset, index) => ({
          "SR. NO.": index + 1,
          "PROPERTY NAME": asset.title,
          PRICE: asset.price,
          DATE: asset.auctionDate,
          ADDRESS: asset.address?.street || "N/A",
          CITY: asset.address?.city || "N/A",
          STATE: asset.address?.state || "N/A",
          STATUS: getStatus(asset.auctionDate), 
          AUCTION_TYPE: asset.auctionType,
          CATEGORY: asset.category,
          BORROWER: asset.borrower,
          "DUE AMOUNT": asset.dueAmount,
          DEPOSIT: asset.deposit,
          "BID INC AMT": asset.bidInc,
          "INSPECTION DATE": asset.inspectDate,
          "INSPECTION TIME": asset.inspectTime,
        }))
      );

      if (worksheet.length === 0) {
        alert("No data available for export.");
        return;
      }
    
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Assets Data");
      XLSX.writeFile(workbook, "Assets List.xlsx");
    };

  return (
    <div className="dashboard-charts">
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          {/* ✅ Total Assets & Asset Analytics (1st Row) */}
          <div className="total-assets">
            <div className="asset-card">
              <div className="total-card">Total Assets:</div>
              <div className="total-value">{totalAssets}</div>
            </div>
            <div className="asset-list">
            {Object.keys(categoryCount).map((category, index) => {
              const percentage = (categoryCount[category] / totalAssets) * 100;
              return (
                <div key={index} className="asset-item">
                  <div className="fill-bar" style={{
                    width: `${percentage}%`,
                    backgroundColor: getCategoryColor(category),
                  }}></div>
                  <div className="text-content">
                    <h3>{categoryCount[category]}</h3>
                    <p>{category}</p>
                  </div>
                </div>
              );
             })}
            </div>
          </div>

 {/* My Asset Analytics (Donut Pie Chart) */}
          <div className="asset-analytics">
            <h4>My Asset Analytics</h4>
            <div className="filters">
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="All">All Location</option>
                {cityOptions.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
              <select>
                <option>Today</option>
              </select>
            </div>
            <div className="donut-chart">
             <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
         {/* Centered Text for Total Assets */}
         <div className="donut-center">
                <h2>{totalAssets}</h2>
                <p>Total</p>
              </div>
            </div>
          </div>


          {/* ✅ User Interactions & Price Range Analysis (2nd Row) */}
          <div className="user-interactions">
            <h4>User Interactions</h4>
            <div className="filters">
              <select>
                <option>Today</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#2563EB" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* price Range Analysis (2nd Row) */}
      <div className="price-range-analysis">
       <h4>Analysis using price range</h4>
       <div className="filters">
        <input
         type="number"
         placeholder="Min Price"
         value={minPrice}
         onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
         type="number"
         placeholder="Max Price"
         value={maxPrice}
         onChange={(e) => setMaxPrice(e.target.value)}
        />
        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Closed">Closed</option>
        </select>
       </div>

  {pricePieData.length > 0 ? (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pricePieData}
          cx="50%"
          cy="50%"
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
          label={({ percent }) => `${(percent * 100).toFixed(1)}%`} // Show percentage
        >
          {pricePieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend />
     </PieChart>
    </ResponsiveContainer>
             ) : (
             <p style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
                No assets found within this price range
             </p>
         )}
      </div>


          {/* Table (3rd Row) */}
          <div className="dash-table">
      <h4>Assets Table</h4>
      
      {/* City Filter Dropdown */}
      <div className="table-filters">
        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
        <option value="All">All Location</option>
          {cityOptions.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>

        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">Select Category</option>
          {categoryOptions.map((category, index) => (
           <option key={index} value={category}>{category}</option>
          ))}
        </select>

          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            {/* < option value="" disabled>Select Status</option> */}
            <option value="All">All Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Closed">Closed</option>
          </select>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                placeholder="Select Date"
              />
              <button className="download-button" onClick={exportToExcel}>
                Download Excel
              </button>
            </div>

      {/* Table Display */}
      <div className="table-container">
     
          <table>
            <thead>
              <tr>
              <th style={{ width: "50px",wordWrap: "break-word", whiteSpace: "normal", overflowWrap: "break-word"}}>Sr.no</th>
              <th style={{ width: "250px" }}>Title</th>
              <th style={{ width: "150px" }}>BORROWER</th>
              <th style={{ width: "100px" }}>PRICE</th>
              <th style={{ width: "150px" }}>Category</th>
              <th style={{ width: "120px" }}>Date</th>
              <th style={{ width: "250px" }}>ADDRESS</th>
              <th style={{ width: "120px" }}>City</th>
              <th style={{ width: "120px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((asset, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                       <Link to={`/property/${asset._id}`} className="asset-link" state={{ from: location.pathname }} >
                      {asset.title}</Link>
                    </td>                    
                    <td>{asset.borrower}</td>
                    <td>{asset.price}</td>
                    <td>{asset.category}</td>
                    <td>{asset.auctionDate || "N/A"}</td>
                    <td>{asset.address?.address || "N/A"}</td>
                    <td>{asset.address?.city || "N/A"}</td>
                    <td className={`status ${getStatus(asset.auctionDate).toLowerCase()}`}>
                      {getStatus(asset.auctionDate)}
                    </td>
                  </tr>

                  // with tooltip
                //   <tr key={index}>
                //   <td title={index + 1}>{index + 1}</td>
                //   <td title={asset.title}>{asset.title}</td>
                //   <td title={asset.borrower}>{asset.borrower}</td>
                //   <td title={asset.price}>{asset.price}</td>
                //   <td title={asset.category}>{asset.category}</td>
                //   <td title={asset.auctionDate || "N/A"}>{asset.auctionDate || "N/A"}</td>
                //   <td title={asset.address?.address || "N/A"}>{asset.address?.address || "N/A"}</td>
                //   <td title={asset.address?.city || "N/A"}>{asset.address?.city || "N/A"}</td>
                //   <td 
                //     title={asset.status || "Unknown"} 
                //     className={`status ${asset.status?.toLowerCase() || "unknown"}`}
                //   >
                //     {asset.status || "Unknown"}
                //   </td>
                // </tr>

                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>No assets available</td>
                </tr>
              )}
            </tbody>
          </table>
      </div>

 {/* Pagination Controls */}
 <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            key={i + 1} 
            onClick={() => goToPage(i + 1)} 
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>

    </div>
        </>
      )}
    </div>
  );
};

export default DashCharts;
