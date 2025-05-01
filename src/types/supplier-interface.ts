export type ISupplierData = PaginateType<ISupplier[]>;

export interface ISupplier {
  id: number
  ulid: string
  shop_id: number
  user_id: number
  name: string
  phone: string
  party_type: string
  due_amount: number
  advance_amount: number
  due_date: string
  tax_number: any
  notification: number
  message_notification: number
  app_notification: number
  is_active: number
  code: any
  email: any
  country: any
  city: any
  address: any
  avatar: string
}

export interface Link {
  url?: string
  label: string
  active: boolean
}

export interface Metadata {
  supplier_type_counts: SupplierTypeCounts
  total_supplier: number
  total_purchase_amount: number
  total_paid_amount: number
  total_due_amount: number
}

export interface SupplierTypeCounts {
  DEALER: number
  PRODUCER: number
}
