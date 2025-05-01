export interface IStockReportRoot {
  success: boolean
  status_code: number
  message: string
  data: IStockReportData
  metadata: IStockReportMetadata
}

export interface IStockReportData {
  current_page: number
  data: IStockProducts[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: any
  path: string
  per_page: number
  prev_page_url: any
  to: number
  total: number
}

export interface IStockProducts {
  id: number
  name: string
  thump_image: string
  sold_quantity: number
  stock_quantity: number
  stock_amount: number
  sale_amount?: number
  damage_quantity?: number
  damage_total?: number
  categories: ICategories[]
  meta_data: MetaData
}

export interface ICategories {
  id: number
  name: string
  pivot: IPivot
}

export interface IPivot {
  product_id: number
  category_id: number
}

export interface MetaData {
  return_policy: string
  estimated_delivery: string
  delivery_details: string
  meta_description: string
  meta_keywords: string
  page_title: string
  url_handle: string
}

export interface Link {
  url?: string
  label: string
  active: boolean
}

export interface IStockReportMetadata {
  total_stock_amount: number
  total_sell_amount: number
  total_quantity: number
  total_sold_quantity: string
  total_products: number
  total_damaged_quantity: number
  damage_total: number
  total_damaged_quantity_by_date: number
  damage_total_by_date: string
  total_stock_by_date: string
  total_stock_amount_by_date: number
  total_sold_quantity_by_date: string
  total_sale_by_date: number
}
