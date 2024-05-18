import { useEffect, useState } from 'react';
import { apiEndpoints } from '../styles/constants';
import { Car } from '../types/car';

type UseCarsResult = {
  data: Car[] | null;
  error: string | null;
};

export const useCars = (): UseCarsResult => {
  const [data, setData] = useState<Car[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(apiEndpoints.cars);
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const cars = await response.json();
        setData(cars);
      } catch (error: any) {
        setError(error.message || 'Unknown error');
      }
    };

    fetchCars();
  }, []);

  return { data, error };
};
