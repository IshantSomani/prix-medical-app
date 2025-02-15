import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string().required("Password is required")
        }),
        onSubmit: async (values) => {
            try {
                setLoading(true);
                setError("");

                const response = await axios.post(`${import.meta.env.VITE_API_URI}/auth/login`, values);

                const { token } = response.data;
                const { role: userData } = response.data.data;

                login(userData, token);
                navigate("/home");
            } catch (err) {
                setError(err.response?.data?.message || "Login failed. Please try again.");
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f5f9fd] to-[#e3f2fa] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-[#2A5C82]">PRIX</h1>
                    <p className="text-[#5CB8B2] mt-2">Medical Professionals Portal</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            className={`w-full px-4 py-3 rounded-lg border ${formik.touched.email && formik.errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                                } focus:outline-none focus:ring-2 focus:ring-[#5CB8B2]`}
                            placeholder="doctor@example.com"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className={`w-full px-4 py-3 rounded-lg border ${formik.touched.password && formik.errors.password
                                ? "border-red-500"
                                : "border-gray-300"
                                } focus:outline-none focus:ring-2 focus:ring-[#5CB8B2]`}
                            placeholder="••••••••"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#2A5C82] text-white py-3 px-4 rounded-lg font-semibold
                      hover:bg-[#1E4159] transition-colors duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <PulseLoader color="#ffffff" size={8} />
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="text-[#5CB8B2] hover:underline">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;