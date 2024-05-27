import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addUserApi } from "../api/api";

export const useAddUser = () => {
    const queryClient = useQueryClient();

    const { mutate: addUser, isPending: isUserAdding } = useMutation({
        mutationFn: (newData: {
            name?: string;
            email?: string;
            password: string;
        }) => addUserApi(newData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User added Successfully");
        },
        onError: () => {
            toast.error("Error while adding user");
        },
    });

    return { addUser, isUserAdding };
};
