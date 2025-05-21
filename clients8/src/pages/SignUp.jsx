import React, { useContext, useState } from "react";
import { FormInput } from "../components/auctionSystem/SignInUser/FormInput";
import { SocialSignInButton } from "../components/auctionSystem/SignInUser/SocialSignInButton";
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

export default function SignUpPage() {
  const [formErrors, setFormErrors] = useState({});
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const {
    userFormValues,
    setUserFormValues,
    serverUrl,
    setIsAuthenticated,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const socialButtons = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8bc5b28e34b89399a5181e0b1ad025dca906bce676746acf663a21997d16f714?placeholderIfAbsent=true&apiKey=2b64ceff962d4ae184f534c4b0acd108",
      text: "Sign up with Google",
      serverApi: `${serverUrl}/api/v1/user/auth/google`,
    },
  ];

  const handleOtpSuccess = () => {
    setShowOtpPopup(false);
    setIsAuthenticated(true);
    navigate("/");
    toast.success("Registration Successful");
  };

  const handleFormSubmit = async () => {
    try {
      console.log("Submitting form with values:", userFormValues);
      const response = await axios.post(`${serverUrl}/api/v1/user/register`, userFormValues);
      if (response.data.success) {
        setShowOtpPopup(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

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
            "Unlocking opportunities, one auction at a time - connecting dreams to destinations."
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
      <div className="w-full sm:w-[600px] flex-none bg-white shadow-lg px-4 sm:px-12 py-8">
        <div className="h-full flex flex-col">
          <div className="text-2xl font-bold text-center mb-8 text-[#004663]">
            Create Account
          </div>

          {/* Inputs */}
          <div className="space-y-6">
            {userInputs.map((input, index) => (
              <FormInput
                key={index}
                {...input}
                error={formErrors[input.name]}
              />
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-8 space-y-4">
            <button
              onClick={handleFormSubmit}
              className="w-full py-3 bg-[#004663] text-white rounded-lg font-semibold hover:bg-sky-900 transition-colors duration-200"
            >
              Sign Up
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              {/* <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div> */}
            </div>

            {/* <div className="space-y-3">
              {socialButtons.map((button, index) => (
                <SocialSignInButton key={index} {...button} />
              ))}
            </div> */}

            <div className="text-center mt-6">
              <span className="text-gray-600">Already have an account? </span>
              <button
                className="text-[#004663] font-semibold hover:underline"
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Popup */}
      {showOtpPopup && <Otp email={userFormValues.email} onSuccess={handleOtpSuccess} />}
    </div>
  );
}
