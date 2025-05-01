import { Banners, Offer, Product } from '@/stores/useStoreUiSection';

export type SubHero = {
  image: string;
  btn_link: string;
  follow_type: 'nofollow' | 'dofollow';
  is_open_new_tab: 1 | 0;
};
export type Hero = SubHero & { btn_text: string };

export type Category = {
  id: number;
  name: string;
};
export type HeroSection = {
  id: number;
  is_category_show: 1 | 0;
  category_ids: number[];
  hero: Hero[];
  sub_hero: SubHero[];
  categories: Category[];
  is_sub_hero_show: 0 | 1;

  // new
  is_top_category_show: 1 | 0;
  top_category_ids: Category[];
  top_categories: Category[];
};

export type HeroSectionResponse = {
  hero_section: HeroSection;
};

export type Section = Product | Banners | Offer;

export type SectionResponse = {
  created_at: string;
  is_active: 1 | 0;
  id: number;
  ulid: string;
  shop_id: number;
  user_id: number;
  section: Section[];
};

export type ColorType = {
  fill_color: string;
  text_color: string;
  stock_color: string;
};
export type StyleResponse = {
  product_card_type: {
    title: boolean;
    review: boolean;
    buy_btn: boolean;
    sale_price: boolean;
    sell_count: boolean;
    add_to_card: boolean;
    regular_price: boolean;
  };
  style: {
    banner_btn: ColorType;
    page_color: {
      theme: string;
      ticker_bg: string;
    };
    buy_now_btn: ColorType;
    add_to_card_btn: ColorType;
  };
};
