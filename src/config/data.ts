import { LucideIcon } from 'lucide-react';

export const BusinessTypes = ['fashion', 'electronics', 'grocery', 'furniture'];

export const MAX_HERO_BANNERS = 5;
export const MAX_SUB_HERO_BANNERS = 3;
export const MAX_CATEGORY_SELECT_FOR_STORE_UI = 8;

export const SORT_OPTIONS: {
  name: string;
  column: string;
  direction?: 'asc' | 'desc';
  icon?: LucideIcon;
}[] = [
  {
    name: 'Customer name: Ascending',
    column: 'customer_name',
    direction: 'asc',
  },
  {
    name: 'Customer name: Descending',
    column: 'customer_name',
    direction: 'desc',
  },

  {
    name: 'Date: Ascending',
    column: 'date',
    direction: 'asc',
  },
  {
    name: 'Date: Descending',
    column: 'date',
    direction: 'desc',
  },
  {
    name: 'Delivery Fee: High to Low',
    column: 'delivery-fee-high-to-low',
    direction: 'desc',
  },
  {
    name: 'Delivery Fee: Low to High',
    column: 'delivery-fee-low-to-high',
    direction: 'asc',
  },
];

export const FILTER_OPTIONS = [
  {
    name: 'Regular Customer',
    column: 'regular_customer',
  },
  {
    name: 'New Customer',
    column: 'new_customer',
  },
  {
    name: 'Amount Due',
    column: 'amount_due',
  },
  {
    name: 'Amount Partially Paid',
    column: 'amount_partially_paid',
  },
  {
    name: 'Delivery Assigned',
    column: 'delivery_assigned',
  },
];
