import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteUserApi } from "../api/api";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteUser, isPending: isDeleting } = useMutation({
        mutationFn: (userId: string | number) => deleteUserApi(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User Deleted");
        },
        onError: () => {
            toast.error("Error while delete user");
        },
    });

    return { deleteUser, isDeleting };
};
