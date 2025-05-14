import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../context/context';

const OtpPopup = ({ onSuccess, onClose, email, phone }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [verificationMessage, setVerificationMessage] = useState('');
  const { serverUrl } = useContext(AppContext);

  useEffect(() => {
    console.log("OTP Popup Loaded with Email and Phone:", { email, phone });
  }, [email, phone]);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setVerificationMessage('');

    // Frontend Validation
    if (!otp || !email || !phone) {
      setError('All fields (OTP, email, and phone) are required.');
      return;
    }

    try {
      const endpoint = `${serverUrl}/api/v1/bank-user/otp-verification`;
      console.log("Sending OTP verification request with:", { otp, email, phone });

      const response = await axios.post(
        endpoint,
        { otp, email, phone },
        { withCredentials: true }
      );

      console.log("OTP Verification Response:", response.data);

      if (response.data.success) {
        setVerificationMessage('OTP verified successfully!');
        onSuccess(); // trigger parent success callback
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      console.error("OTP Verification Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || 'OTP verification failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="bg-white p-6 rounded-lg z-10 w-96">
        <h2 className="text-xl font-bold mb-2">Enter OTP</h2>
        <p className="text-sm text-gray-500 mb-4">OTP has been sent to your given Email</p>

        <form onSubmit={handleOtpSubmit}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="border border-gray-300 p-2 rounded w-full mb-4"
          />

          {error && <p className="text-red-500 mb-2">{error}</p>}
          {verificationMessage && <p className="text-green-500 mb-2">{verificationMessage}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Verify OTP
          </button>
        </form>

        <button onClick={onClose} className="mt-4 text-sm text-blue-500 hover:underline">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OtpPopup;
