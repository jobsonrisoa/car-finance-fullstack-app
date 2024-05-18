'use client';

import React from 'react';
import { Car } from '../../types/car';
import './CarCard.css';

type CarCardProps = {
  car: Car;
};

const formatCarValue = (value: number): string => {
  return `R$ ${Math.round(value).toLocaleString('pt-BR')}`;
};

const CarCard: React.FC<CarCardProps> = ({ car }) => (
  <div className="card">
    <img src={car.image} alt={car.model} className="card-image" />
    <div className="card-details">
      <h3 className="card-title">{car.model}</h3>
      <p className="card-subtitle">{car.description}</p>
      <div className="car-info">
        <span className="car-year">{car.year}</span>
        <span className="car-mileage">{car.mileage.toLocaleString('pt-BR')} Km</span>
        <span className="car-gearbox">{car.gearbox_type}</span>
      </div>
      <div className="car-value">{formatCarValue(car.value)}</div>
    </div>
  </div>
);

export default CarCard;
