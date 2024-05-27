import { useQuery } from "@tanstack/react-query";
import { getUsersApi } from "../api/api";
import { useSearchParams } from "react-router-dom";

export const useGetUsers = () => {
    const [searchParams] = useSearchParams();
    const curPage = searchParams.get("page") || "1";

    const {
        data: usersData,
        isPending: isUsersPending,
        error,
    } = useQuery({
        queryKey: ["users", `page=${curPage}`],
        queryFn: () => getUsersApi(curPage),
    });

    if (error) {
        throw new Error("Error while getting users");
    }

    return { usersData, isUsersPending };
};
