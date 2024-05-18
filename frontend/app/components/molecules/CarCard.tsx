'use client';

import React from 'react';
import { Car } from '../../types/car';
import './CarCard.css';

type CarCardProps = {
  car: Car;
};

const CarCard: React.FC<CarCardProps> = ({ car }) => (
  <div className="card">
    <img src={car.image} alt={car.model} className="card-image" />
    <div className="card-details">
      <h3 className="card-title">{car.model}</h3>
      <p className="card-subtitle">{car.description}</p>
      <div className="price">R$ {car.value}</div>
    </div>
  </div>
);

export default CarCard;
