import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { UserFormType, UserType } from "../types/types";
import { useEditUser } from "../tanstackHooks/useEditUser";
import { useEffect, useState } from "react";
import { getUpdateUserData } from "../api/api";
import { useAddUser } from "../tanstackHooks/useAddUser";

const UserForm = () => {
    const { register, handleSubmit, getValues } = useForm<UserFormType>();
    const { editUser, isUserEditing } = useEditUser();
    const { addUser, isUserAdding } = useAddUser();
    const [userToUpdate, setUserToUpdate] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        if (id) {
            getUpdateUserData(id)
                .then(({ data }) => {
                    setUserToUpdate(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    throw new Error("error occured");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    if (id && loading) return <p>Loading...</p>;
    const onSubmit = (data: UserFormType) => {
        if (data && id) {
            const newData = {
                name: data?.name,
                email: data?.name,
                password: data?.password,
            };
            editUser({ id, newData });
            console.log("edit", newData);

            return;
        } else {
            const newData = {
                name: data.name || userToUpdate?.name,
                email: data.email || userToUpdate?.email,
                password: data.password,
            };
            addUser(newData);
        }
    };

    return (
        <div className="max-w-[2200px] w-full h-screen flex justify-start items-center flex-col my-10">
            <div className="w-full flex justify-start items-center py-4 px-12">
                <button
                    onClick={() => navigate(-1)}
                    className="py-2 px-3 rounded-md bg-indigo-600 text-slate-100 hover:shadow-2xl hover:bg-indigo-500 hover:text-slate-50 duration-100 transition-all "
                >
                    Go Back
                </button>
            </div>
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
                    {id ? `Edit User ${userToUpdate?.name}` : "Add User"}
                </h1>

                <div className="w-full flex items-center gap-2">
                    <label className="text-slate-600 font-medium text-lg max-w-[150px] w-full">
                        Full Name
                    </label>
                    <input
                        className="w-full rounded-xl border-[1px] focus:ring-1 focus:ring-indigo-500 py-2 px-4"
                        type="text"
                        required={id ? false : true}
                        defaultValue={id && userToUpdate?.name}
                        {...register("name")}
                    />
                </div>
                <div className="w-full flex items-center gap-2">
                    <label className="text-slate-600 font-medium text-lg max-w-[150px] w-full">
                        Email
                    </label>
                    <input
                        className="w-full rounded-xl border-[1px] focus:ring-1 focus:ring-indigo-500 py-2 px-4"
                        type="text"
                        required={id ? false : true}
                        defaultValue={id && userToUpdate?.email}
                        {...register("email")}
                    />
                </div>
                <div className="w-full flex items-center gap-2">
                    <label className="text-slate-600 font-medium text-lg max-w-[150px] w-full">
                        Password
                    </label>
                    <input
                        className="w-full rounded-xl border-[1px] focus:ring-1 focus:ring-indigo-500 py-2 px-4"
                        type="password"
                        required={id ? false : true}
                        placeholder="Write your password"
                        {...register("password")}
                    />
                </div>

                {!id && (
                    <div className="w-full flex items-center gap-2 pb-4">
                        <label className="text-slate-600 font-medium text-lg max-w-[150px] w-full">
                            Confirm Password
                        </label>
                        <input
                            className="w-full rounded-xl border-[1px] focus:ring-1 focus:ring-indigo-500 py-2 px-4"
                            type="password"
                            placeholder="Confirm your password"
                            {...register("passwordConfirm", {
                                required: "This field is required",
                                validate: (value) =>
                                    getValues().password === value ||
                                    "Passwords should match",
                            })}
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="py-3 px-4 text-lg font-semibold w-full flex justify-center items-center text-slate-50 bg-indigo-500 hover:bg-indigo-600 hover:text-slate-100 rounded-lg duration-150 transition-all"
                >
                    {isUserAdding ? "Loading" : ""}
                    {isUserEditing ? "Loading..." : ""}
                    {id ? "Edit" : "Add"}
                </button>
            </motion.form>
        </div>
    );
};

export default UserForm;
