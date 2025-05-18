// components/MainLayout.js
import React from 'react';
import Navig from './Navig';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navig />
      <main style={{ paddingTop: '60px' }}>{children}</main> {/* Add spacing if nav is fixed */}
      <Footer />
    </>
  );
};

export default MainLayout;
