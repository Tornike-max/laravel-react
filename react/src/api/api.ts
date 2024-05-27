import axios from "axios";
import { LoginType, SignUpType, UserFormType } from "../types/types";
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

export const getUserApi = async (setUser: (user: object) => void) => {
    try {
        const response = await axiosClient.get("/api/user");

        if (!response.data) {
            throw new Error("Error while getting user");
        }
        const userData = response.data;
        if (userData) {
            setUser(userData.user);
            return userData;
        }
        return {};
    } catch (error) {
        throw Error("Error Occured");
    }
};

export const getUsersApi = async (page: string) => {
    try {
        const response = await axiosClient.get(`/api/users?page=${page}`);

        if (!response.data) {
            throw new Error("Error while getting users");
        }
        const userData = response.data;
        if (userData) {
            return userData;
        }
        return {};
    } catch (error) {
        throw Error("Error Occured");
    }
};

export const deleteUserApi = async (userId: string | number) => {
    try {
        await axiosClient.delete(`/api/users/${userId}`);
    } catch (error) {
        throw Error("Error Occured");
    }
};

export const editUserApi = async (id: string | number, data: UserFormType) => {
    try {
        const response = await axios.put(`/api/users/${id}`, data);
        if (!response.data) {
            throw new Error("Error while updating user");
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const addUserApi = async (newData: {
    name?: string;
    email?: string;
    password: string;
}) => {
    try {
        console.log(newData);
        const response = await axios.post(`/api/users`, newData);
        if (!response.data) {
            throw new Error("Error while adding user");
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getUpdateUserData = async (id: string | number) => {
    try {
        const user = await axiosClient.get(`/api/users/${id}`);
        if (!user.data) {
            throw new Error("Error while updating user");
        }

        return user.data;
    } catch (error) {
        console.log(error);
    }
};
