import { useState } from 'react';
import { postFinance } from '../services/financeService';
import { FinanceData } from '../types/finance';

export const useFinances = () => {
  const [data, setData] = useState<FinanceData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateFinance = async (carId: number, downPayment: number) => {
    try {
      const result = await postFinance({ car_id: carId, down_payment: downPayment });
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return { data, error, calculateFinance };
};
