import { FinanceData } from './finance';

export interface FinanceResponse {
  headers: object;
  original: FinanceData;
  exception: any;
}
