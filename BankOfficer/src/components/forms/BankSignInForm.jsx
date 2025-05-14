import React, { useState, useContext } from "react";
import { AppContext } from "../../context/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BankSignInForm = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const { serverUrl, setIsAuthenticated } = useContext(AppContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const { email, password } = formData;


        if (!email.includes("@") || !email.endsWith(".com")) {
            return "Email must contain '@' and end with '.com'";
        }


        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
        if (!passwordRegex.test(password)) {
            return "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character";
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const { email, password } = formData;

            const res = await axios.post(
                `${serverUrl}/api/v1/bank-user/login`,
                { email, password },
                { withCredentials: true }
            );

            if (res.data.success) {
                setIsAuthenticated(true);
                navigate("/");
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto"
        >
            <div className="flex justify-end mb-4">
                <a
                    href={
                        import.meta.env.MODE === 'development'
                            ? `${import.meta.env.VITE_CLIENT_URL_DEV}/sign-in`
                            : `${import.meta.env.VITE_CLIENT_URL}/sign-in`
                    }
                    className="text-[#004663] underline hover:text-blue-700 transition"
                >
                    User LogIn <span>→</span>
                </a>
            </div>

            <h2 className="text-2xl text-[#004663] font-bold mb-4 text-center">Bank Sign In</h2>
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

            <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full border px-3 py-2 rounded"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-1">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="w-full border px-3 py-2 rounded"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <button
                type="submit"
                className="bg-[#004663] text-white shadow-lg w-full py-2 rounded hover:bg-blue-700 transition"
            >
                Sign In
            </button>

            <div className="text-center mt-6">
                <span className="text-gray-600">Don't have an account?</span>
                <a href="/sign-up" className="text-[#004663] font-semibold hover:text-sky-900">
                    &nbsp;Sign Up
                </a>
            </div>
        </form>
    );
};

export default BankSignInForm;
