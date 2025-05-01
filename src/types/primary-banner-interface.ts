export type IPrimaryBannersData = PaginateType<IPrimaryBanner[]>;

export interface IPrimaryBanner {
  id: string;
  ulid: any;
  shop_id: any;
  title: string;
  short_info: string;
  offer_info: string;
  action_url: string;
  image: string;
  created_at: string;
  is_active: number;
  user_id: any;
}
