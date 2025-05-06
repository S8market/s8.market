import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BankSignInForm from "../../components/forms/BankSignInForm";

import { AppContext } from "../../context/context.jsx";


const BankSignInPage = () => {
      const { serverUrl, authChecked, setAuthChecked, isAuthenticated, setIsAuthenticated } = useContext(AppContext);

    
    return (
        <div className="min-h-screen bg-[#004663] flex flex-col sm:flex-row items-stretch">

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

            <div className="w-full sm:w-[600px] flex items-center justify-center bg-white rounded-none shadow-lg px-4 sm:px-12 py-8">
                <BankSignInForm />
            </div>
        </div>
    );
};

export default BankSignInPage;