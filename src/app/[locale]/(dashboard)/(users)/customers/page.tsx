import React from 'react';
import { api } from '@/server/api';
import { CUSTOMERS } from '@/server/services/customer';
import { ICustomerData } from '@/types/customer-interface';
import CustomerPageWrapper from '@/components/users/customer/CustomerPageWrapper';

const CustomerPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page: string; status: string; search: string }>;
}) => {
  const queryParams = await searchParams;

  const customerUrl = `${CUSTOMERS.GET.CUSTOMERS.URL}?per_page=${10}&page=${queryParams?.page ?? ''}&status=${queryParams?.status ?? ''}&search=${queryParams?.search ?? ''}`;

  const customers = await api.get<
    ApiResponse<
      ICustomerData,
      {
        customer_active_count: { active: number; inactive: number };
        total_customer: number;
        total_orders: number;
        total_paid_amount: number;
        total_due_amount: number;
      }
    >
  >(customerUrl, CUSTOMERS.GET.CUSTOMERS.TAGS);

  return (
    <CustomerPageWrapper
      customers={customers?.data}
      metadata={
        customers?.metadata ?? {
          total_customer: 0,
          total_orders: 0,
          total_paid_amount: 0,
          total_due_amount: 0,
          customer_active_count: { active: 0, inactive: 0 },
        }
      }
    />
  );
};

export default CustomerPage;
