import { Settings } from './store-settings-interface';

export type UserDef = {
  id: number;
  name: string;
  shop_id: number;
  role_id: number;
  username: string;
  phone: string;
  email: any;
  nid: any;
  address: any;
  avatar: string;
  status: number;
  sms_count: number;
  shop_count: string;
  sms_trigger: number;
  created_at: string;
  role: Role;
  shops: Shop[];
  store_domain: string;
};

export interface Role {
  id: number;
  name: string;
}

export interface Shop {
  id: number;
  owner_id: number;
  name: string;
  address: string;
  business_type: string;
}

export interface Subscription {
  id: number;
  user_id: number;
  shop_id: number;
  package: string;
  start_date: string;
  end_date: string;
  transactions_details: any;
  click_count: number;
  max_clicks: number;
  created_at: string;
}

export type UserResponse = {
  user: UserDef;
  access_token: string;
  expires_at: string;
  subscription: Subscription;
  settings: Settings;
};

export type CourierStats = {
  total: number;
  delivered: number;
  cancelled: number;
  success_rate: number;
};

export type AddressBook = Record<string, string>;

export type SuccessRate = Record<
  'stead_fast' | 'redx' | 'pathao' | 'paper_fly',
  CourierStats
>;

export type CustomerData = {
  success_rate: number;
  fraud_level: number;
  fraud_count: number;
  fraud_reason: string;
  is_new: boolean;
  address_book: AddressBook;
};

export type FrudResponse = {
  frud: {
    success: boolean;
    data: SuccessRate;
  };
  customer: {
    message: string;
    type: string;
    code: number;
    data: CustomerData;
  };
};

export type Employee = {
  id: number;
  name: string;
  email: null | string;
  nid: null | string;
  address: null | string;
  phone: null | string;
  role_id: null | string;
  status: 1 | 0;
  avatar: null | string;
  password?: string | null;

  role: {
    id: number;
    name: string;
  };
  department_id?: any;
  department?: any;
  created_at?: string;
  shop_id?: number;
  shop?: any;

  // new
  total_orders?: number;
  total_pending_orders?: number;
  total_on_hold_orders?: number;
  total_approved_orders?: number;
  total_shipped_orders?: number;
  total_delivered_orders?: number;
  total_returned_orders?: number;
  total_paid_returned_orders?: number;
  total_cancelled_orders?: number;
};
