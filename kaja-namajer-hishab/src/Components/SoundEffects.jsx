import { Howl } from "howler";

const sounds = {
    signInSuccessFull: new Howl({
        src: ["/loggedInSuccess.mp3"],
    }),
    updatedSuccessFull: new Howl({
        src: ["/updatedSuccessful.mp3"],
    }),
    signOutSuccessFull: new Howl({
        src: ["/signOutSuccess.mp3"],
    }),
};

export default sounds;
