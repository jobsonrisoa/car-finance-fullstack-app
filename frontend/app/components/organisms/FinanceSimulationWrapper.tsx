'use client';

import React, { useState } from 'react';
import CarCard from '../molecules/CarCard';
import FinanceSimulationForm from './FinanceSimulationForm';
import SimulatedValuesPanel from './SimulatedValuesPanel';
import { Car } from '../../types/car';
import { useFinances } from '../../hooks/useFinances';
import { useCars } from '../../hooks/useCars';
import './FinanceSimulationWrapper.css';

const FinanceSimulationWrapper: React.FC = () => {
  const { data: cars, error: carsError } = useCars();
  const { data: financeData, error: financeError, calculateFinance } = useFinances();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const handleFormSubmit = (carId: number, downPayment: number) => {
    calculateFinance(carId, downPayment).then(() => {
      const selectedCar = cars?.find(car => car.id === carId) || null;
      setSelectedCar(selectedCar);
    }).catch(error => {
      console.error('Error calculating finance:', error);
    });
  };

  if (carsError) return <div>Error loading cars: {carsError}</div>;
  if (financeError) return <div>Error calculating finance: {financeError}</div>;

  return (
    <div className="finance-simulation-wrapper">
      <div className="heading">Simulação de Financiamento</div>
      <div className="upper-half">
        <FinanceSimulationForm onSubmit={handleFormSubmit} />
      </div>
      <div className="lower-half">
        <div className="left-half">
          {selectedCar && <CarCard car={selectedCar} />}
        </div>
        <div className="right-half">
          {financeData && <SimulatedValuesPanel installments={financeData.original.installment_values} />}
        </div>
      </div>
    </div>
  );
};

export default FinanceSimulationWrapper;
