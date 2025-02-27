import React, { useState, useEffect } from "react";
import Header from "./Header";
import HeaderMobile from "./HeaderMobile";
import Footer from "./Footer";

import { Outlet } from "react-router-dom";

const Layout = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {isMobile ? <HeaderMobile /> : <Header />}
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
