export type IExpenseData = PaginateType<IExpense[]>;

export interface IExpense {
  id: string;
  ulid: string;
  user_id: number;
  shop_id: number;
  account_id: string;
  expense_category_id: string;
  date: string;
  amount: string;
  evidence: string;
  notes: string;
  audio_file: any;
  created_at: string;
  is_active: number;
  account: Account;
  shop: Shop;
  expense_category: ExpenseCategory;
}

export interface Account {
  id: number;
  name: string;
}

export interface Shop {
  id: number;
  name: string;
}

export interface ExpenseCategory {
  id: number;
  name: string;
}
