export type ICategories = PaginateType<ICategory[]>;

export interface ICategory {
  id: number;
  ulid: string;
  user_id: number;
  shop_id: number;
  parent_id: number | null | Array<number>;
  name: string;
  slug: string;
  available_for_shop: boolean;
  position: number;
  available_for_body: number;
  position_body: number;
  image: string;
  is_active: number;
  product_count: number;
  created_at: string;
  meta_keywords?: string;
  meta_description?: string;
  products_count: number;
  children_recursive: ChildrenRecursive[];
}

export interface ChildrenRecursive {
  id: number;
  name: string;
  slug: string;
  image: string;
  parent_id: any;
  product_count: number;
  shop_id: number;
  ulid: string;
  user_id: number;
  children_recursive: ChildrenRecursive[];
}
