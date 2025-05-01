export type IEmployeesData = PaginateType<IEmployee[]>;

export interface IEmployee {
  id: string;
  name: string;
  username: string;
  email: string;
  nid?: string;
  address?: string;
  phone: string;
  role_id: string;
  status: number;
  avatar: any;
  role: {
    id: number;
    name: string;
  };
  department_id: any;
  department: any;
  created_at: string;
  shop_id: number;
  shop: any;

  // new
  total_orders: number;
  total_pending_orders: number;
  total_on_hold_orders: number;
  total_approved_orders: number;
  total_shipped_orders: number;
  total_delivered_orders: number;
  total_returned_orders: number;
  total_paid_returned_orders: number;
  total_cancelled_orders: number;
}
