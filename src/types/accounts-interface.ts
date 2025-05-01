import { Order } from './order-interface';

export type IAccountsData = PaginateType<IAccount[]>;

export interface IAccount {
  id: string;
  ulid: string;
  user_id: number;
  shop_id: number;
  name: string;
  number: string;
  notes: string;
  balance: string;
  is_active: number;
  created_at: string;
}

export type Customer = {
  customer_id?: string;
  id?: string;
  shop_id?: number | null;
  name?: string;
  image?: string | null;
  phone?: string;
  email?: string;
  orders?: Order[] | [];
  address?: string | null;
  isNew?: boolean | null;
  //new
  orders_sum_due_amount?: number;
  orders_sum_paid_amount?: number;
  cancelled_orders_count?: number;
  delivered_orders_count?: number;
  returned_orders_count?: number;
  orders_count?: number;
};

export type CustomerData = PaginateType<Customer[]>;
