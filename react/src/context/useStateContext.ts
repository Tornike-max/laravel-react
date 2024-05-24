import { useContext } from "react";
import { StateContext } from "./ContextProvider";

export const useStateContext = () => {
    const context = useContext(StateContext);
    if (context === undefined)
        throw new Error(
            "You need to use context inside of the ContextProvider"
        );
    return context;
};
