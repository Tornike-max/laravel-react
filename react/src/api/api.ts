import axios from "axios";
import { LoginType, SignUpType } from "../types/types";

export const loginUserApi = async (data: LoginType) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/login", data);

        if (!response.data) {
            throw new Error("Something went wrong");
        }

        return response.data;
    } catch (error) {
        throw new Error("error while login");
    }
};

export const signUpUserApi = async (data: SignUpType) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/signup", data);

        if (!response.data) {
            throw new Error("Something went wrong");
        }

        return response.data;
    } catch (error) {
        throw new Error("error while signup");
    }
};
