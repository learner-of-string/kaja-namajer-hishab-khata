import { Outlet } from "react-router-dom";
import Header from "./Components/Header";

const Root = () => {
    return (
        <div className="my-10 mx-auto w-11/12">
            <Header />
            <Outlet />
        </div>
    );
};

export default Root;
