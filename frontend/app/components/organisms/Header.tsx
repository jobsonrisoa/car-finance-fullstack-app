'use client';

import React from 'react';
import Image from 'next/image';
import './Header.css';
import logo from '/public/listra_logo.png';

const Header: React.FC = () => (
  <header className="header">
    <div className="logo-container">
      <Image src={logo} alt="Listra Logo" layout="intrinsic" width={200} height={60} />
    </div>
  </header>
);

export default Header;
