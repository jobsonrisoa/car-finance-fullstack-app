'use client';

import React, { useState, useEffect } from 'react';
import CarCard from '../molecules/CarCard';
import FinanceSimulationForm from './FinanceSimulationForm';
import SimulatedValuesPanel from './SimulatedValuesPanel';
import Spinner from '../atoms/Spinner';
import { Car } from '../../types/car';
import { useFinances } from '../../hooks/useFinances';
import { useCars } from '../../hooks/useCars';
import './FinanceSimulationWrapper.css';

const FinanceSimulationWrapper: React.FC = () => {
  const { data: cars, error: carsError } = useCars();
  const { data: financeData, error: financeError, calculateFinance } = useFinances();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cars && cars.length > 0) {
      setSelectedCar(cars[0]);
    }
  }, [cars]);

  const handleCarSelect = (carId: number) => {
    const selectedCar = cars?.find(car => car.id === carId) || null;
    setSelectedCar(selectedCar);
  };

  const handleFormSubmit = (carId: number, downPayment: number) => {
    setLoading(true);
    calculateFinance(carId, downPayment).finally(() => setLoading(false));
  };

  if (carsError) return <div>Error loading cars: {carsError}</div>;
  if (financeError) return <div>Error calculating finance: {financeError}</div>;

  return (
    <>
      {loading && <Spinner />}
      <div className={`finance-simulation-wrapper ${loading ? 'blurred' : ''}`}>
        <div className="upper-half">
          <FinanceSimulationForm
            onSubmit={handleFormSubmit}
            onCarSelect={handleCarSelect}
            initialCar={selectedCar}
          />
        </div>
        <div className="lower-half">
          <div className="left-half">
            {selectedCar && <CarCard car={selectedCar} />}
          </div>
          <div className="right-half">
            {financeData && (
              <SimulatedValuesPanel installments={financeData.original.installment_values} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FinanceSimulationWrapper;
