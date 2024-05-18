'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useCars } from '../../hooks/useCars';
import { Car } from '../../types/car';
import { selectPlaceholder } from '../../styles/constants';
import './CarSelector.css';

type CarSelectorProps = {
  onSelect: (carId: number) => void;
  initialCarId: number | null;
};

const CarSelector: React.FC<CarSelectorProps> = ({ onSelect, initialCarId }) => {
  const { data: cars, error: carsError } = useCars();
  const [selectedCarId, setSelectedCarId] = useState<number | null>(initialCarId);

  const handleSelect = useCallback(() => {
    if (selectedCarId !== null) {
      onSelect(selectedCarId);
    }
  }, [selectedCarId, onSelect]);

  useEffect(() => {
    handleSelect();
  }, [handleSelect]);

  useEffect(() => {
    if (cars && cars.length > 0 && selectedCarId === null) {
      setSelectedCarId(cars[0].id);
    }
  }, [cars, selectedCarId]);

  if (carsError) return <div>Error loading cars</div>;

  return (
    <div className="car-selector">
      <h2 className="title">Selecione um veículo que deseja simular o financiamento</h2>
      <select
        className="select"
        value={selectedCarId ?? ''}
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
