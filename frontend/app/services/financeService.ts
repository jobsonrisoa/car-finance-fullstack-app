import { apiEndpoints } from '../styles/constants';
import { FinanceResponse } from '../types/financeResponse';

export const postFinance = async (carId: number, downPayment: number): Promise<FinanceResponse> => {
  const response = await fetch(apiEndpoints.finances, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ car_id: carId, down_payment: downPayment }),
  });

  if (!response.ok) {
    throw new Error('Failed to calculate finance');
  }

  const data = await response.json();
  return data;
};
