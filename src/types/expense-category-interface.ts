export type IExpenseCategoryData = PaginateType<IExpenseCategory[]>;

export interface IExpenseCategory {
  id: string;
  ulid: string;
  user_id: number;
  shop_id: number;
  name: string;
  icon: string;
  description: string;
  created_at: string;
  is_active: number;
  expenses_sum_amount: string;
  deposits: any[];
}
