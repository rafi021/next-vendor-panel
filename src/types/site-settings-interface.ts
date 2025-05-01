export type ISiteSettingsData = PaginateType<ISiteSettings[]>;

export interface ISiteSettings {
  id: string;
  ulid: string;
  user_id: number;
  shop_id: number;
  key: string;
  value: string | number | boolean;
  type: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}
