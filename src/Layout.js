// Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Header />
            <main>

                <Outlet /> {/* This renders the routed components */}
            </main>
            <Footer />
        </>
    );
}

export default Layout;
