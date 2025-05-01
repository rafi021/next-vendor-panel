export type IPurchaseData = PaginateType<IPurchase[]>;

  export interface IPurchase {
    id: string
    ulid: string
    user_id: number
    shop_id: number
    supplier_id: number
    reference: string
    date: string
    tax_rate: number
    tax_net: number
    discount: number
    shipping_cost: number
    grand_total: number
    paid_amount: number
    payment_status: string
    notes: any
    audio_file: any
    image: any
    created_at: string
    purchase_return?: PurchaseReturn
    products_purchase: ProductsPurchase[]
    supplier: Supplier
    purchase_payment: PurchasePayment[]
  }
  
  export interface PurchaseReturn {
    id: number
    purchase_id: number
    grand_total: number
  }
  
  export interface ProductsPurchase {
    id: string
    ulid: string
    user_id: number
    shop_id: number
    purchase_id: number
    product_id: number
    product_variant_id: number
    purchase_price: number
    tax_net: number
    tax_method: string
    discount: number
    discount_method: string
    sub_total: number
    quantity: number
    imei: any
    created_at: string
    product: Product
  }
  
  export interface Product {
    id: string
    shop_id: number
    ulid: string
    user_id: number
    brand_id: number
    name: string
    slug: string
    regular_price: string
    purchase_price: string
    sell_price: string
    discount_type: string
    discounted_price: string
    min_price: number
    max_price: number
    sku: any
    stock_quantity: number
    alert_quantity: number
    sold_quantity: number
    is_taxable: number
    stock_status: string
    product_type: string
    status: string
    short_description: any
    long_description: string
    specification: string
    shipping: any
    video_url: any
    estimated_delivery: any
    rating: number
    sales_count: number
    review_count: number
    sales_timer: any
    return_policy: any
    thump_image: string
    gallery: string[]
    is_active: boolean
    external_url: any
    weight: any
    dimensions: Dimensions
    featured: number
    reviews_allowed: number
    created_at: string
    meta_data: MetaData
    metas?: Meta[]
  }
  
  export interface Dimensions {
    unit?: string
    weight: string
  }
  
  export interface MetaData {
    return_policy: any
    estimated_delivery: any
    delivery_details: any
    meta_description: string
    meta_keywords: string
    page_title: string
    url_handle: string
  }
  
  export interface Meta {
    id: number
    product_id: number
    type: string
    key: string
    value?: string
    created_at: string
    updated_at: string
  }
  
  export interface Supplier {
    id: string
    name: string
    phone: string
    email: any
    address: any
    avatar: string
  }
  
  export interface PurchasePayment {
    id: number
    ulid: string
    shop_id: number
    user_id: number
    purchase_id: number
    account_id: number
    payment_date: string
    reference: string
    amount: number
    change_amount: number
    payment_method: string
    notes: any
    created_at: string
    account: Account
  }
  
  export interface Account {
    id: number
    ulid: string
    user_id: number
    shop_id: number
    name: string
    number: string
    notes: string
    balance: number
    is_active: number
    created_at: string
  }
  
  export interface Link {
    url?: string
    label: string
    active: boolean
  }
  