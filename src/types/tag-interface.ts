export interface ITag {
  id: number;
  ulid: string;
  shop_id: number;
  user_id: number;
  name: string;
  slug: string;
  text_color: string;
  bg_color: string;
  created_at?: string;
  is_active: 1 | 0;
}

export type ITagsData = PaginateType<ITag[]>;
