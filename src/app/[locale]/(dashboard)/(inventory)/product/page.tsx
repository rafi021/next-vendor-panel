import React from 'react';
import { api } from '@/server/api';
import { PRODUCT } from '@/server/services/product';
import { IProductData } from '@/types/product-interface';
import ProductPageWrapper from '@/components/inventory/product/ProductPageWrapper';

const ProductPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    status: string;
    page: string;
    search: string;
    sort: string;
    order: string;
    date: string;
  }>;
}) => {
  const queryParams = await searchParams;

  const productUrl = `${PRODUCT.GET.PRODUCTS.URL}?status=${queryParams?.status ?? ''}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}&sort=${queryParams?.sort ?? ''}&order=${queryParams?.order ?? ''}&date=${queryParams?.date ?? ''}`;

  const product = await api.get<
    ApiResponse<
      IProductData,
      {
        active_count: number;
        inactive_count: number;
        total_count: number;
        stock_value: number;
        total_purchase_amount: number;
        total_paid_amount: number;
        total_due_amount: number;
      }
    >
  >(productUrl, PRODUCT.GET.PRODUCTS.TAGS);

  return (
    <ProductPageWrapper
      products={product?.data}
      metadata={
        product?.metadata ?? {
          active_count: 0,
          inactive_count: 0,
          total_count: 0,
          stock_value: 0,
          total_purchase_amount: 0,
          total_paid_amount: 0,
          total_due_amount: 0,
        }
      }
    />
  );
};

export default ProductPage;
