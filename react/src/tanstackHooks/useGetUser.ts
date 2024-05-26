import { useQuery } from "@tanstack/react-query";
import { useStateContext } from "../context/useStateContext";
import { getUserApi } from "../api/api";

export const useGetUser = () => {
    const { setUser } = useStateContext();
    const {
        data: userData,
        isPending,
        error,
    } = useQuery({
        queryKey: ["user"],
        queryFn: () => getUserApi(setUser),
    });

    if (error) {
        throw new Error("Error while getting user");
    }

    return { userData, isPending };
};
