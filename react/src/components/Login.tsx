import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoginType } from "../types/types";
import { useLogin } from "../tanstackHooks/useLogin";

const Login = () => {
    const { register, handleSubmit, reset } = useForm<LoginType>();
    const { loginUser, isPending } = useLogin();

    const onSubmit = (data: LoginType) => {
        if (!data.email || !data.password) {
            return;
        } else {
            console.log(data);
            loginUser(data);
            reset();
        }
    };
    return (
        <div className="max-w-[2200px] w-full h-screen flex justify-center items-center">
            <motion.form
                variants={{
                    hidden: { opacity: 0, y: 55 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
                transition={{
                    duration: 0.2,
                    delay: 0.2,
                }}
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-[600px] w-full flex justify-center gap-4 items-center flex-col rounded-lg px-8 py-6 border-[1px] bg-slate-100"
            >
                <h1 className="text-2xl lg:text-3xl font-bold text-indigo-500 pb-4">
                    Login User
                </h1>
                <div className="w-full flex items-center gap-2">
                    <label className="text-slate-600 font-medium text-lg max-w-[100px] w-full">
                        Email
                    </label>
                    <input
                        className="w-full rounded-xl border-[1px] focus:ring-1 focus:ring-indigo-500 py-2 px-4"
                        type="text"
                        placeholder="Write your email"
                        {...register("email", {
                            required: "This Field Is Required",
                        })}
                    />
                </div>
                <div className="w-full flex items-center gap-2 pb-4">
                    <label className="text-slate-600 font-medium text-lg max-w-[100px] w-full">
                        Password
                    </label>
                    <input
                        className="w-full rounded-xl border-[1px] focus:ring-1 focus:ring-indigo-500 py-2 px-4"
                        type="password"
                        placeholder="Write your password"
                        {...register("password", {
                            required: "This Field Is Required",
                        })}
                    />
                </div>

                <button
                    type="submit"
                    className="py-3 px-4 text-lg font-semibold w-full flex justify-center items-center text-slate-50 bg-indigo-500 hover:bg-indigo-600 hover:text-slate-100 rounded-lg duration-150 transition-all"
                >
                    {isPending ? "Loading..." : "Login"}
                </button>
                <Link
                    className="text-slate-700 font-semibold w-full flex justify-end items-center hover:text-slate-900 duration-150 transition-all"
                    to="/signup"
                >
                    You don't have an account ?
                </Link>
            </motion.form>
        </div>
    );
};

export default Login;
