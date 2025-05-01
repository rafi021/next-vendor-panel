import React from 'react';
import { api } from '@/server/api';
import { SUPPLIERS } from '@/server/services/suppliers';
import { ISupplierData } from '@/types/supplier-interface';
import SupplierPageWrapper from '@/components/users/supplier/SupplierPageWrapper';

const SupplierPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    page: string;
    party_type?: string;
    sort_direction?: string;
    search: string;
  }>;
}) => {
  const queryParams = await searchParams;

  const supplierUrl = `${SUPPLIERS.GET.URL}?per_page=${10}&page=${queryParams?.page ?? ''}&party_type=${queryParams?.party_type ?? ''}&sort=${queryParams?.sort_direction ?? 'asc'}&search=${queryParams?.search ?? ''}`;

  const suppliers = await api.get<
    ApiResponse<
      ISupplierData,
      {
        total_supplier: number;
        total_due_amount: number;
        total_paid_amount: number;
        total_purchase_amount: number;
        supplier_type_counts: {
          DEALER: number;
          DISTRIBUTOR: number;
          PRODUCER: number;
        };
      }
    >
  >(supplierUrl, SUPPLIERS.GET.TAGS);
  return (
    <SupplierPageWrapper
      suppliers={suppliers?.data}
      metadata={
        suppliers?.metadata ?? {
          total_supplier: 0,
          total_due_amount: 0,
          total_paid_amount: 0,
          total_purchase_amount: 0,
          supplier_type_counts: {
            DEALER: 0,
            DISTRIBUTOR: 0,
            PRODUCER: 0,
          },
        }
      }
    />
  );
};

export default SupplierPage;
