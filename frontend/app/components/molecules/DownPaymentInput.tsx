'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Input from '../atoms/Input';
import './DownPaymentInput.css';

type DownPaymentInputProps = {
  onInput: (downPayment: number) => void;
};

const DownPaymentInput: React.FC<DownPaymentInputProps> = ({ onInput }) => {
  const [downPayment, setDownPayment] = useState<number>(0);

  const handleInput = useCallback(() => {
    onInput(downPayment);
  }, [downPayment, onInput]);

  useEffect(() => {
    handleInput();
  }, [handleInput]);

  return (
    <div className="down-payment-input">
      <h2 className="title">Valor de entrada</h2>
      <Input
        type="number"
        value={downPayment}
        onChange={(e) => setDownPayment(Number(e.target.value))}
      />
    </div>
  );
};

export default DownPaymentInput;
