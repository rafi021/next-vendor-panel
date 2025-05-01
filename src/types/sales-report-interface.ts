export interface ISalesReportRoot {
    success: boolean
    status_code: number
    message: string
    data: ISalesReportData
    metadata: ISalesReportMetadata
  }
  
  export interface ISalesReportData {
    current_page: number
    data: ISalesProductData[]
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
  
  export interface ISalesProductData {
    id: number
    tracking_number: string
    customer_id: number
    sale_amount: number
    delivery_fee: number
    courier_cost: number
    sale_status: string
    paid_amount: number
    due_amount: number
    date: string
    payment_status: string
    profit: number
    customer: Customer
  }
  
  export interface Customer {
    id: number
    name: string
  }
  
  export interface Link {
    url?: string
    label: string
    active: boolean
  }
  
  export interface ISalesReportMetadata {
    total_sell_amount: number
    total_courier_cost: number
    total_delivery_fee: number
    total_paid_amount: number
    total_due_amount: number
    total_profit: number
    total_sale_by_date: number
    total_courier_cost_by_date: number
    total_delivery_fee_by_date: number
    total_paid_amount_by_date: number
    total_due_amount_by_date: number
    total_profit_by_data: number
    categorySales: ICategorySale[]
  }
  
  export interface ICategorySale {
    name: string
    total_sale_price:number
  }
  