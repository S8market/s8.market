import React from 'react';

const Spinner = () => (
  <div style={{ textAlign: 'center', padding: '20px' }}>
    <div className="loader" style={{
      border: "8px solid #f3f3f3",
      borderTop: "8px solid #3498db",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      animation: "spin 1s linear infinite"
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
    <div>Checking authentication...</div>
  </div>
);

export default Spinner;