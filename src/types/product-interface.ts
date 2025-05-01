import { AttributeFieldDef } from '@/stores/useProductStore';

export type IProductData = PaginateType<IProduct[]>;

export interface IProduct {
  id: number;
  shop_id: number;
  ulid: string;
  user_id: number;
  brand_id: number;
  name: string;
  slug: string;
  regular_price: string;
  purchase_price: string;
  sell_price: string;
  discount_type: 'percent' | 'fixed';
  discounted_price: string;
  min_price: number;
  max_price: number;
  sku: string;
  stock_quantity: number;
  alert_quantity: number;
  sold_quantity: number;
  is_taxable: number;
  manage_stock: 0 | 1;
  stock_status: 'outofstock' | 'instock';
  product_type: 'simple' | 'variable';
  status: string;
  short_description?: string;
  long_description?: string;
  specification?: string;
  shipping?: string;
  video_url?: string;
  estimated_delivery: any;
  rating: number;
  sales_count: number;
  review_count: number;
  sales_timer: any;
  return_policy: any;
  thump_image?: string;
  gallery: string[];
  external_url: any;
  weight: any;
  is_active: number;
  dimensions: Dimensions;
  featured: number;
  reviews_allowed: number;
  created_at: string;
  brand?: {
    id: number;
    name: string;
  };
  categories: Category[];
  tags: Tag[];
  variations: VariationsDef[];
  variation_options: VariationOption[];
  meta_data: MetaData;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  pivot: {
    product_id: number;
    category_id: number;
  };
}

export interface Tag {
  id: number;
  name: string;
  pivot: {
    product_id: number;
    tag_id: number;
  };
}

// export interface Variation {
//   id: number;
//   ulid: any;
//   user_id: any;
//   shop_id: any;
//   slug?: string;
//   attribute_id: number;
//   value: string;
//   meta?: string;
//   pivot: {
//     product_id: number;
//     attribute_value_id: number;
//     shop_id?: number;
//     created_at: string;
//     updated_at: string;
//   };
// }

export interface VariationOption {
  id: number;
  ulid: string;
  user_id: number;
  shop_id: number;
  product_id: number;
  title: string;
  purchase_price: string;
  regular_price: string;
  sell_price: string;
  discount_type: string;
  stock_status: string;
  discounted_price: string;
  stock_quantity: number;
  is_disable: number;
  sku: string;
  code: string;
  options: Options[];
  dimensions: Dimensions;
  sold_quantity: number;
  image_url: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}

export interface Options {
  name: string;
  ids: number[];
  values: string[];
}

export interface Dimensions {
  unit?: string;
  weight?: string;
  width?: number;
  height?: number;
  length?: number;
}

export interface MetaData {
  return_policy?: string;
  estimated_delivery?: string;
  delivery_details?: string;
  meta_description?: string;
  meta_keywords?: string;
  stock_value?: string;
  page_title?: string;
  url_handle?: string;
}

type OmitVariationsDef = Omit<AttributeFieldDef, 'selected_options'>;
export type VariationsDef = OmitVariationsDef & {
  selected_options: {
    id: number;
    value: string;
  }[];
};
