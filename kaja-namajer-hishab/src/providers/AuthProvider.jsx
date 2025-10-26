import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import app from "../firebase/firebase.init";
import AuthContext from "../contexts/AuthContext";
import { useState, useEffect, useCallback } from "react";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [userLoading, setUserLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [initialLoad, setInitialLoad] = useState(true);
    const [totalKajaRn, setTotalKajaRn] = useState(0);

    // sign in function: মালটাকে গাড়িতে তোল
    const malTakeGariteTol = useCallback(() => {
        setUserLoading(true);
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }, []);

    // sign out function: kick out user
    const kickOutUser = useCallback(() => {
        setUserLoading(true);
        return signOut(auth);
    }, []);

    // Function to update total kaja count
    const updateTotalKajaRn = useCallback((newTotal) => {
        setTotalKajaRn(newTotal);
    }, []);

    const authInfo = {
        user,
        userLoading,
        malTakeGariteTol,
        kickOutUser,
        totalKajaRn,
        updateTotalKajaRn,
    };

    useEffect(() => {
        let timeoutId;

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            // Add minimum loading time for better UX
            if (initialLoad) {
                timeoutId = setTimeout(() => {
                    setUserLoading(false);
                    setInitialLoad(false);
                }, 1000); // Minimum 1 second loading
            } else {
                setUserLoading(false);
            }
        });

        // Fallback timeout in case Firebase takes too long
        const fallbackTimeout = setTimeout(() => {
            setUserLoading(false);
            setInitialLoad(false);
        }, 5000);

        return () => {
            unsubscribe();
            if (timeoutId) clearTimeout(timeoutId);
            clearTimeout(fallbackTimeout);
        };
    }, [initialLoad]);

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
