export type IPurchaseReturnData = PaginateType<IPurchaseReturn[]>;

export interface IPurchaseReturn {
  id: number;
  ulid: string;
  purchase_id: number;
  shop_id: number;
  user_id: number;
  supplier_id: number;
  reference: string;
  date: string;
  tax_rate: number;
  tax_net: number;
  discount: number;
  shipping_cost: number;
  grand_total: number;
  paid_amount: number;
  status: string;
  payment_status: string;
  notes: string;
  created_at: string;
  user: User;
  supplier: Supplier;
  purchase_return_detail: PurchaseReturnDetail[];
}

export interface User {
  id: number;
  name: string;
}

export interface Supplier {
  id: number;
  name: string;
}

export interface PurchaseReturnDetail {
  id: number;
  ulid: string;
  user_id: number;
  shop_id: number;
  purchase_return_id: number;
  product_id: number;
  product_variant_id: any;
  purchase_unit_id: any;
  purchase_price: number;
  tax_net: number;
  tax_method: string;
  discount: number;
  discount_method: string;
  total: number;
  quantity: number;
  imei: any;
  created_at: any;
  product: any;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}
