import { useState, useCallback } from 'react';
import { postFinance } from '../services/financeService';
import { FinanceResponse } from '../types/financeResponse';

export const useFinances = () => {
  const [data, setData] = useState<FinanceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateFinance = useCallback(async (carId: number, downPayment: number) => {
    try {
      const result = await postFinance(carId, downPayment);
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    }
  }, []);

  return { data, error, calculateFinance };
};
