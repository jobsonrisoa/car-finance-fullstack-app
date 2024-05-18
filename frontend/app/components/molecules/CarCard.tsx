'use client';

import React from 'react';
import Image from 'next/image';
import { Car } from '../../types/car';
import './CarCard.css';

type CarCardProps = {
  car: Car;
};

const CarCard: React.FC<CarCardProps> = ({ car }) => (
  <div className="card">
    <Image src={car.image} alt={car.model} width={300} height={200} />
    <h3>{car.model}</h3>
    <p>{car.price}</p>
  </div>
);

export default CarCard;
