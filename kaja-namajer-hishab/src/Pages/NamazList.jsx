import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import sounds from "../Components/SoundEffects";
import AuthContext from "../contexts/AuthContext";
import NamazCard from "./NamazCard";

const NamazList = () => {
    const [allKaja, setAllKaja] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    const navigate = useNavigate();

    const { kickOutUser, user, totalKajaRn, updateTotalKajaRn } =
        useContext(AuthContext);

    useEffect(() => {
        if (!user?.email) {
            // Prevent API call if user email is not available
            setDataLoading(false);
            return;
        }

        setDataLoading(true);
        axios
            .get(`${import.meta.env.VITE_SERVER_URL}/namaz/missed`, {
                params: { userIdentity: user.email },
            })
            .then((res) => {
                setAllKaja(res.data.namazCounts);
                // Calculate and update total kaja count in context
                const calculatedTotal = (res.data.namazCounts || []).reduce(
                    (sum, eachKaja) => {
                        return (
                            sum +
                            (eachKaja?.regular || 0) +
                            (eachKaja?.qasr || 0)
                        );
                    },
                    0
                );
                updateTotalKajaRn(calculatedTotal);
            })
            .catch((error) => {
                console.error("Failed to fetch namaz data:", error);
                setAllKaja([]);
                toast.error("Failed to load prayer data.");
            })
            .finally(() => {
                setDataLoading(false);
            });
    }, [user, navigate, updateTotalKajaRn]);

    const signOutUser = () => {
        kickOutUser()
            .then(() => {
                sounds.signOutSuccessFull.play();
                toast.error("Signed out successfully!");
                navigate("/sign-in");
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            });
    };

    // Use totalKajaRn from context instead of calculating locally

    if (dataLoading) {
        return (
            <div className="flex flex-col gap-5 justify-center items-center flex-1 px-4 text-center mt-24">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-900"></div>
                <p className="md:text-2xl text-lg font-semibold text-gray-600">
                    Loading your prayer data...
                </p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="md:text-2xl text-center my-4 text-neutral-600">
                {user.displayName ? (
                    <>
                        You have missed{" "}
                        <span className="font-bold text-gray-800">
                            {totalKajaRn}
                        </span>{" "}
                        wakto, {user.displayName}!
                    </>
                ) : (
                    <>
                        You have missed{" "}
                        <span className="font-bold text-gray-800">
                            {totalKajaRn}
                        </span>{" "}
                        wakto!
                    </>
                )}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {allKaja.map((eachKaja) => (
                    <NamazCard
                        key={eachKaja.namazName}
                        kaja={eachKaja}
                        updateTotalKajaRn={updateTotalKajaRn}
                        allKaja={allKaja}
                    />
                ))}
            </div>
            <div className="flex justify-end mt-6">
                <button
                    onClick={signOutUser}
                    className="font-semibold text-2xl px-5 py-2.5 border-2 border-pink-900 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:bg-purple-50 md:hover:scale-115 hover:scale-110 cursor-pointer"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default NamazList;
