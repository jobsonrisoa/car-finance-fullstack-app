'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Input from '../atoms/Input';
import './DownPaymentInput.css';

type DownPaymentInputProps = {
  onInput: (downPayment: string) => void;
  value: string;
};

const DownPaymentInput: React.FC<DownPaymentInputProps> = ({ onInput, value }) => {
  const [downPayment, setDownPayment] = useState<string>(value);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleInput = useCallback(() => {
    onInput(downPayment);
  }, [downPayment, onInput]);

  useEffect(() => {
    handleInput();
  }, [handleInput]);

  const handleClick = () => {
    if (!isClicked) {
      setDownPayment('');
      setIsClicked(true);
    }
  };

  return (
    <div className="down-payment-input">
      <h2 className="title">Valor de entrada</h2>
      <Input
        type="text"
        value={downPayment}
        onChange={(e) => setDownPayment(e.target.value)}
        onClick={handleClick}
      />
    </div>
  );
};

export default DownPaymentInput;
