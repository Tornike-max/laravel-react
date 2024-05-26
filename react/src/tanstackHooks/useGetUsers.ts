import { useQuery } from "@tanstack/react-query";
import { getUsersApi } from "../api/api";

export const useGetUsers = () => {
    const {
        data: usersData,
        isPending: isUsersPending,
        error,
    } = useQuery({
        queryKey: ["users"],
        queryFn: () => getUsersApi(),
    });

    if (error) {
        throw new Error("Error while getting users");
    }

    return { usersData, isUsersPending };
};
