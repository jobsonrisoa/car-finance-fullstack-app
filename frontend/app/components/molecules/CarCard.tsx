'use client';

import React from 'react';
import { Car } from '../../types/car';
import './CarCard.css';
import Image from 'next/image';
import carImg from '/public/car.jpeg';
import { CiCalendar, CiStopwatch } from 'react-icons/ci';
import { TbManualGearboxFilled } from 'react-icons/tb';

type CarCardProps = {
  car: Car;
};

const formatCarValue = (value: number): string => {
  return `R$ ${Math.round(value).toLocaleString('pt-BR')}`;
};

const CarCard: React.FC<CarCardProps> = ({ car }) => (
  <div className="card">
    {/* <img src="/listra_logo.jpg" alt={car.model} className="card-image" /> */}
    <Image src={carImg} alt={car.model} className="card-image" width={300} height={200} />
    <div className="card-details">
      <h3 className="card-title">{car.model}</h3>
      <p className="card-subtitle">{car.description}</p>
      <div className="car-info">
        <span className="car-year"><CiCalendar />{car.year}</span>
        <span className="car-mileage"><CiStopwatch />{car.mileage.toLocaleString('pt-BR')} Km</span>
        <span className="car-gearbox"><TbManualGearboxFilled />{car.gearbox_type}</span>
      </div>
      <div className="car-value">{formatCarValue(car.value)}</div>
    </div>
  </div>
);

export default CarCard;
