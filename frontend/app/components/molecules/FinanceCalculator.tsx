'use client';

import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import './FinanceCalculator.css';

type FinanceCalculatorProps = {
  carId: number;
  onCalculate: (downPayment: number) => void;
};

const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({ carId, onCalculate }) => {
  const [downPayment, setDownPayment] = useState<number>(0);

  const handleCalculate = () => {
    onCalculate(downPayment);
  };

  return (
    <div className="calculator-container">
      <Input
        type="number"
        value={downPayment}
        onChange={(e) => setDownPayment(Number(e.target.value))}
      />
      <Button onClick={handleCalculate}>Simular</Button>
    </div>
  );
};

export default FinanceCalculator;
