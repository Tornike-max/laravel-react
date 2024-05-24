import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
    const { pathname } = useLocation();
    return (
        <div className="w-full flex flex-col items-start justify-end gap-2 px-6 py-10">
            <Link
                className={`w-full font-semibold text-xl py-2 px-3 text-slates-800 bg-none border-[1px] rounded-xl ${
                    pathname === "/dashboard" && "text-slate-800 bg-slate-200 "
                } hover:text-slate-700 hover:bg-slate-200  duration-150 transition-all`}
                to="/dashboard"
            >
                Dashboard
            </Link>
            <Link
                className={` w-full font-semibold text-xl py-2 px-3 text-slate-800 bg-none border-[1px] rounded-xl ${
                    pathname === "/users" && "text-slate-800 bg-slate-200 "
                } hover:text-slate-700 hover:bg-slate-200 duration-150 transition-all`}
                to="/users"
            >
                Users
            </Link>
        </div>
    );
};

export default Navigation;
