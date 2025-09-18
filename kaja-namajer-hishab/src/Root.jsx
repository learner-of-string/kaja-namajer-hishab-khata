import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import { useContext, useEffect } from "react";
import AuthContext from "./contexts/AuthContext";
import { PacmanLoader } from "react-spinners";

const Root = () => {
    const navigate = useNavigate();

    const { user, userLoading } = useContext(AuthContext);

    useEffect(() => {
        if (!userLoading) {
            if (user) navigate("/dashboard");
            else navigate("/sign-in");
        }
    }, [user, navigate, userLoading]);

    if (userLoading) {
        return (
            <div className="flex flex-col gap-5 justify-center items-center flex-1 px-4 text-center mt-24">
                <PacmanLoader
                    color="#861043"
                    size={50}
                    speedMultiplier={1.15}
                />
                <p className="md:text-5xl text-2xl font-bold">
                    We are eating your deeds
                </p>
            </div>
        );
    }

    return (
        <div className="my-10 mx-auto w-11/12">
            <Header />
            <Outlet />
        </div>
    );
};

export default Root;
