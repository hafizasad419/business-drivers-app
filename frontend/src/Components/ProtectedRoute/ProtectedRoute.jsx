import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = () => {
        const tokenFromLocalStorage = localStorage.getItem("user") || localStorage.getItem("company");
        const tokenFromCookies = Cookies.get("user") || Cookies.get("company");

        return !!(tokenFromLocalStorage || tokenFromCookies);
    };

    return (
        isAuthenticated() ? children : <Navigate to="/login" />
    );
};

export default ProtectedRoute;
