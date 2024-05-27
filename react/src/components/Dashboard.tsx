import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full flex justify-center items-center">
            <button
                onClick={() => navigate("/users/new")}
                className="py-2 px-3 rounded-md bg-none border-[1px] border-indigo-500 hover:bg-indigo-500 hover:text-slate-100 duration-150 transition-all"
            >
                Create User
            </button>
        </div>
    );
};

export default Dashboard;
