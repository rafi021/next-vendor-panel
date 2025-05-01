export interface IAttributeOption {
  id: number;
  attribute_id: number;
  value: string;
}

export interface IAttribute {
  id: number;
  ulid: string;
  user_id: number;
  shop_id: number;
  slug: string;
  name: string;
  is_active: number;
  created_at: string;
  attribute_options: IAttributeOption[];
  values?: string[]
}

export interface IAttributeCreate {
  id: number;
  name: string;
  attribute_options?: IAttributeOption[];
  values?: string[]
}

export type IProductAttributeData = PaginateType<IAttribute[]>;
export type IProductAttributeCreateData = IAttributeCreate;