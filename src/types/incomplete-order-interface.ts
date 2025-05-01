export type IIncompleteOrderData = PaginateType<IIncompleteOrder[]>;
  
  export interface IIncompleteOrder {
    id: number
    ulid: any
    user_id: any
    shop_id: number
    customer_name: string
    customer_phone: string
    products: Product[]
    total: string
    created_at: string
    is_active: number
  }
  
  export interface Product {
    id: number
    name: string
    slug: string
    qty: number
    subtotal: number
  }

  