import { FaMosque } from "react-icons/fa6";

const Header = () => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <FaMosque className="text-orange-500 md:text-7xl text-4xl text-center" />
            <h1 className="md:text-5xl text-4xl text-center font-bold font-nunito">
                Kaja Namaz Volume
            </h1>
        </div>
    );
};

export default Header;
