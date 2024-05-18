import { FinanceData } from '../types/finance';

interface FinancePayload {
  car_id: number;
  down_payment: number;
}

export const postFinance = (data: FinancePayload): Promise<FinanceData> =>
  fetch('/api/finances', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
