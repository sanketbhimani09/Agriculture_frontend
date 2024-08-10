import React from "react";
import Home from "./home";
import Footer from "./Footer";
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Home />
            <Outlet />
            <Footer />
        </>
    );
}

export default Layout;