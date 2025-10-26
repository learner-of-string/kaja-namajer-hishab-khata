import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Root from "../Root";
import PrivateRouts from "./PrivateRouts";
import LoadingSpinner from "../Components/LoadingSpinner";

// Lazy load components for better performance
const NamazList = lazy(() => import("../Pages/NamazList"));
const Signin = lazy(() => import("../Pages/Signin"));

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true, // This handles the root path "/"
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <Signin />
                    </Suspense>
                ),
            },
            {
                path: "dashboard",
                element: (
                    <PrivateRouts>
                        <Suspense fallback={<LoadingSpinner />}>
                            <NamazList />
                        </Suspense>
                    </PrivateRouts>
                ),
            },
            {
                path: "sign-in",
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <Signin />
                    </Suspense>
                ),
            },
        ],
    },
]);

export default routes;
