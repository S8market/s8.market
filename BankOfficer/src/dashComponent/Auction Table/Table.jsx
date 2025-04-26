import { useState, useMemo, useContext, useEffect } from "react";
import { Search, Users } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link component for routing
import * as XLSX from "xlsx"; // Import xlsx library
import "./table.scss";
import axios from "axios";
import { AppContext } from "../../context/context";
import { useNavigate, useParams, useLocation} from "react-router-dom";


const AuctionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const { serverUrl, properties, formData, setFormData, setEditProperty, setUploadedFiles} = useContext(AppContext);
  const { id } = useParams(); // Get ID from the URL

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getPropertyById();
  }, []);

  const getPropertyById = async () => {
    try {
      const { data } = await axios.post(`${serverUrl}/api/v1/bank-user/get-property-by-id`, { id }, {
        withCredentials: true,
      });

      if (data.success) {
        setProperty(data.property);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  // Calculate start and end entries
  const startEntry = (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(currentPage * itemsPerPage, properties.length);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery) return properties;
    return properties.filter((item) =>
      Object.values(item).some((value) => {
        try {
          return String(value).toLowerCase().includes(searchQuery.toLowerCase());
        } catch (error) {
          console.error("Error filtering data:", error);
          return false;
        }
      })
    );
  }, [searchQuery, properties]);

  // Get current data for the current page
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get pagination pages
  const getPagination = () => {
    const pages = [];
    const range = 2; // Number of page numbers to show before and after the current page

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - range);
      let end = Math.min(totalPages, currentPage + range);

      if (start > 1) pages.push(1);
      if (start > 2) pages.push("...");

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) pages.push("...");
      if (end < totalPages) pages.push(totalPages);
    }
    return pages;
  };

  // Get Status of auction
  const getStatus = (auctionDate) => {
    const currentDate = new Date();
    const auctionDateObj = new Date(auctionDate);

    if (auctionDateObj < currentDate.setHours(0, 0, 0, 0)) {
      return "Closed";
    } else if (auctionDateObj.toDateString() === currentDate.toDateString()) {
      return "Ongoing";
    } else {
      return "Upcoming";
    }
  };

  // Export data to Excel
  const exportToExcel = () => {
    // Map data to a flat format for Excel
    const exportData = properties.map((item, index) => ({
      "SR. NO.": index + 1,
      "PROPERTY NAME": item.title,
      PRICE: item.price,
      DATE: item.auctionDate,
      ADDRESS: item.address,
      CITY: item.city,
      STATE: item.state,
      STATUS: getStatus(item.auctionDate),
      AUCTION_TYPE: item.auctionType,
      CATEGORY: item.category,
      BORROWER: item.borrower,
      "DUE AMOUNT": item.dueAmount,
      DEPOSIT: item.deposit,
      "BID INC AMOT": item.bidInc,
      "INSPECTION DATE": item.inspectDate,
      "INSPECTION TIME": item.inspectTime,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Auction Data");
    XLSX.writeFile(workbook, "Auction List.xlsx");
  };

  // Highlight search text
  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  // Format date as dd-mm-yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

//Edit
const handleEdit = async (propertyId) => {
  try {
    const { data } = await axios.post(`${serverUrl}/api/v1/bank-user/get-property-by-id`, { id: propertyId }, {
      withCredentials: true,
    });

    if (data.success) {
      const {
        title,
        category,
        auctionType,
        auctionDate,
        auctionTime,
        area,
        price,
        description,
        contact,
        nearbyPlaces,
        mapLocation,
        address,
        auctionUrl,
        borrower,
        amountDue,
        deposit,
        bidInc,
        inspectDate,
        inspectTime,
        reservPrice,
        message,
      } = data.property;

      setFormData((prevState) => ({
        ...prevState,
        title,
        category,
        auctionType,
        auctionDate,
        auctionTime,
        area,
        price,
        description,
        contact,
        nearbyPlaces,
        latitude: mapLocation?.latitude || "",
        longitude: mapLocation?.longitude || "",
        address: {
          address: address?.address || "",
          city: address?.city || "",
          state: address?.state || "",
          pincode: address?.pincode || "",
        },
        auctionUrl,
        borrower,
        amountDue,
        deposit,
        bidInc,
        inspectDate,
        inspectTime,
        reservPrice,
        message,
      }));

      setUploadedFiles(data.property.image);
      setEditProperty(true);
      navigate("/addNew");

      console.log(formData);
      console.log(data.property);
    } else {
      console.log(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleDelete = async (propertyId) => {
  const isConfirmed = window.confirm("Are you sure you want to delete this property?");
  if (!isConfirmed) return;
  
  try {
    const { data } = await axios.post(`${serverUrl}/api/v1/bank-user/delete-property`, {propertyId }, {
      withCredentials: true,
    });
    console.log(data)
    if (data.success) {
      alert("Property deleted successfully");
      window.location.reload();
    } else {
      alert("Failed to delete property");
    }
  } catch (error) {
    console.error("Error deleting property:", error);
    alert("An error occurred while deleting the property");
  }
};

  return (
    <div className="auction-container">
      <div className="auction-header">
        <h2>Auction List</h2>
        <div className="auction-actions">
          <div className="search-box">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search records"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link to="/addNew" className="add-button">
            <Users size={16} /> Add New Assets
          </Link>
        </div>
      </div>
      <div className="table-options">
        <label>Show Entries: </label>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
      <div className="download" style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="download-button1" style={{ marginBottom: "25px" }} onClick={exportToExcel}>
          Download Excel
        </button>
      </div>
      <div className="table-container">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>SR. NO.</th>
                <th>PROPERTY NAME</th>
                <th>BORROWER</th>
                <th>PRICE</th>
                <th className="date-column">DATE</th>
                <th>CATEGORY</th>
                <th className="address-column">ADDRESS</th>
                <th>CITY</th>
                <th>STATE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{highlightText(item.title, searchQuery)}</td>
                  <td>{highlightText(item.borrower, searchQuery)}</td>
                  <td>{highlightText(item.price, searchQuery)}</td>
                  <td>{highlightText(formatDate(item.auctionDate), searchQuery)}</td>
                  <td>{highlightText(item.category, searchQuery)}</td>
                  <td className="address-column">{highlightText(`${item.address?.address}, - ${item.address?.pincode}`, searchQuery)}</td>
                  <td>{highlightText(item.address?.city, searchQuery)}</td>
                  <td>{highlightText(item.address?.state, searchQuery)}</td>
                  <td>
                    <span className={`status ${getStatus(item.auctionDate).toLowerCase()}`}>
                      {highlightText(getStatus(item.auctionDate), searchQuery)}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <Link to={`/property/${item._id}`} state={{ from: location.pathname }} className="view-button">
                      <img src="/goTo.svg" alt="View" width={16} height={16} />
                      <span className="tooltip">View</span>
                    </Link>
                    <button onClick={() => handleEdit(item._id)} className="edit-button">
                      <img src="/edit2.svg" alt="edit" width={16} height={16} />
                      <span className="tooltip">Edit</span>
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="delete-button">
                      <img src="/delete2.svg" alt="delete" width={16} height={16} />
                      <span className="tooltip">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pagination-container">
        <div className="showing-entries">
          Showing {startEntry} to {endEntry} out of {filteredData.length} results found
        </div>
        <div className="pagination-controls">
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>First</button>
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
          {getPagination().map((page, index) => (
            <button 
              key={index} 
              className={currentPage === page ? "active" : ""} 
              onClick={() => typeof page === "number" && setCurrentPage(page)}
              disabled={page === "..."}>{page}</button>
          ))}
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
          <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Last</button>
        </div>
      </div>
    </div>
  );
};

export default AuctionHistory;