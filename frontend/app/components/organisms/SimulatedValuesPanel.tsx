'use client';

import React from 'react';
import './SimulatedValuesPanel.css';
import { FaWhatsapp } from 'react-icons/fa';

type SimulatedValuesPanelProps = {
  installments: { [key: string]: number };
};

const formatInstallmentValue = (value: number): string => {
  return `R$ ${Math.round(value).toLocaleString('pt-BR')}`;
};

const SimulatedValuesPanel: React.FC<SimulatedValuesPanelProps> = ({ installments }) => (
  <div className="simulated-values-panel">
    <h2 className="title">Valores simulados para você</h2>
    <div className="installments-container">
      <div className="installment-card highlight">
        <div className="installment-label">6X</div>
        <div className="installment-value">{formatInstallmentValue(installments['6'])}</div>
        <div className="badge">IPVA GRÁTIS</div>
      </div>
      <div className="installment-card">
        <div className="installment-label">12X</div>
        <div className="installment-value">{formatInstallmentValue(installments['12'])}</div>
      </div>
      <div className="installment-card">
        <div className="installment-label">48X</div>
        <div className="installment-value">{formatInstallmentValue(installments['48'])}</div>
      </div>
    </div>
    <div className="action-container">
      <a href="https://wa.me/phone_number" className="whatsapp-button">
        <FaWhatsapp />
        Falar com consultor
      </a>
      <div className="contact-label">(31) 3441-0240</div>
    </div>
  </div>
);

export default SimulatedValuesPanel;
