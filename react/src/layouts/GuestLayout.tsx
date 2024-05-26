import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/useStateContext";
import Navigation from "../ui/Navigation";
import Header from "../ui/Header";
import { useGetUser } from "../tanstackHooks/useGetUser";
import { useGetUsers } from "../tanstackHooks/useGetUsers";

const GuestLayout = () => {
    const { token } = useStateContext();

    const { userData, isPending } = useGetUser();
    const { usersData, isUsersPending } = useGetUsers();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (isPending || isUsersPending) return <p>Loading...</p>;

    console.log(userData);
    console.log(usersData);

    return (
        <div className="max-w-[2200px] w-full h-screen flex bg-slate-50">
            <aside className="max-w-[300px] w-full h-screen bg-slate-100">
                <Navigation />
            </aside>

            <div className="flex flex-col w-full">
                <header className="w-full h-[70px] flex items-center justify-center px-10 bg-slate-100">
                    <Header userData={userData} />
                </header>

                <main className="flex flex-grow justify-center items-center">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default GuestLayout;
