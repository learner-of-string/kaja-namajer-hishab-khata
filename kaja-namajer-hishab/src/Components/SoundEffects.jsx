import { Howl } from "howler";

// Lazy load sound effects to improve initial page load
let sounds = null;

const initializeSounds = () => {
    if (sounds) return sounds;

    sounds = {
        signInSuccessFull: new Howl({
            src: ["/loggedInSuccess.mp3"],
            preload: false, // Don't preload audio
        }),
        updatedSuccessFull: new Howl({
            src: ["/updatedSuccessful.mp3"],
            preload: false,
        }),
        signOutSuccessFull: new Howl({
            src: ["/signOutSuccess.mp3"],
            preload: false,
        }),
    };

    return sounds;
};

// Export a function that initializes sounds when needed
export const getSounds = () => {
    return initializeSounds();
};

// For backward compatibility, export a default that initializes sounds
const soundsProxy = new Proxy(
    {},
    {
        get(target, prop) {
            const soundObj = initializeSounds();
            return soundObj[prop];
        },
    }
);

export default soundsProxy;
