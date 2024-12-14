import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUser } from '../api/auth/UserContext';

const Layout = ({ children, includeHeaderFooter = true }) => {
  const { user } = useUser();

  return (
    <>
      {includeHeaderFooter && <Header user={user} />}
      <main>{children}</main>
      {includeHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
