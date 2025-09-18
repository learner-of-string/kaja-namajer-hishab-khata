import axios from "axios";
import { useContext } from "react";
import { HiSparkles } from "react-icons/hi";
import { HiMiniSparkles } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import googleIcon from "../assets/google_icon.svg";
import AuthContext from "../contexts/AuthContext";
import sounds from "../Components/SoundEffects";

const Signin = () => {
    const { malTakeGariteTol } = useContext(AuthContext);

    const navigate = useNavigate();

    const singIn = () => {
        malTakeGariteTol()
            .then((res) => {
                if (res.user) {
                    axios
                        .post(
                            `${import.meta.env.VITE_SERVER_URL}/user/initiate`,
                            {
                                userEmail: res.user.email,
                                namazCounts: [
                                    {
                                        namazName: "fajar",
                                        regular: 0,
                                        qasr: 0,
                                    },
                                    {
                                        namazName: "johor",
                                        regular: 0,
                                        qasr: 0,
                                    },
                                    {
                                        namazName: "asor",
                                        regular: 0,
                                        qasr: 0,
                                    },
                                    {
                                        namazName: "magrib",
                                        regular: 0,
                                        qasr: 0,
                                    },
                                    {
                                        namazName: "esha",
                                        regular: 0,
                                        qasr: 0,
                                    },
                                ],
                            }
                        )
                        .then((res) => {
                            if (res.data.insertedId) {
                                toast.success("Signed in successfully!");
                                navigate("/dashboard");
                                sounds.signInSuccessFull.play();
                            }

                            if (res.data.message === `User Already exists`) {
                                sounds.signInSuccessFull.play();
                                toast.info("Welcome Back!");
                                navigate("/dashboard");
                            }
                        });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="bg-purple-50 max-w-sm p-6 rounded-2xl mx-auto my-5 space-y-3">
            <h1 className="text-4xl font-bold text-pink-900 text-center flex gap-2 justify-center items-center">
                <HiSparkles className="text-amber-500 animate-pulse" />
                Sign in
                <HiMiniSparkles className="text-amber-500 animate-pulse" />
            </h1>
            <p className="text-center text-xl">
                Please sign in with your Google account to continue
            </p>
            <div className="flex justify-center">
                <button
                    onClick={singIn}
                    className="group px-4 py-2.5 flex gap-2 items-center justify-center text-xl font-semibold border-2 border-pink-900 rounded-full bg-white hover:bg-[] transition-all duration-300 cursor-pointer overflow-hidden"
                >
                    <img
                        src={googleIcon}
                        alt="google icon"
                        className="size-7 -ml-10 opacity-0 transform transition-all duration-500 group-hover:ml-0 group-hover:opacity-100"
                    />
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default Signin;
