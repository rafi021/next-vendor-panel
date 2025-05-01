export type ILandingPagesData = PaginateType<ILandingPageData[]>;

export interface ILandingPageData {
  id: string;
  ulid: string;
  shop_id: number;
  user_id: number;
  landing_page: ILandingPage;
  created_at: string;
  is_active: number;
  product_id: string;
  product: Product;
}

export interface Product {
  id: string;
  shop_id: number;
  ulid: string;
  user_id: number;
  brand_id: number;
  name: string;
  slug: string;
  regular_price: string;
  purchase_price: string;
  sell_price: string;
  discount_type: string;
  discounted_price: string;
  min_price: number;
  max_price: number;
  sku: any;
  stock_quantity: number;
  alert_quantity: number;
  sold_quantity: number;
  is_taxable: number;
  stock_status: string;
  product_type: string;
  status: string;
  short_description: any;
  long_description: any;
  specification: any;
  shipping: any;
  video_url: string;
  estimated_delivery: any;
  rating: number;
  sales_count: number;
  review_count: number;
  sales_timer: any;
  return_policy: any;
  thump_image: any;
  gallery: string[];
  is_active: boolean;
  external_url: any;
  weight: any;
  dimensions: any;
  featured: number;
  reviews_allowed: number;
  created_at: string;
  meta_data: MetaData;
  metas?: Meta[];
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

export interface Meta {
  id: string;
  product_id: string;
  type: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface ILandingPage {
  top: Top;
  list: List;
  color_code: string;
  hero_section: HeroSection;
  offer_section: OfferSection;
  video_section: VideoSection;
  review_section: ReviewSection;
  related_section: RelatedSection[];
  // new
  title: string;
  action_url: string;
}

export interface Top {
  link: string;
  title: string;
}

export interface List {
  des: string;
  title: string;
  btn_tax: string;
  btn_link: string;
}

export interface HeroSection {
  logo: string;
  title: string;
  gallery: string[];
  btn_link: string;
  btn_text: string;
}

export interface OfferSection {
  offer_type: string;
  type: string;
  duration: number;
  end_date: string;
  start_date: string;
}

export interface VideoSection {
  title: string;
  video_link: string;
}

export interface ReviewSection {
  title: string;
  gallery: string[];
}

export interface RelatedSection {
  title: string;
  btn_tax: string;
  gallery: string[];
  btn_link: string;
}
