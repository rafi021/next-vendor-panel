export type ReviewData = PaginateType<Review[]>;

export interface Review {
  id: number;
  ulid: any;
  user_id: any;
  shop_id: number;
  customer_id: number;
  product_id: number;
  comment: string;
  rating: number;
  created_at: string;
  is_approved: number;
  review_images: ReviewImage[];
  customer: Customer;
  product: Product;
}

export interface ReviewImage {
  id: number;
  review_id: number;
  image_url: string;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  image: any;
}

export interface Product {
  id: number;
  name: string;
  thump_image: string;
  meta_data: MetaData;
}

export interface MetaData {
  return_policy: string;
  estimated_delivery: string;
  delivery_details: string;
  meta_description: string;
  meta_keywords: string;
  page_title: string;
  url_handle: string;
}
