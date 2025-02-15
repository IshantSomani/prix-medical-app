import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem("prixToken");
    const decode = jwtDecode(token);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md sticky w-full z-10 top-0 p-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center md:justify-between items-center flex-wrap min-h-16 pr-3 ">
                    <div className="flex justify-center items-center py-1 ">
                        <Link
                            to="/home"
                            className="flex-shrink-0 flex items-center"
                        >
                            <span className="text-2xl font-bold text-[#2A5C82]">
                                PRIX
                            </span>
                            <span className="ml-2 text-[#5CB8B2] text-lg">
                                Medical Portal
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-1 flex-wrap justify-center">
                        {user && (
                            <>
                                {decode.role === 'admin' && (
                                    <Link
                                        to="/admin/users"
                                        className="px-2 py-2 text-[#2A5C82] hover:bg-[#f0f4f7] rounded-lg transition-colors"
                                    >
                                        Manage Users
                                    </Link>
                                )}

                                <div className="ml-2 relative">
                                    <button className="flex items-center text-sm font-medium text-[#2A5C82] hover:text-[#1E4159] focus:outline-none">
                                        <div className="w-8 h-8 rounded-full bg-[#5CB8B2] flex items-center justify-center text-white">
                                            {decode.email[0].toUpperCase()}
                                        </div>
                                    </button>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="ml-4 px-4 py-2 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#e55a5a] transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;