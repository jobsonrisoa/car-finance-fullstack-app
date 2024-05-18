import useSWR from 'swr';
import { getCars } from '../services/carService';
import { Car } from '../types/car';

export const useCars = () => {
  const { data, error } = useSWR<Car[]>('/api/cars', getCars);
  return { data, error };
};
