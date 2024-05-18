'use client';

import React from 'react';
import './InstallmentOptionCard.css';

type InstallmentOptionCardProps = {
  term: string;
  amount: number;
};

const InstallmentOptionCard: React.FC<InstallmentOptionCardProps> = ({ term, amount }) => (
  <div className="installment-option-card">
    <h3>{term}</h3>
    <p>R$ {amount.toFixed(2)}</p>
  </div>
);

export default InstallmentOptionCard;
