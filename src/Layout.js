// Layout.js
import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer'
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <link href="/assets/css/bootstrap.css" rel="stylesheet" type="text/css" media="all" />
            <link href="/assets/css/style.css" rel="stylesheet" type="text/css" media="all" />
            <link href="/assets/css/mislider.css" rel="stylesheet" type="text/css" />
            <link href="/assets/css/mislider-custom.css" rel="stylesheet" type="text/css" />
            <link href="/assets/css/font-awesome.css" rel="stylesheet" />
            <script type="text/javascript" src="/assets/js/jquery-2.1.4.min.js"></script>
            <Header />
            <main>
                <Outlet /> {/* This renders the routed components */}
            </main>
            <Footer />
        </>
    );
}

export default Layout;
