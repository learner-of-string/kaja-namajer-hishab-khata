import { useEffect, useState } from "react";
import UpdateKajaDialog from "./UpdateKajaDialog";

const NamazCard = ({ kaja, updateTotalKajaRn, allKaja }) => {
    const [regularCount, setRegularCount] = useState(0);
    const [qasrCount, setQasrCount] = useState(0);

    const prayerIcons = {
        fajar: "🌅",
        johor: "☀️",
        asor: "🌤️",
        magrib: "🌅",
        esha: "🌙",
    };

    useEffect(() => {
        setRegularCount(kaja?.regular);
        setQasrCount(kaja?.qasr);
    }, [kaja?.qasr, kaja?.regular]);

    // ... (rest of the helper variables remain the same)
    const namazName = kaja?.namazName || "";
    const icon = prayerIcons[namazName];
    const capitalizedName = namazName
        ? namazName.charAt(0).toUpperCase() + namazName.slice(1)
        : "";

    return (
        <div className="p-5 border-2 border-zinc-100 bg-purple-50 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col justify-between h-full">
            <div className="gap-5 flex flex-col">
                <div className="flex justify-start">
                    <h1 className="flex gap-2 text-2xl font-semibold text-neutral-700">
                        <span>{icon}</span>
                        {capitalizedName}
                    </h1>
                </div>
                <div className="space-y-3.5">
                    <p className="font-medium text-xl flex justify-between text-neutral-700">
                        Regular
                        <span className="font-semibold px-3 py-1 bg-pink-900 text-white rounded-full">
                            {regularCount} Wakto
                        </span>
                    </p>
                    {qasrCount > 0 && (
                        <p className="font-medium flex text-xl text-neutral-600 justify-between">
                            Qasr
                            <span className="font-semibold px-3 py-0.5 border-2 border-pink-900 rounded-full">
                                {qasrCount} Wakto
                            </span>
                        </p>
                    )}
                </div>
            </div>
            <div className="mt-5 pt-3 border-t">
                <span>
                    <UpdateKajaDialog
                        kajaInfo={{
                            namazName,
                            regularCount,
                            setRegularCount,
                            qasrCount,
                            setQasrCount,
                            updateTotalKajaRn,
                            allKaja,
                        }}
                    />
                </span>
            </div>
        </div>
    );
};

export default NamazCard;
