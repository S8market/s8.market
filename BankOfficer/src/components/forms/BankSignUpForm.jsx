import React, { useState, useContext } from "react";
import Otp from "../../components/Otp";

import axios from "axios";
const steps = ["Personal Info", "Bank Address", "Bank Details"];
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../context/context";

const BankSignUpForm = ({ onSubmit }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        bankName: "",
        bankbranch: "",
        employeeID: "",
        designation: "",
        verificationMethod: "email"
    });
    const [error, setError] = useState("");
    const [showOtpPopup, setShowOtpPopup] = useState(false);


    const navigate = useNavigate();

    const { serverUrl, setIsAuthenticated } = useContext(AppContext);
    
    const handleOtpSuccess = () => {
        console.log("OTP verified successfully!");
        setIsAuthenticated(true);
        setShowOtpPopup(false);
        navigate("/"); 

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const {
                firstName,
                lastName,
                phone,
                email,
                password,
                address,
                city,
                state,
                pincode,
                bankName,
                bankbranch,
                employeeID,
                designation,
                verificationMethod,
            } = formData;

            const res = await axios.post(
                `${serverUrl}/api/v1/bank-user/register`,
                formData,
                { withCredentials: true } // IMPORTANT: so browser accepts the cookie
            );
            console.log(res);

            if (res.data.success) {
                setShowOtpPopup(true); // or wherever the Bank officer should go
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong");
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                        <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
                        <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
                        <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
                    </>
                );
            case 2:
                return (
                    <>
                        <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
                        <Input label="City" name="city" value={formData.city} onChange={handleChange} />
                        <Input label="State" name="state" value={formData.state} onChange={handleChange} />
                        <Input label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
                    </>
                );
            case 3:
                return (
                    <>
                        <Input label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} />
                        <Input label="Bank Branch" name="bankbranch" value={formData.bankbranch} onChange={handleChange} />
                        <Input label="Employee ID" name="employeeID" value={formData.employeeID} onChange={handleChange} />
                        <Input label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
                        {/* Togle for verificationMethod  email/ phone*/}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Verification Method</label>
                            <select
                                name="verificationMethod"
                                value={formData.verificationMethod}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            >
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
                            </select>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
        
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            <div className="flex justify-end mb-4">
                <a
                href={
                    import.meta.env.MODE === 'development'
                    ? 'http://localhost:5173/sign-up'
                    : 'http://localhost:5173/sign-up'
                }
                className="text-[#004663] underline hover:text-blue-700 transition"
                >
                User Registration <span>→</span>
                </a>
                </div>  
                <h2 className="text-2xl text-[#004663] font-bold mb-4 text-center">
                    Bank Registration
                </h2>
                
                <ProgressBar currentStep={step} setStep={setStep} />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {renderStepContent()}

                <div className="flex justify-between mt-6">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={() => setStep(prev => prev - 1)}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Back
                        </button>
                    )}
                    {step < steps.length ? (
                        <button
                            type="button"
                            onClick={() => setStep(prev => prev + 1)}
                            className="bg-[#004663] text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="bg-[#004663] text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    )}
                </div>

                <div className="text-center mt-6">
                    <span className="text-gray-600">
                        Already have an account?
                    </span>
                    <a href="/sign-in"
                        className="text-[#004663] font-semibold hover:text-sky-900"
                    > &nbsp;
                        Sign In
                    </a>
                </div>
            </form>
            {showOtpPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Otp
                        onSuccess={handleOtpSuccess}
                        onClose={() => setShowOtpPopup(false)}
                        email={formData.email}
                        phone={formData.phone}
                        verificationMethod={formData.verificationMethod}
                    />
                </div>
            )}

        </>
    );
};

const Input = ({ label, name, type = "text", value, onChange }) => (
    <div className="mb-4">
        <label className="block mb-1 font-medium">{label}*</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full border px-3 py-2 rounded"
            required
        />
    </div>
);

const ProgressBar = ({ currentStep, setStep }) => (
    <div className="flex justify-between mb-6">
        {steps.map((label, index) => {
            const isActive = currentStep === index + 1;
            const isClickable = currentStep > index + 1;

            return (
                <div
                    key={label}
                    onClick={() => isClickable && setStep(index + 1)}
                    className={`flex-1 text-center py-2 cursor-pointer border-b-2 ${isActive
                        ? "text-[#004663] border-[#004663] font-bold"
                        : isClickable
                            ? "text-gray-600 border-gray-400 hover:text-[#004663]"
                            : "text-gray-400 border-gray-300"
                        }`}
                >
                    {label} &nbsp; {">"}
                </div>
            );
        })}
    </div>
);

export default BankSignUpForm;
