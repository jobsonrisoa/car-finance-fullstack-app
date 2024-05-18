'use client';

import React, { useState } from 'react';
import MainTemplate from './components/templates/MainTemplate';
import './page.css';
import { useCars } from './hooks/useCars';
import { useFinances } from './hooks/useFinances';
import { Car } from './types/car';
import FinanceCalculator from './components/molecules/FinanceCalculator';
import CarCard from './components/molecules/CarCard';

const Home: React.FC = () => {
  const { data: cars, error: carsError } = useCars();
  const { data: financeData, calculateFinance } = useFinances();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  if (carsError) return <div>Error loading cars</div>;

  return (
    <MainTemplate>
      <div className='container'>
        <h2 className='title'>Simulação de Financiamento</h2>
        <select
          className='select'
          onChange={(e) =>
            setSelectedCar(
              cars?.find((car) => car.id === Number(e.target.value)) || null
            )
          }
        >
          <option value=''>Selecione</option>
          {cars?.map((car) => (
            <option key={car.id} value={car.id}>
              {car.model}
            </option>
          ))}
        </select>
        {selectedCar && (
          <FinanceCalculator
            carId={selectedCar.id}
            onCalculate={(downPayment) =>
              calculateFinance(selectedCar.id, downPayment)
            }
          />
        )}
        {selectedCar && <CarCard car={selectedCar} />}
        {financeData && (
          <div>
            <p>Valores simulados para você</p>
            <p>
              48x: R$ {financeData.original.installment_values["48"] || "N/A"}
            </p>
            <p>
              12x: R$ {financeData.original.installment_values["12"] || "N/A"}
            </p>
            <p>6x: R$ {financeData.original.installment_values["6"] || "N/A"}</p>
          </div>
        )}
      </div>
    </MainTemplate>
  );
};

export default Home;
