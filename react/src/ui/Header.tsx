import { UserType } from "../types/types";

const Header = ({ userData }: { userData: UserType }) => {
    return (
        <div className="w-full flex justify-between items-center my-8">
            <button className="font-bold py-2 px-3 text-2xl text-slate-100 bg-indigo-600 rounded-xl border-[1px] hover:shadow-2xl">
                Header
            </button>
            <button className="font-bold py-2 px-3 text-2xl text-indigo-500 bg-none hover:bg-indigo-600 hover:text-slate-100 hover:rounded-xl duration-150 transition-all">
                Welcome {userData.name}
            </button>
        </div>
    );
};

export default Header;
