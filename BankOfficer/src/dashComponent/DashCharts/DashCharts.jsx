import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import "./dashCharts.scss";
import { AppContext } from "../../context/context";
import * as XLSX from "xlsx";
import { Link, useLocation } from "react-router-dom";

const DashCharts = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [interactionFilter, setInteractionFilter] = useState("Today");
  const [interactionData, setInteractionData] = useState([]);

  const { serverUrl } = useContext(AppContext);
  const location = useLocation();

  // Fetch assets
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

  useEffect(() => {
    handleInteractionFilter(interactionFilter);
  }, [interactionFilter]);

  // Interaction chart filter logic
  const handleInteractionFilter = (filter) => {
    let data;
    if (filter === "Today") {
      data = [
        { hour: "9 AM", views: 4 },
        { hour: "12 PM", views: 7 },
        { hour: "3 PM", views: 5 },
        { hour: "6 PM", views: 8 },
        { hour: "9 PM", views: 6 },
      ];
    } else if (filter === "Weekly") {
      data = [
        { day: "Mon", views: 15 },
        { day: "Tue", views: 18 },
        { day: "Wed", views: 12 },
        { day: "Thu", views: 20 },
        { day: "Fri", views: 25 },
        { day: "Sat", views: 22 },
        { day: "Sun", views: 19 },
      ];
    } else {
      // Monthly
      data = [
        { week: "Week 1", views: 50 },
        { week: "Week 2", views: 65 },
        { week: "Week 3", views: 70 },
        { week: "Week 4", views: 80 },
      ];
    }
    setInteractionData(data);
  };

  const cityOptions = ["All", ...new Set(assets.map(item => item.address?.city).filter(Boolean))];
  const categoryOptions = ["All", ...new Set(assets.map(item => item.category).filter(Boolean))];

  const getStatus = (auctionDate) => {
    if (!auctionDate) return "Unknown";
    const today = new Date().toISOString().split("T")[0];
    const auctionDay = new Date(auctionDate).toISOString().split("T")[0];
    if (auctionDay > today) return "Upcoming";
    if (auctionDay === today) return "Ongoing";
    return "Closed";
  };

  const filteredData = assets.filter(asset =>
    (selectedCity === "All" || asset.address?.city === selectedCity) &&
    (selectedCategory === "All" || asset.category === selectedCategory) &&
    (selectedStatus === "All" || getStatus(asset.auctionDate) === selectedStatus) &&
    (selectedDate === "" || new Date(asset.auctionDate).toISOString().split("T")[0] === selectedDate) &&
    (!minPrice || asset.price >= parseFloat(minPrice)) &&
    (!maxPrice || asset.price <= parseFloat(maxPrice))
  );

  const totalAssets = filteredData.length;

  const categoryCount = filteredData.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(categoryCount).map(category => ({
    name: category,
    value: categoryCount[category],
    color: getCategoryColor(category),
  }));

  function getCategoryColor(category) {
    const colors = {
      Residential: "#60A5FA",
      Commercial: "#A78BFA",
      Industrial: "#FB923C",
      Land: "#86EFAC",
    };
    return colors[category] || "#F472B6";
  }

  const priceRangeData = filteredData.reduce((acc, asset) => {
    acc[asset.category] = (acc[asset.category] || 0) + 1;
    return acc;
  }, {});

  const pricePieData = Object.keys(priceRangeData).map(category => ({
    name: category,
    value: priceRangeData[category],
    color: getCategoryColor(category),
  }));

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToPage = (page) => setCurrentPage(page);

  const exportToExcel = () => {
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
    if (worksheet.length === 0) return alert("No data available for export.");
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
          {/* Total Assets */}
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
                    <div className="fill-bar" style={{ width: `${percentage}%`, backgroundColor: getCategoryColor(category) }}></div>
                    <div className="text-content">
                      <h3>{categoryCount[category]}</h3>
                      <p>{category}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Donut Chart */}
          <div className="asset-analytics">
            <h4>My Asset Analytics</h4>
            <div className="filters">
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                <option value="All">All Location</option>
                {cityOptions.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
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
              <div className="donut-center">
                <h2>{totalAssets}</h2>
                <p>Total</p>
              </div>
            </div>
          </div>

          {/* User Interactions */}
          <div className="user-interactions">
            <h4>User Interactions</h4>
            <div className="filters">
              <select value={interactionFilter} onChange={(e) => setInteractionFilter(e.target.value)}>
                <option value="Today">Today</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={interactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={interactionFilter === "Today" ? "hour" : interactionFilter === "Weekly" ? "day" : "week"} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#2563EB" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* (The rest: Price Range, Table, Pagination — stays same as previous version) */}
        </>
      )}
    </div>
  );
};

export default DashCharts;
