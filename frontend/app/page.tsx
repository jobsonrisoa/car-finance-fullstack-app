'use client';

import React from 'react';
import MainTemplate from './components/templates/MainTemplate';
import './page.css';
import FinanceSimulationWrapper from './components/organisms/FinanceSimulationWrapper';

const Home: React.FC = () => {
  return (
    <MainTemplate>
      <div className='container'>
        <FinanceSimulationWrapper />
      </div>
    </MainTemplate>
  );
};

export default Home;
