export type IDepartmentsData = PaginateType<IDepartment[]>;

export interface IDepartment {
  id: string;
  ulid: string;
  user_id: number;
  shop_id: number;
  name: string;
  icon: string;
  description: string;
  created_at: string;
  is_active: number;
}
