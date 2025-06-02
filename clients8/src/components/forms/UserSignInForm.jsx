import React, { useState, useContext } from "react";
import { AppContext } from "../../context/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserSignInForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotMessage, setForgotMessage] = useState("");

    const { serverUrl, setIsAuthenticated } = useContext(AppContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleForgotEmailChange = (e) => {
        setForgotEmail(e.target.value);
    };

    const validateForm = () => {
        const { email, password } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return "Please enter a valid email address.";
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
        if (!passwordRegex.test(password)) {
            return "Password must include uppercase, lowercase, number, and special character.";
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setForgotMessage("");
        setLoading(true);

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            setLoading(false);
            return;
        }

        try {
            const { email, password } = formData;

            const res = await axios.post(
                `${serverUrl}/api/v1/user/login`,
                { email, password },
                { withCredentials: true }
            );

            if (res.data.success) {
                setIsAuthenticated(true);
                navigate("/properties");
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setForgotMessage("");
        setLoading(true);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(forgotEmail)) {
            setError("Please enter a valid email address.");
            setLoading(false);
            return;
        }

        try {
            await axios.post(`${serverUrl}/api/v1/user/forgot-password`, { email: forgotEmail });
            setForgotMessage("If your email is registered, a reset link has been sent.");
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to send reset link");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={forgotPasswordMode ? handleForgotPasswordSubmit : handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto"
        >
            <div className="flex justify-end mb-4">
                <a


                    href={
                        `${import.meta.env.VITE_BANK_URL}/sign-in`
                        // import.meta.env.MODE === "development"
                        //     ? `${import.meta.env.VITE_BANK_URL_DEV}/sign-in`
                        //     : `${import.meta.env.VITE_BANK_URL}/sign-in`
                    }
                    className="text-[#004663] underline hover:text-blue-700 transition"
                >
                    Bank LogIn <span>→</span>
                </a>
            </div>

            <h2 className="text-2xl text-[#004663] font-bold mb-4 text-center">
                {forgotPasswordMode ? "Reset Password" : "User Sign In"}
            </h2>

            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            {forgotMessage && <p className="text-green-500 text-sm mb-4 text-center">{forgotMessage}</p>}

            {!forgotPasswordMode && (
                <>
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
                </>
            )}

            {forgotPasswordMode && (
                <div className="mb-4">
                    <label htmlFor="forgotEmail" className="block font-medium mb-1">Enter your email</label>
                    <input
                        type="email"
                        name="forgotEmail"
                        id="forgotEmail"
                        className="w-full border px-3 py-2 rounded"
                        value={forgotEmail}
                        onChange={handleForgotEmailChange}
                        required
                    />
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded text-white shadow-lg ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#004663] hover:bg-blue-700"
                } transition`}
            >
                {loading ? "Please wait..." : forgotPasswordMode ? "Send Reset Link" : "Sign In"}
            </button>

            {!forgotPasswordMode && (
                <div className="text-right mt-2">
                    {/* <button
                        type="button"
                        onClick={() => {
                            setForgotPasswordMode(true);
                            setError("");
                            setForgotMessage("");
                            setForgotEmail("");
                        }}
                        className="text-blue-600 underline text-sm hover:text-blue-800"
                    >
                        Forgot Password?
                    </button> */}
                </div>
            )}

            {!forgotPasswordMode && (
                <div className="text-center mt-6">
                    <span className="text-gray-600">Don't have an account?</span>
                    <a href="/sign-up" className="text-[#004663] font-semibold hover:text-sky-900">
                        &nbsp;Sign Up
                    </a>
                </div>
            )}

            {forgotPasswordMode && (
                <div className="text-center mt-4">
                    <button
                        type="button"
                        onClick={() => {
                            setForgotPasswordMode(false);
                            setError("");
                            setForgotMessage("");
                        }}
                        className="text-gray-600 underline text-sm hover:text-gray-900"
                    >
                        Back to Sign In
                    </button>
                </div>
            )}
        </form>
    );
};

export default UserSignInForm;
