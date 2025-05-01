export type ICustomerData = PaginateType<ICustomer[]>;

export interface ICustomer {
  id: string;
  shop_id: any;
  name: string;
  image: string;
  phone: string;
  email?: string;
  is_active?: number;
  orders_count?: number;
  orders_sum_due_amount?: number;
  orders_sum_paid_amount?: number;
  orders: Order[];
}

export interface Order {
  customer_id: number;
  shop_id: any;
  tracking_number: string;
  shipping_address: string;
  source: any;
  payment_gateway: any;
  source_link: any;
  status_change_at: string;
  city_id?: number;
  zone_id?: number;
  area_id?: number;
  created_at: string;
  amount: number;
  paid_amount: number;
  due_amount: number;
  location_type: string;
}

export interface Metadata {
  customer_active_count: CustomerActiveCount
  total_customer: number
  total_orders: number
  total_paid_amount: number
  total_due_amount: number
}

export interface CustomerActiveCount {
  active: number
  inactive: number
}
