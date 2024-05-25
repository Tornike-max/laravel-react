import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "../tanstackHooks/useLogout";
import { useStateContext } from "../context/useStateContext";

const Navigation = () => {
    const { pathname } = useLocation();
    const { token } = useStateContext();
    const navigate = useNavigate();
    const { logoutUser, isPending } = useLogout();
    const buttonStyles = `w-full font-semibold text-xl py-2 px-3 text-slates-800 bg-none border-[1px] rounded-xl hover:text-slate-700 hover:bg-slate-200  duration-150 transition-all`;

    const handleLogout = () => {
        if (token) {
            logoutUser();
            navigate("/");
        }
    };
    return (
        <div className="w-full flex flex-col items-start justify-end gap-6 px-6 py-10">
            <Link
                className={`${buttonStyles} ${
                    pathname === "/dashboard" && "text-slate-800 bg-slate-200 "
                }`}
                to="/dashboard"
            >
                Dashboard
            </Link>
            <Link
                className={`${buttonStyles} ${
                    pathname === "/users" && "text-slate-800 bg-slate-200 "
                }`}
                to="/users"
            >
                Users
            </Link>
            <button
                onClick={handleLogout}
                className={`${buttonStyles} flex justify-start items-center`}
            >
                <span>{isPending ? "Loading..." : "Logout"}</span>
            </button>
        </div>
    );
};

export default Navigation;
