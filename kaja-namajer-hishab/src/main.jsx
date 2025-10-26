import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./Routes/Routes.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { Toaster } from "sonner";
import AppLoader from "./Components/AppLoader.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Suspense fallback={<AppLoader />}>
            <AuthProvider>
                <RouterProvider router={routes} />
            </AuthProvider>
        </Suspense>
        <Toaster richColors position="top-right" />
    </StrictMode>
);
