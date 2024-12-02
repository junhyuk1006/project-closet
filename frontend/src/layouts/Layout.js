import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({ children, includeHeaderFooter = true }) => {
    return (
        <>
            {includeHeaderFooter && <Header />}
            <main>{children}</main>
            {includeHeaderFooter && <Footer />}
        </>
    );
};

export default Layout;