export type IFlashSalesData = PaginateType<IFlashSale[]>;

export interface IFlashSale {
  id: string;
  ulid: any;
  user_id: any;
  shop_id: any;
  offer: string;
  percentage: string;
  start_date: string;
  end_date: string;
  created_at: string;
  products: any[];
}
