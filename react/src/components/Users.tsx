import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetUsers } from "../tanstackHooks/useGetUsers";
import { UserType } from "../types/types";
import UsersList from "./UsersList";

const Users = () => {
    const { usersData, isUsersPending } = useGetUsers();
    const [searchParams, setSearchParams] = useSearchParams();
    const curPage = searchParams.get("page") || "1";
    const navigate = useNavigate();

    if (isUsersPending) return <p>Loading...</p>;

    const handleChangePage = (action: string) => {
        if (action === "prev") {
            if (curPage === "1") {
                return;
            }
            const prev = Number(curPage) - 1 || curPage;
            searchParams.set("page", String(prev));
            setSearchParams(searchParams);
        }
        if (action === "next") {
            if (curPage === String(usersData.meta.last_page)) {
                return;
            }
            const next = Number(curPage) + 1 || curPage;
            searchParams.set("page", String(next));
            setSearchParams(searchParams);
        }
    };

    return (
        <div className="w-full flex justify-center items-center px-10 py-4 ">
            <div className="w-full max-w-4xl">
                <div className="w-full flex justify-end items-center py-4 ">
                    <button
                        onClick={() => navigate("/users/new")}
                        className="py-2 px-3 rounded-md bg-indigo-500 text-slate-100 hover:shadow-2xl hover:bg-indigo-600 hover:text-slate-50 duration-100 transition-all "
                    >
                        Add User
                    </button>
                </div>
                <div className="w-full overflow-x-auto shadow-md rounded-lg">
                    <table className="w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-tight">
                                    ID
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-tight">
                                    Name
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-tight">
                                    Email
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-tight">
                                    Created At
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-tight">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData?.data.map((user: UserType) => (
                                <UsersList key={user.id} user={user} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-full flex justify-end items-center gap-4 p-2">
                    <button
                        disabled={curPage === "1"}
                        onClick={() => handleChangePage("prev")}
                        className="py-2 px-3 rounded-md bg-none border-[2px] hover:bg-indigo-500 hover:text-slate-100 duration-150 transition-all"
                    >
                        Previous
                    </button>
                    <span className="text-slate-900 font-semibold text-lg">
                        {curPage}
                    </span>
                    <button
                        disabled={curPage === String(usersData.meta.last_page)}
                        onClick={() => handleChangePage("next")}
                        className="py-2 px-3 rounded-md bg-none border-[2px] hover:bg-indigo-500 hover:text-slate-100 duration-150 transition-all"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Users;
