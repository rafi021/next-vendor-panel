import { ITag } from './tag-interface';

export interface FooterMenuItem {
  id: number;
  ulid: string | null;
  user_id: number | null;
  shop_id: number | null;
  head: string;
  sub_head: string;
  url: string;
  priority: number;
  created_at: string;
  updated_at: string;
  is_active: number;
  deleted_at: string | null;
}
export type FooterMenus = {
  [key: string]: FooterMenuItem[];
};

// BLOGS -------------------------------
export interface Blog {
  id: number;
  title: string;
  description: string;
  slug: string;
  published_at: string;
  image_url: string;
}
export type BlogsData = PaginateType<Blog[]>;

export interface NewsLetter {
  id: number;
  ulid: string;
  user_id: null;
  shop_id: number;
  email: string;
  created_at: string;
}
export type NewsLetterData = PaginateType<NewsLetter[]>;

export type WeekDealDef = {
  id: number;
  ulid: string | null;
  user_id: number | null;
  shop_id: number | null;
  product_id: number;
  tag_id: number;
  percentage: string;
  created_at: string;
  updated_at: string;
  is_active: number;
  deleted_at: string | null;
  product: any | null;
  tag: ITag;
};
export type WeekDealData = PaginateType<WeekDealDef[]>;

export interface Settings {
  company_name: string;
  phone: string;
  site_name: string;
  site_color_logo: string;
  site_payment_logo: string;
  site_slogan: string;
  special_message: any;
  site_email: string;
  site_phone: string;
  site_address: string;
  site_facebook: any;
  site_twitter: string;
  site_instagram: string;
  site_youtube: string;
  site_tiktok: string;
  site_whatsapp: any;
  site_bw_logo: string;
  is_vat_applicable: any;
  inside_dhaka_cost: string;
  outside_dhaka_cost: string;
  default_account: string;
  payment_method: any;
  pathao_store_id: string;
  pathao_base_url: any;
  pathao_clinet_id: string;
  pathao_secret_id: string;
  pathao_username: string;
  pathao_password: string;
  pathao_grant_type: string;
  facebook_pixel_code: string;
  facebook_domain_verification: any;
  google_analytics: string;
  google_domain_verification: any;
  google_body_tag: string;
  product_card_type: ProductCardType;
  style: Style;
  google_merchant_code: any;
  tiktok_pixel_code: any;
  pinterest_pixel_code: any;
  pathao_webhook_url: any;
  pathao_webhook_secret: any;
  shipping_costs: ShippingCost[];
  store_domain_name: string;
  customer_sms_notification: CustomerSmsNotification;
}

export interface ProductCardType {
  title: boolean;
  review: boolean;
  buy_btn: boolean;
  sale_price: boolean;
  sell_count: boolean;
  add_to_card: boolean;
  regular_price: boolean;
}

export interface Style {
  banner_btn: BannerBtn;
  page_color: PageColor;
  buy_now_btn: BuyNowBtn;
  add_to_card_btn: AddToCardBtn;
}

export interface BannerBtn {
  fill_color: string;
  text_color: string;
  stock_color: string;
}

export interface PageColor {
  theme: string;
  ticker_bg: string;
}

export interface BuyNowBtn {
  fill_color: string;
  text_color: string;
  stock_color: string;
}

export interface AddToCardBtn {
  fill_color: string;
  text_color: any;
  stock_color: any;
}

export interface ShippingCost {
  key: string;
  value: number;
}

export interface CustomerSmsNotification {
  on_hold: OnHold;
  pending: Pending;
  shipped: Shipped;
  approved: Approved;
  returned: Returned;
  cancelled: Cancelled;
  delivered: Delivered;
  paid_returned: PaidReturned;
}

export interface OnHold {
  is_notify: boolean;
  sms_category_id: any;
  sms_template_id: any;
}

export interface Pending {
  is_notify: boolean;
  sms_category_id: string;
  sms_template_id: string;
}

export interface Shipped {
  is_notify: boolean;
  sms_category_id: any;
  sms_template_id: any;
}

export interface Approved {
  is_notify: boolean;
  sms_category_id: any;
  sms_template_id: any;
}

export interface Returned {
  is_notify: boolean;
  sms_category_id: any;
  sms_template_id: any;
}

export interface Cancelled {
  is_notify: boolean;
  sms_category_id: any;
  sms_template_id: any;
}

export interface Delivered {
  is_notify: boolean;
  sms_category_id: string;
  sms_template_id: string;
}

export interface PaidReturned {
  is_notify: boolean;
  sms_category_id: any;
  sms_template_id: any;
}
