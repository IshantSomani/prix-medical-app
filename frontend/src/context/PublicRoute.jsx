import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PropTypes from "prop-types";

export const PublicRoute = ({ children }) => {
    const { user } = useAuth();
    return !user ? children : <Navigate to="/home" replace />;
};

PublicRoute.propTypes = {
    children: PropTypes.string.isRequired
}