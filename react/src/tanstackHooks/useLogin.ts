import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginType } from "../types/types";
import { loginUserApi } from "../api/api";
import { useStateContext } from "../context/useStateContext";
import toast from "react-hot-toast";

export const useLogin = () => {
    const queryClient = useQueryClient();
    const { setUser, setToken } = useStateContext();

    const { mutate: loginUser, isPending } = useMutation({
        mutationFn: (data: LoginType) => loginUserApi(data, setUser, setToken),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("User successfully login");
        },
        onError: () => {
            toast.error("Error while login user");
            throw Error("Error occured while login user");
        },
    });

    return { loginUser, isPending };
};
