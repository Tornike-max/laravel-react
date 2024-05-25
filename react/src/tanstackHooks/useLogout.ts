import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userLogoutApi } from "../api/api";
import { useStateContext } from "../context/useStateContext";

export const useLogout = () => {
    const queryClient = useQueryClient();
    const { setUser, setToken } = useStateContext();

    const { mutate: logoutUser, isPending } = useMutation({
        mutationFn: () => userLogoutApi(setUser, setToken),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Logout");
        },
        onError: () => {
            toast.error("Error while logout user");
            throw new Error("Error while logout user");
        },
    });
    return { logoutUser, isPending };
};
