import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./Routes/Routes.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={routes} />
        </AuthProvider>
        <Toaster richColors position="top-right" />
    </StrictMode>
);
