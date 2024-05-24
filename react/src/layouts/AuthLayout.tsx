import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/useStateContext";

const AuthLayout = () => {
    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;
