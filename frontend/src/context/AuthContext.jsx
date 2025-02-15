import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem("prixToken");
      const userData = localStorage.getItem("prixUser");

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser({
            ...parsedUser,
            token
          });
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("prixToken");
          localStorage.removeItem("prixUser");
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("prixToken", token);
    localStorage.setItem("prixUser", JSON.stringify(userData));
    setUser({ ...userData, token });
  };

  const logout = () => {
    localStorage.removeItem("prixToken");
    localStorage.removeItem("prixUser");
    setUser(null);
  };

  if (loading) {
    return <PulseLoader color="#000000" size={8} />;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.string.isRequired
}