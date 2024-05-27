import { useNavigate } from "react-router-dom";
import { UserType } from "../types/types";
import { useDeleteUser } from "../tanstackHooks/useDeleteUser";

const UsersList = ({ user }: { user: UserType }) => {
    const navigate = useNavigate();
    const { deleteUser, isDeleting } = useDeleteUser();
    const handleNavigate = () => {
        navigate(`/users/${user.id}`);
    };
    return (
        <tr key={user.id} className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b border-gray-300">{user.id}</td>
            <td className="py-2 px-4 border-b border-gray-300">{user.name}</td>
            <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
            <td className="py-2 px-4 border-b border-gray-300">
                {user.created_at}
            </td>
            <td className="py-2 px-4 border-b border-gray-300 flex items-center gap-2">
                <button
                    onClick={() => handleNavigate()}
                    className="py-1 px-2 rounded-md bg-indigo-500 text-slate-100 hover:shadow-2xl hover:bg-indigo-600 hover:text-slate-50 duration-100 transition-all "
                >
                    Edit
                </button>
                <button
                    onClick={() => deleteUser(user.id)}
                    className="py-1 px-2 rounded-md bg-red-500 text-slate-100 hover:shadow-2xl hover:bg-red-600 hover:text-slate-50 duration-100 transition-all "
                >
                    {isDeleting ? "Loading..." : "Delete"}
                </button>
            </td>
        </tr>
    );
};

export default UsersList;
