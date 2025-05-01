export type IPayrollsData = PaginateType<IPayroll[]>;

export interface IPayroll {
  id: string;
  ulid: string;
  user_id: number;
  shop_id: number;
  account_id: string;
  employee_id: string;
  expense_id: string;
  date: string;
  reference: string;
  month: string;
  year: string;
  notes: string;
  amount: string;
  method: string;
  status: string;
  created_at: string;
  is_active: number;
  employee: Employee;
  account: Account;
}

export interface Employee {
  id: number;
  name: string;
}

export interface Account {
  id: number;
  name: string;
  balance: number;
}
