import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth"

const PrivateRoute = ({ element }) => {
    const isAuthenticated = useAuth();

    if (isAuthenticated === false) {
        return <Navigate to="/auth/login" />;
    }

    return element;
};

export default PrivateRoute