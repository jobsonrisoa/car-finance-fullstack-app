'use client';

import React from 'react';
import InstallmentOptions from './InstallmentOptions';
import './SimulatedValuesPanel.css';
import { contactNumber, buttonLabel } from '../../styles/constants';

type SimulatedValuesPanelProps = {
  installments: {
    '48': number;
    '12': number;
    '6': number;
  };
};

const SimulatedValuesPanel: React.FC<SimulatedValuesPanelProps> = ({ installments }) => (
  <div className="simulated-values-panel">
    <h2 className="title">Valores simulados por você</h2>
    <InstallmentOptions installments={installments} />
    <div className="action-container">
      <a href={`tel:+1234567890`} className="contact-link">Contato: {contactNumber}</a>
      <a href="#" className="simulate-button">{buttonLabel}</a>
    </div>
  </div>
);

export default SimulatedValuesPanel;
