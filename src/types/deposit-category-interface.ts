export type IDepositCategoryData = PaginateType<IDepositCategory[]>;

export interface IDepositCategory {
  id: string;
  ulid: string;
  user_id: number;
  shop_id: number;
  name: string;
  icon: string;
  description: string;
  created_at: string;
  is_active: number;
  deposits_sum_amount: string;
  deposits: any[];
}
