import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import React from 'react';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth', // This makes the scrolling smooth
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;
