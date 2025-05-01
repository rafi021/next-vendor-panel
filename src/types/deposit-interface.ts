 export type IDepositData = PaginateType<IDeposit[]>;
 
 export interface IDeposit {
    id: string
    ulid: string
    user_id: number
    shop_id: number
    account_id: string
    deposit_category_id: string
    date: string
    amount: string
    evidence: string
    notes: string
    created_at: string
    is_active: number
    account: Account
    deposit_category: DepositCategory
  }
  
  export interface Account {
    id: string
    name: string
    number: string
    balance: number
  }
  
  export interface DepositCategory {
    id: string
    name: string
  }
