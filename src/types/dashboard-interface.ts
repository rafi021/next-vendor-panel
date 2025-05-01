export interface IDashboardRoot {
    success: boolean
    status_code: number
    message: string
    data: IDashboardData
    metadata: IDashboardMetadata
  }
  
  export interface IDashboardData {
    top_customers: TopCustomer[]
    top_products: TopProduct[]
    top_categories: TopCategory[]
    top_zones: TopZone[]
  }
  
  export interface TopProduct {
    id: number
    product_name: string
    image: string
    category_names: string
    total_orders: number
    total_order_amount: number
  }
  export interface TopCustomer {
    name: string
    image: string
    phone: string
    total_spent: number
  }
  
  export interface TopCategory {
    name: string
    image: string
    total_sale_price: number
  }
  
  export interface TopZone {
    zone_id?: number
    zone_name: string
    total_orders: number
    total_customers: number
  }
  
  export interface IDashboardMetadata {
    total_balance: number
    today_total_orders: number
    today_total_order_amount: number
    total_orders: number
    total_order_amount: number
    pending_orders: number
    pending_order_amount: number
    on_hold_orders: number
    on_hold_order_amount: number
    approved_orders: number
    approved_order_amount: number
    returned_orders: number
    returned_order_amount: number
    total_products: number
    stock_value: number
    total_quantity: number
    total_damage_quantity: number
    total_damage_amount: number
    totalExpenses: number
    net_profit: number
    roi: number
    total_chart_income: number
    total_chart_expense: number
    total_chart_profit: number
  }
  