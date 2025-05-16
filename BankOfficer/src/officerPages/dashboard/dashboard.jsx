import DashCharts from "../../dashComponent/DashCharts/DashCharts.jsx";
import Header from "../../dashComponent/nav/header/Header";
import Sidebar from "../../dashComponent/Sidebar/Sidebar";
import "./dashboard.scss"

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="sideContainerdash">
        <Sidebar />
      </div>
      <div className="dashContainer">
        <Header />
        <div className="mainDashboard">
           <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '20px' }}>
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label htmlFor="fromDate" style={{ marginBottom: '5px', fontWeight: 'bold' }}>From</label>
    <input
      id="fromDate"
      type="date"
      value={fromDate}
      onChange={(e) => setFromDate(e.target.value)}
      onClick={(e) => e.target.showPicker && e.target.showPicker()} // Show calendar UI
      style={{
        padding: '6px 10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        backgroundColor: '#fff',
        color: '#333'
      }}
    />
  </div>

  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label htmlFor="toDate" style={{ marginBottom: '5px', fontWeight: 'bold' }}>To</label>
    <input
      id="toDate"
      type="date"
      value={toDate}
      onChange={(e) => setToDate(e.target.value)}
      onClick={(e) => e.target.showPicker && e.target.showPicker()}
      style={{
        padding: '6px 10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        backgroundColor: '#fff',
        color: '#333'
      }}
    />
  </div>
</div>
          {/* Top header */}
          <DashCharts />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
