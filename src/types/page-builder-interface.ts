import { FooterMenuItem } from './store-settings-interface';

export interface IPageBuilder {
  id: number;
  shop_id?: number;
  ulid?: string;
  user_id?: number | null;
  title: string;
  slug: string;
  description: string;
  image_url?: string | null;
  page_for?: string;
  is_active?: number;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
  footer_menu?: {
    id?: number;
    slug?: string;
  };
}

export type IPageBuilderData = PaginateType<IPageBuilder[]>;

export type PageBuilderPageDetails = {
  page: IPageBuilder;
} & FooterMenuItem;

export type FooterMenuSlugList = {
  id: number;
  url: string;
};
