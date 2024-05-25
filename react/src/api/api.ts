import { LoginType, SignUpType } from "../types/types";
import axiosClient from "./axios-client";

export const loginUserApi = async (
    data: LoginType,
    setUser: (user: object) => void,
    setToken: (token: string | null) => void
) => {
    try {
        const response = await axiosClient.post("/api/login", data);

        if (!response.data) {
            throw new Error("Something went wrong");
        }
        const userData = response.data;

        if (userData) {
            setUser(userData.user);
            setToken(userData.token);
        }

        return response.data;
    } catch (error) {
        throw new Error("error while login");
    }
};

export const signUpUserApi = async (
    data: SignUpType,
    setUser: (user: object) => void,
    setToken: (token: string | null) => void
) => {
    try {
        const response = await axiosClient.post("/api/signup", data);

        if (!response.data) {
            throw new Error("Something went wrong");
        }

        const userData = response.data;
        if (userData) {
            setUser(userData.user);
            setToken(userData.token);
        }
        return userData;
    } catch (error) {
        throw new Error("error while signup");
    }
};

export const userLogoutApi = async (
    setUser: (user: object) => void,
    setToken: (token: string | null) => void
) => {
    try {
        const response = await axiosClient.post("/api/logout");

        if (response.status >= 400 && response.status < 600) {
            throw new Error(
                `Status code:${response.status}. Error while logout user`
            );
        }

        setUser({});
        setToken(null);

        return response.data;
    } catch (error) {
        throw new Error("Error while logout");
    }
};
