export interface ICoupon {
  id?: number;
  ulid?: string | null;
  user_id?: number | null;
  shop_id?: number | null;
  name: string;
  added_by?: string | null;
  discount_type: 'percentage' | 'fixed';
  amount: number;
  valid_from: string;
  valid_to: string;
  usage_limit: number;
  max_uses_per_customer: number;
  min_purchase_amount: number;
  is_active?: boolean | number;
  image_url?: string | null;
  created_at?: string;
}

export type ICouponsData = PaginateType<ICoupon[]>;
export type ICouponCreateData = PaginateType<ICoupon>;
