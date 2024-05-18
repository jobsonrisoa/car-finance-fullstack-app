export interface FinanceData {
  headers: Record<string, any>;
  exception: any;
  original: {
    uuid: string;
    car_id: number;
    down_payment: number;
    installment_values: {
      [key: string]: number;
    };
  };
}
