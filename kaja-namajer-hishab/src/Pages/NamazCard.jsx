import { useEffect, useState } from "react";
import UpdateKajaDialog from "./UpdateKajaDialog";

const NamazCard = ({ kaja }) => {
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

    // Use optional chaining and a default empty object to prevent errors
    // if the 'kaja' prop is not what you expect.
    const namazName = kaja?.namazName || "";

    // Use a default icon if 'namazName' is not in the 'prayerIcons' map
    const icon = prayerIcons[namazName];

    // Safely capitalize the name, or use an empty string if it's undefined
    const capitalizedName = namazName
        ? namazName.charAt(0).toUpperCase() + namazName.slice(1)
        : "";

    return (
        <div className="p-5 border-2 border-zinc-100 bg-purple-50 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105">
            <div className="flex justify-between pb-9">
                <h1 className="flex gap-2 text-2xl font-semibold text-neutral-700">
                    <span>{icon}</span>
                    {capitalizedName}
                </h1>
                <span>
                    <UpdateKajaDialog
                        kajaInfo={{
                            namazName,
                            regularCount,
                            setRegularCount,
                            qasrCount,
                            setQasrCount,
                        }}
                    />
                </span>
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
    );
};

export default NamazCard;
