export type ICallToActionsData = PaginateType<ICallToAction[]>;

export interface ICallToAction {
  id: string;
  ulid: string;
  user_id: number;
  shop_id: number;
  name: string;
  image: string;
  action_url: string;
  created_at: string;
  is_active: number;
}
