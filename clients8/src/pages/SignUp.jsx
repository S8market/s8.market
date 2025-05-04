import React, { useContext, useState } from "react";
import { FormInput } from "../components/auctionSystem/SignInUser/FormInput";
import { SocialSignInButton } from "../components/auctionSystem/SignInUser/SocialSignInButton";
import UserSignInForm from "../components/forms/UserSignInForm";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/context";
import axios from "axios";
import Otp from "../components/Otp";
import { toast } from "react-toastify";

const userInputs = [
  { label: "Name", name: "name", placeholder: "Enter your Full Name here", type: "text" },
  { label: "Email", name: "email", placeholder: "Enter your Email here", type: "email" },
  { label: "Phone", name: "phone", placeholder: "Enter your Phone Number", type: "tel" },
  { label: "Password", name: "password", placeholder: "Enter your Password", type: "password" },
];

const bankOfficerSteps = [
  {
    title: "Personal Information",
    inputs: [
      { label: "First Name", name: "firstName", placeholder: "Enter your First Name here", type: "text" },
      { label: "Last Name", name: "lastName", placeholder: "Enter your Last Name here", type: "text" },
      { label: "Email", name: "email", placeholder: "Enter your Email here", type: "email" },
      { label: "Password", name: "password", placeholder: "Create your Password", type: "password" },
      { label: "Phone", name: "phone", placeholder: "Enter your Phone Number", type: "tel" },
    ],
  },
  {
    title: "Bank Address",
    inputs: [
      { label: "Address", name: "address", placeholder: "Enter your Address", type: "text" },
      { label: "City", name: "city", placeholder: "Enter your City", type: "text" },
      { label: "State", name: "state", placeholder: "Enter your State", type: "text" },
      { label: "Pincode", name: "pincode", placeholder: "Enter your Pincode", type: "text" },
    ],
  },
  {
    title: "Bank Details",
    inputs: [
      { label: "Bank Name", name: "bankName", placeholder: "Enter Bank Name" },
      { label: "Bank Branch", name: "bankBranch", placeholder: "Enter your Bank Branch" },
      { label: "Employee ID", name: "employeeID", placeholder: "Enter your Employee ID" },
      { label: "Designation", name: "designation", placeholder: "Enter your Position" },
    ],
  },
];

const signInInputs = [
  { label: "Email", name: "email", placeholder: "Enter your Email here", type: "email" },
  { label: "Password", name: "password", placeholder: "Enter your Password", type: "password" },
];

export default function SignUpPage() {
  const [userType, setUserType] = useState("User");
  const [currentStep, setCurrentStep] = useState(0);
  const [isSignIn, setIsSignIn] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const {
    bankOfficerFormValues,
    setBankOfficerFormValues,
    userFormValues,
    setUserFormValues,
    serverUrl,
    isAuthenticated,
    setIsAuthenticated,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const socialButtons = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8bc5b28e34b89399a5181e0b1ad025dca906bce676746acf663a21997d16f714?placeholderIfAbsent=true&apiKey=2b64ceff962d4ae184f534c4b0acd108",
      text: "Sign in with Google",
      serverApi: `${serverUrl}/api/v1/user/auth/google`,
    },
  ];

  const getRedirectUrl = () => {
    const env = import.meta.env.MODE;
    return env === "development"
      ? import.meta.env.VITE_BANKSIDE_URL_DEV
      : import.meta.env.VITE_BANKSIDE_URL;
  };

  const validateCurrentStep = () => {
    const currentInputs = bankOfficerSteps[currentStep].inputs;
    const errors = {};
    let isValid = true;

    currentInputs.forEach((input) => {
      const key = input.name;
      const value = bankOfficerFormValues[key];

      if (!value || value.trim() === "") {
        errors[key] = `${input.label} is required`;
        isValid = false;
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  const handleOtpSuccess = () => {
    setShowOtpPopup(false);
    if (userType === "User") {
      setIsAuthenticated(true);
      navigate("/");
      toast.success("Login Successfully");
    } else {
      window.location.href = import.meta.env.VITE_BANKSIDE_URL;
    }
  };

  const handleFormSubmit = async () => {
    try {
      let endpoint, formData;

      if (isSignIn) {
        endpoint = userType === "User"
          ? `${serverUrl}/api/v1/user/login`
          : `${serverUrl}/api/v1/bank-user/login`;

        formData = userType === "User"
          ? { email: userFormValues.email, password: userFormValues.password }
          : { email: bankOfficerFormValues.email, password: bankOfficerFormValues.password };

        const response = await axios.post(endpoint, formData, { withCredentials: true });

        if (response.data.success) {
          toast.success("Login Successfully");
          if (userType === "User") {
            setIsAuthenticated(true);
            navigate("/");
          } else {
            if (import.meta.env.MODE === 'development') {
              window.location.href = import.meta.env.VITE_BANKSIDE_URL_DEV;
            } else {
              window.location.href = import.meta.env.VITE_BANKSIDE_URL;
            }
          }
        } else {
          toast.error(response.data.message);
        }
      } else {
        formData = userType === "User"
          ? userFormValues
          : {
              ...bankOfficerFormValues,
              firstName: bankOfficerFormValues.firstName,
              lastName: bankOfficerFormValues.lastName,
            };

        endpoint = userType === "User"
          ? `${serverUrl}/api/v1/user/register`
          : `${serverUrl}/api/v1/bank-user/register`;

        const response = await axios.post(endpoint, formData);

        if (response.data.success) {
          setShowOtpPopup(true);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    if (!validateCurrentStep()) return;

    if (currentStep < bankOfficerSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFormSubmit();
    }
  };

  const formInputs = isSignIn
    ? signInInputs
    : userType === "User"
    ? userInputs
    : bankOfficerSteps[currentStep].inputs;

  return (
    <div className="min-h-screen bg-[#004663] flex flex-col sm:flex-row items-stretch">
      {/* Left Section */}
      <div className="relative grow hidden sm:block">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3eba43b41f3c96cf576db0e088a6e68fedebd78e43d484259601eaedbe093a02?placeholderIfAbsent=true&apiKey=a758ebeaca3540fcaac54d04196cb9ec"
          alt="Auction"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-20 left-10 text-white z-10">
          <div className="text-5xl font-bold mb-4">s8</div>
          <div className="text-lg max-w-md leading-relaxed">
            "Unlocking opportunities, one auction at a time - connecting dreams
            to destinations."
          </div>
          <div className="flex gap-2 mt-6">
            <div className="w-2 h-2 bg-white rounded-full" />
            <div className="w-2 h-2 bg-white/50 rounded-full" />
            <div className="w-2 h-2 bg-white/50 rounded-full" />
            <div className="w-2 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full sm:w-[600px] flex-none bg-white rounded-none sm:rounded-l-3xl shadow-lg px-4 sm:px-12 py-8">
        <div className="h-full flex flex-col">
          <div className="text-2xl font-bold text-center mb-8 text-[#004663]">
            {isSignIn ? "Sign In" : "Create Account"}
          </div>

          {/* User Type Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            {["User", "Bank Officer"].map((type) => (
              <button
                key={type}
                onClick={() => handleUserTypeChange(type)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  userType === type
                    ? "bg-[#004663] text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Step Indicators */}
          {!isSignIn && userType === "Bank Officer" && (
            <div className="flex justify-between mb-8">
              {bankOfficerSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      index <= currentStep
                        ? "bg-[#004663] text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="text-xs mt-1">{step.title}</div>
                </div>
              ))}
            </div>
          )}

          {/* Inputs */}
          <div className="space-y-6">
            {formInputs.map((input, index) => (
              <FormInput
                key={index}
                {...input}
                isBankOfficer={userType === "Bank Officer"}
                error={formErrors[input.name]}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-8 space-y-4">
            <button
              onClick={
                isSignIn
                  ? handleFormSubmit
                  : userType === "Bank Officer"
                  ? handleNextStep
                  : handleFormSubmit
              }
              className="w-full py-3 bg-[#004663] text-white rounded-lg font-semibold hover:bg-sky-900 transition-colors duration-200"
            >
              {isSignIn
                ? "Sign In"
                : userType === "Bank Officer"
                ? currentStep === bankOfficerSteps.length - 1
                  ? "Complete Registration"
                  : "Next Step"
                : "Sign Up"}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {socialButtons.map((button, index) => (
                <SocialSignInButton key={index} {...button} />
              ))}
            </div>

            <div className="text-center mt-6">
              <span className="text-gray-600">
                {isSignIn ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                onClick={() => setIsSignIn(!isSignIn)}
                className="text-[#004663] font-semibold hover:text-sky-900"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Popup */}
      {showOtpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Otp
            onSuccess={handleOtpSuccess}
            onClose={() => setShowOtpPopup(false)}
            email={
              userType === "Bank Officer"
                ? bankOfficerFormValues.email
                : userFormValues.email
            }
            phone={
              userType === "Bank Officer"
                ? bankOfficerFormValues.phone
                : userFormValues.phone
            }
            userType={userType}
          />
        </div>
      )}
    </div>
  );
}
