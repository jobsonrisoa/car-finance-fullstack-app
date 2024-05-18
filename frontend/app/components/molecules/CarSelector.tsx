'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useCars } from '../../hooks/useCars';
import { Car } from '../../types/car';
import { selectPlaceholder } from '../../styles/constants';
import './CarSelector.css';

type CarSelectorProps = {
  onSelect: (carId: number) => void;
};

const CarSelector: React.FC<CarSelectorProps> = ({ onSelect }) => {
  const { data: cars, error: carsError } = useCars();
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);

  const handleSelect = useCallback(() => {
    if (selectedCarId !== null) {
      onSelect(selectedCarId);
    }
  }, [selectedCarId, onSelect]);

  useEffect(() => {
    handleSelect();
  }, [handleSelect]);

  if (carsError) return <div>Error loading cars</div>;

  return (
    <div className="car-selector">
      <h2 className="title">Selecione um veículo que deseja simular o financiamento</h2>
      <select
        className="select"
        onChange={(e) => setSelectedCarId(Number(e.target.value))}
      >
        <option value="">{selectPlaceholder}</option>
        {cars?.map((car: Car) => (
          <option key={car.id} value={car.id}>
            {car.model}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CarSelector;
