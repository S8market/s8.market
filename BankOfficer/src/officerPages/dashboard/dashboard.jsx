import DashCharts from "../../dashComponent/DashCharts/DashCharts.jsx";
import Header from "../../dashComponent/nav/header/Header";
import Sidebar from "../../dashComponent/Sidebar/Sidebar";
import "./dashboard.scss";

import { useState } from "react";

const Dashboard = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  return (
    <div className="dashboard">
      <div className="sideContainerdash">
        <Sidebar />
      </div>
      <div className="dashContainer">
        <Header />
        <div className="mainDashboard">

          {/* Enhanced Date Selector Card */}
          <div style={{
            backgroundColor: '#f9f9f9',
            borderRadius: '12px',
            padding: '20px 30px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '40px',
            marginBottom: '30px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="fromDate" style={{ fontWeight: '600', fontSize: '14px', color: '#555' }}>TO</label>
              <input
                type="date"
                id="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                style={{
                  padding: '10px',
                  fontSize: '15px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  marginTop: '8px',
                  color: '#333',
                  width: '200px'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="toDate" style={{ fontWeight: '600', fontSize: '14px', color: '#555' }}>FROM</label>
              <input
                type="date"
                id="toDate"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                style={{
                  padding: '10px',
                  fontSize: '15px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  marginTop: '8px',
                  color: '#333',
                  width: '200px'
                }}
              />
            </div>
          </div>

          <DashCharts />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
