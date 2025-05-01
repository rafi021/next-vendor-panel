
export type IDamageData = PaginateType<IDamage[]>;

 export interface IDamage {
    id: string
    ulid: string
    user_id: number
    product_id: string
    variation_option_id: any
    shop_id: number
    purchase_price: string
    total: string
    quantity: string
    type: string
    date: string
    ref: string
    items: number
    notes: string
    image: any
    audio_file: any
    created_at: string
    product: any
  }