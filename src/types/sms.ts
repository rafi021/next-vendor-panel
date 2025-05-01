export type Templates = {
  id: number;
  name: string;
  description: string;
  is_active?: 1 | 0;
  category_id: number;
  category: {
    id: number;
    name: string;
    is_active: 1 | 0;
  };
};
export type TemplatesData = PaginateType<Templates[]>;

export type SmsTemplate = {
  id: number;
  name: string;
  is_active: 1 | 0;
  templates:
    | []
    | {
        id: number;
        name: string;
        description: string;
        category_id: number;
      }[];
};

export type SmsTemplateData = PaginateType<SmsTemplate[]>;
