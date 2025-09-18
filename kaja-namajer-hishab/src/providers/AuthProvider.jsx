import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import app from "../firebase/firebase.init";
import AuthContext from "../contexts/AuthContext";
import { useState } from "react";
import { useEffect } from "react";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [userLoading, setUserLoading] = useState(true);
    const [user, setUser] = useState(null);

    const googleAuthProvider = new GoogleAuthProvider();

    // sign in function: মালটাকে গাড়িতে তোল
    const malTakeGariteTol = () => {
        setUserLoading(true);
        return signInWithPopup(auth, googleAuthProvider);
    };

    // sign out function: kick out user
    const kickOutUser = () => {
        setUserLoading(true);
        return signOut(auth);
    };

    const authInfo = { user, userLoading, malTakeGariteTol, kickOutUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setUserLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
