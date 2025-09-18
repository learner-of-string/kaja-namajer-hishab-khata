import { createBrowserRouter } from "react-router-dom";
import NamazList from "../Pages/NamazList";
import Signin from "../Pages/Signin";
import Root from "../Root";
import PrivateRouts from "./PrivateRouts";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/dashboard",
                element: (
                    <PrivateRouts>
                        <NamazList />
                    </PrivateRouts>
                ),
            },
            {
                path: "/sign-in",
                element: <Signin />,
            },
        ],
    },
]);

export default routes;
