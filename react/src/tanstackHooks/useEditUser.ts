import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserFormType } from "../types/types";
import toast from "react-hot-toast";
import { editUserApi } from "../api/api";

export const useEditUser = () => {
    const queryClient = useQueryClient();

    const { mutate: editUser, isPending: isUserEditing } = useMutation({
        mutationFn: ({
            id,
            newData,
        }: {
            id: string | number;
            newData: UserFormType;
        }) => editUserApi(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User updated Successfully");
        },
        onError: () => {
            toast.error("Error while updating");
        },
    });

    return { editUser, isUserEditing };
};
