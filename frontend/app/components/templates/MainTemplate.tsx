'use client';

import React from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import './MainTemplate.css';

type MainTemplateProps = {
  children: React.ReactNode;
};

const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => (
  <div className="template">
    <Header />
    <main className="main">{children}</main>
    <Footer />
  </div>
);

export default MainTemplate;
