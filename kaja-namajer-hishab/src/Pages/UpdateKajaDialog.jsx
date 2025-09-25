import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import { toast } from "sonner";
import sounds from "../Components/SoundEffects";
import saving from "../assets/saving.gif";
import AuthContext from "../contexts/AuthContext";

const UpdateKajaDialog = ({ kajaInfo }) => {
    const [isQasrApplied, setIsQasrApplied] = useState(false);
    const [savingChanges, setSavingChanges] = useState(false);
    const [open, setOpen] = useState(false);
    const [regularKaja, setRegularKaja] = useState(0);
    const [currentQasr, setCurrentQasr] = useState(0);

    const { user } = useContext(AuthContext);

    const { setRegularCount, setQasrCount } = kajaInfo;

    const prayerIcons = {
        fajar: "🌅",
        johor: "☀️",
        asor: "🌤️",
        magrib: "🌅",
        esha: "🌙",
    };

    useEffect(() => {
        setIsQasrApplied(
            ["johor", "asor", "esha"].includes(kajaInfo?.namazName)
        );
        setRegularKaja(kajaInfo?.regularCount || 0);
        setCurrentQasr(kajaInfo?.qasrCount || 0);
    }, [kajaInfo?.namazName, kajaInfo]);

    const handleEditKajaHistory = () => {
        setSavingChanges(true);

        const reqBody = {
            userEmail: user.email,
            namazName: kajaInfo?.namazName,
            regular: regularKaja,
            qasr: currentQasr,
        };

        axios
            .post(`${import.meta.env.VITE_SERVER_URL}/update/namaz`, reqBody)
            .then((res) => {
                if (res.data.matchedCount > 0) {
                    sounds.updatedSuccessFull.play();
                    setOpen(false);
                    setRegularCount(regularKaja);
                    setQasrCount(currentQasr);
                    toast.success("Changes Saved Successfully!");
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setSavingChanges(false);
            });
    };

    const showSave =
        regularKaja !== (kajaInfo?.regularCount || 0) ||
        currentQasr !== (kajaInfo?.qasrCount || 0);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <button className="flex gap-0.5 items-center justify-center text-pink-900 text-xl font-medium hover:underline cursor-pointer w-full rounded-full border-2 border-pink-900 py-3 mt-4">
                        <HiPencilSquare /> <span>Update your kaja count</span>
                    </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogDescription asChild>
                        <h1 className="md:text-2xl text-center my-4 text-neutral-600 font-medium">
                            Edit kaja counts for{" "}
                            <span className="text-gray-800 font-semibold">
                                {kajaInfo?.namazName}
                            </span>
                        </h1>
                    </DialogDescription>
                    <DialogHeader>
                        <DialogTitle asChild>
                            <h1 className="uppercase text-center md:text-5xl text-2xl flex justify-center items-center gap-3 font-semibold">
                                <span>{prayerIcons[kajaInfo?.namazName]}</span>
                                <span>{kajaInfo?.namazName}</span>
                            </h1>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div>
                            <Label
                                htmlFor="regularKaja"
                                className="text-xl mb-2"
                            >
                                Regular Kaja
                            </Label>
                            <div className="flex">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="bg-white border-2 border-rose-800 text-2xl"
                                    onClick={() =>
                                        setRegularKaja(regularKaja - 1)
                                    }
                                >
                                    -
                                </Button>
                                <Input
                                    name="regularKaja"
                                    type="number"
                                    placeholder={`Enter your total regular ${kajaInfo?.namazName} kaja here`}
                                    value={regularKaja}
                                    onChange={(e) =>
                                        setRegularKaja(Number(e.target.value))
                                    }
                                />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="bg-white border-2 border-rose-800 text-2xl"
                                    onClick={() =>
                                        setRegularKaja(regularKaja + 1)
                                    }
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                        {isQasrApplied && (
                            <div>
                                <Label
                                    htmlFor="qasr"
                                    className="text-xl mb-2 mt-4"
                                >
                                    Qasr (kaja while you were in tour)
                                </Label>
                                <div className="flex">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        className="bg-white border-2 border-rose-800 text-2xl"
                                        onClick={() =>
                                            setCurrentQasr(currentQasr - 1)
                                        }
                                    >
                                        -
                                    </Button>
                                    <Input
                                        name="qasr"
                                        type="number"
                                        placeholder={`Enter your total ${kajaInfo?.namazName} kaja in tour here`}
                                        value={currentQasr}
                                        onChange={(e) =>
                                            setCurrentQasr(
                                                Number(e.target.value)
                                            )
                                        }
                                    />
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        className="bg-white border-2 border-rose-800 text-2xl"
                                        onClick={() =>
                                            setCurrentQasr(currentQasr + 1)
                                        }
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <div className="flex flex-col md:flex-row md:justify-end gap-3 w-full">
                            {/* Cancel Button */}
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    className="w-full md:w-auto"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>

                            {/* Save Changes Button */}
                            <div
                                className={`transition-all duration-300 ease-in-out transform ${
                                    showSave
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 -translate-y-6 pointer-events-none"
                                } w-full md:w-auto`}
                            >
                                <Button
                                    onClick={handleEditKajaHistory}
                                    disabled={savingChanges}
                                    className="w-full md:w-auto bg-green-500 text-white font-bold hover:bg-green-600 active:scale-95 shadow-lg transition-all duration-200"
                                >
                                    {savingChanges ? (
                                        <img
                                            src={saving}
                                            alt=""
                                            className="h-7 w-7 mx-auto"
                                        />
                                    ) : (
                                        "Save Changes"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default UpdateKajaDialog;
