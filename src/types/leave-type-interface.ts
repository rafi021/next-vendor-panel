export type ILeaveTypesData = PaginateType<ILeaveType[]>;

export interface ILeaveType {
  id: string;
  ulid: string;
  user_id: number;
  shop_id: number;
  name: string;
  description: string;
  created_at: string;
  is_active: number;
}
