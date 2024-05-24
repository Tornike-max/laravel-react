import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginType } from "../types/types";
import { loginUserApi } from "../api/api";

export const useLogin = () => {
    const queryClient = useQueryClient();

    const { mutate: loginUser, isPending } = useMutation({
        mutationFn: (data: LoginType) => loginUserApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            alert("Login Successfully");
        },
        onError: () => {
            throw Error("Error occured while login user");
        },
    });

    return { loginUser, isPending };
};
