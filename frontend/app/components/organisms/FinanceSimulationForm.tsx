'use client';

import React, { useState } from 'react';
import CarSelector from '../molecules/CarSelector';
import DownPaymentInput from '../molecules/DownPaymentInput';
import Button from '../atoms/Button';
import './FinanceSimulationForm.css';

type FinanceSimulationFormProps = {
  onSubmit: (carId: number, downPayment: number) => void;
};

const FinanceSimulationForm: React.FC<FinanceSimulationFormProps> = ({ onSubmit }) => {
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [downPayment, setDownPayment] = useState<number>(0);

  const handleCarSelect = (carId: number) => {
    setSelectedCarId(carId);
  };

  const handleDownPaymentInput = (payment: number) => {
    setDownPayment(payment);
  };

  const handleSubmit = () => {
    if (selectedCarId !== null) {
      onSubmit(selectedCarId, downPayment);
    }
  };

  return (
    <div className="finance-simulation-form">
      <CarSelector onSelect={handleCarSelect} />
      {selectedCarId && (
        <div className='down-payment-wrapper'>
          <DownPaymentInput onInput={handleDownPaymentInput} />
          <Button onClick={handleSubmit}>Simular</Button>
        </div>
      )}
    </div>
  );
};

export default FinanceSimulationForm;
