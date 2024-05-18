import { fetcher } from './api';
import { Car } from '../types/car';

export const getCars = (): Promise<Car[]> => fetcher('/api/cars');
