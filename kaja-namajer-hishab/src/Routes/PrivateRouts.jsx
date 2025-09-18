import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { PacmanLoader } from "react-spinners";
import AuthContext from "../contexts/AuthContext";

const PrivateRouts = ({ children }) => {
    const { user, userLoading } = useContext(AuthContext);

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

    if (!user) return <Navigate to="/sign-in" replace />;

    return children;
};

export default PrivateRouts;
