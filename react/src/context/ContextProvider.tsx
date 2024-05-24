import { createContext, useState } from "react";

const initialValues = {
    token: null as string | null,
    user: {},
    setToken: () => {},
    setUser: () => {},
};

type ContextTypes = {
    token: string | null;
    user: object;
    setToken: (token: string | null) => void;
    setUser: (user: object) => void;
};

export const StateContext = createContext<ContextTypes>(initialValues);

export const ContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState<string | null>(
        localStorage.getItem("ACCESS_TOKEN")
    );

    const setToken = (token: string | null) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const value: ContextTypes = {
        user,
        token,
        setUser,
        setToken,
    };

    return (
        <StateContext.Provider value={value}>{children}</StateContext.Provider>
    );
};
