export type BrandData = PaginateType<Brand[]>;
export interface Brand {
  id: number;
  shop_id: number | null;
  name: string;
  slug: string | null;
  image: string;
  products_count: number;
  created_at: string;
  updated_at: string | null;
  is_active: number;
  deleted_at: string | null;
}
