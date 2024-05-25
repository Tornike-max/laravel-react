import { useQueryClient, useMutation } from "@tanstack/react-query";
import { signUpUserApi } from "../api/api";
import { SignUpType } from "../types/types";
import { useStateContext } from "../context/useStateContext";
import toast from "react-hot-toast";

export const useSignup = () => {
    const queryClient = useQueryClient();
    const { setUser, setToken } = useStateContext();

    const { mutate: signupUser, isPending } = useMutation({
        mutationFn: (data: SignUpType) =>
            signUpUserApi(data, setUser, setToken),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("User successfully registered");
        },
        onError: () => {
            toast.error("Error while register user");
            throw Error("Error occured while signup user");
        },
    });

    return { signupUser, isPending };
};
