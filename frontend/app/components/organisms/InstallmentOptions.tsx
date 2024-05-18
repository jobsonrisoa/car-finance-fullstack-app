'use client';

import React from 'react';

import './InstallmentOptions.css';
import InstallmentOptionCard from '../molecules/InstallmentOptionCard';

type InstallmentOptionsProps = {
  installments: {
    '48': number;
    '12': number;
    '6': number;
  };
};

const InstallmentOptions: React.FC<InstallmentOptionsProps> = ({ installments }) => (
  <div className="installment-options">
    <div className="installment-options-upper">
      <InstallmentOptionCard term="48x" amount={installments['48']} />
    </div>
    <div className="installment-options-lower">
      <InstallmentOptionCard term="12x" amount={installments['12']} />
      <InstallmentOptionCard term="6x" amount={installments['6']} />
    </div>
  </div>
);

export default InstallmentOptions;
