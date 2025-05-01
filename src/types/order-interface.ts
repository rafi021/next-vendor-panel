export type Order = {
  id: number;
  shop_id: number;
  user_id?: number | null;
  coupon_id?: number | null;
  customer_id?: string;
  customer_contact: string;
  customer_name: string;
  tracking_number: string;
  shipping_address: string;
  billing_address: string;
  amount_info: AmountInfo;
  note?: string | null | undefined;
  total?: number | null;
  payment_status: string;
  created_at: string;
  source?: string | null;
  source_link?: string | null;
  status_change_at?: string | Date | null;
  pending: number;
  on_hold: number;
  approved: number;
  shipped: number;
  delivered: number;
  returned: number;
  cancelled: number;
  customer: Customer;
  order_products: OrderProduct[];
  location_type: string | null;
  city_id: number | null;
  zone_id: number | null;
  area_id: number | null;

  staff_note: string | null;
  city_name: string | null;
  zone_name: string | null;
  area_name: string | null;

  order_status: 'on_hold' | 'approved' | 'delivered' | 'cancelled' | 'returned';
  delivery_method: 'in_house' | 'pathao';
  delivery: {
    id: number;
    order_id: number;
    delivery_partner: string;
    consignment_id: string;
    merchant_order_id: string;
    status: string | null;
    reason: string | null;
  } | null;
  // new
  customer_info?: Customer_info;
};

export type AmountInfo = {
  amount: number;
  cancelled_delivery_fee: number | null;
  courier_cost: number | null;
  delivery_fee: number | null;
  discount: string | null;
  paid_total: number;
  due_amount: number;
  paid_amount: number;
  sales_tax: number | null;
  discount_type: string | null;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  isNew: number | boolean;
};

export type Customer_info = {
  total_orders?: number;
  cancelled_orders?: number;
  delivered_orders?: number;
  returned_orders?: number;
};

export type OrderProduct = {
  id: number;
  order_id: number;
  product_id: number;
  variation_option_id?: number;
  title?: string;
  subtotal: string;
  sell_price: string;
  order_quantity: number;
  stock_quantity: number;
  name: string;
  sku: string;
  thump_image: string | undefined;
  dimensions: {
    length: number | null;
    width: number | null;
    height: number | null;
    weight: number | null;
  } | null;

  sales_type: 'up_sell' | 'organic_sale';

  // new
  city_id: number | null;
  zone_id: number | null;
  area_id: number | null;
  city_name: string | null;
  zone_name: string | null;
  area_name: string | null;
};

export type OrderMetaData = {
  all?: number | null;
  active?: number | null;
  inactive?: number | null;
  pending?: number | null;
  on_hold?: number | null;
  approved?: number | null;
  shipped?: number | null;
  delivered?: number | null;
  returned?: number | null;
  cancelled?: number | null;

  today_total_orders: number;
  today_total_order_amount: number;
  total_orders: number;
  total_order_amount: number;
  pending_orders: number;
  pending_order_amount: number;
  on_hold_orders: number;
  on_hold_order_amount: number;
  approved_orders: number;
  approved_order_amount: number;
  returned_orders: number;
  returned_order_amount: number;
} | null;

export type OrderData = PaginateType<Order[]>;

export type DeliveryFeeType = {
  shipping_costs: {
    key: string;
    value: number;
  }[];
};
