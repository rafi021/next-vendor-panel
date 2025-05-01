export interface IHeaderBannerItem {
  id: string;
  ulid: string;
  user_id: number;
  shop_id: number;
  name: string;
  image: string;
  place: 'header' | 'middle' | 'footer';
  created_at: string;
  is_active: number;
}

export type IHeaderBanners = {
  [key: string]: IHeaderBannerItem[];
};
