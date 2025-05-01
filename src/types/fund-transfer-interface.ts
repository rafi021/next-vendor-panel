 export type IFundTransferData = PaginateType<IFundTransfer[]>;

export interface IFundTransfer {
    id: string
    ulid: string
    user_id: number
    shop_id: number
    from_account_id: string
    to_account_id: string
    amount: string
    cost: string
    transfer_amount: string
    evidence: string | null
    comment: string
    created_at: string
    from_account: FromAccount
    to_account: ToAccount
    expense: any
  }
  
  export interface FromAccount {
    id: number
    name: string
    balance: number
  }
  
  export interface ToAccount {
    id: number
    name: string
    balance: number
  }
