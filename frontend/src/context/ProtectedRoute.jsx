import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PropTypes from "prop-types";
import { PulseLoader } from "react-spinners";

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <PulseLoader color="#000000" size={8} />;;
    }

    return user ? children : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
    children: PropTypes.string.isRequired
}