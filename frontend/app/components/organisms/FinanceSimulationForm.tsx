"use client";

import React, { useState, useEffect } from "react";
import CarSelector from "../molecules/CarSelector";
import DownPaymentInput from "../molecules/DownPaymentInput";
import Button from "../atoms/Button";
import { Car } from "../../types/car";
import "./FinanceSimulationForm.css";

type FinanceSimulationFormProps = {
  onSubmit: (carId: number, downPayment: number) => void;
  initialCar: Car | null;
};

const FinanceSimulationForm: React.FC<FinanceSimulationFormProps> = ({
  onSubmit,
  initialCar,
}) => {
  const [selectedCarId, setSelectedCarId] = useState<number | null>(
    initialCar ? initialCar.id : null
  );
  const [downPayment, setDownPayment] = useState<string>("0");

  useEffect(() => {
    if (initialCar) {
      setSelectedCarId(initialCar.id);
    }
  }, [initialCar]);

  const handleCarSelect = (carId: number) => {
    setSelectedCarId(carId);
  };

  const handleDownPaymentInput = (payment: string) => {
    setDownPayment(payment);
  };

  const handleSubmit = () => {
    if (selectedCarId !== null) {
      onSubmit(selectedCarId, Number(downPayment));
    }
  };

  return (
    <div className='finance-simulation-form'>
      <CarSelector onSelect={handleCarSelect} initialCarId={selectedCarId} />
      {selectedCarId && (
        <>
          <div className='input-button-group'>
            <DownPaymentInput
              onInput={handleDownPaymentInput}
              value={downPayment}
            />
          </div>
          <Button className='purple-button' onClick={handleSubmit}>
            Simular
          </Button>
        </>
      )}
    </div>
  );
};

export default FinanceSimulationForm;
