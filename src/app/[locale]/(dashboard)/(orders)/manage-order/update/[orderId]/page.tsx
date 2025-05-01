import StoreOrder from '@/components/order/store/StoreOrder';
import { api } from '@/server/api';
import { ADDRESS } from '@/server/services/address';
import { CATEGORIES } from '@/server/services/category';
import { ORDERS } from '@/server/services/order';
import { PRODUCT } from '@/server/services/product';
import { CustomerData } from '@/types/accounts-interface';
import { City } from '@/types/address-types';
import { ICategories } from '@/types/category-interfaces';
import { DeliveryFeeType, Order } from '@/types/order-interface';
import { IProductData } from '@/types/product-interface';
import { getSearchParamsWithURL } from '@/utils/get-search-params';

import { SearchParams } from 'nuqs/server';
import React from 'react';

const OrderEditPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<SearchParams>;
}) => {
  const queryParams = await searchParams;

  const orderId = (await params).orderId;

  const orderDetailsData = await api.get<ApiResponse<Order>>(
    `${ORDERS.GET.ORDERS_DETAILS.URL}/${orderId}`,
    ORDERS.GET.ORDERS_DETAILS.TAGS,
  );

  const { productUrl, customerUrl } = getSearchParamsWithURL(queryParams);

  const products = await api.get<ApiResponse<IProductData>>(
    productUrl,
    PRODUCT.GET.PRODUCTS.TAGS,
  );

  const categories = await api.get<ApiResponse<ICategories>>(
    CATEGORIES.GET.CATEGORIES.URL,
  );

  const deliveryFee = await api.get<ApiResponse<DeliveryFeeType>>(
    `/get-admin-settings?key=["shipping_costs"]`,
  );
  // // console.log('delivery fee ', deliveryFee);
  let customers;
  if (customerUrl) {
    customers = await api.get<ApiResponse<CustomerData>>(customerUrl);
  }

  const cityList = await api.get<City[]>(ADDRESS.GET.CITIES.URL);
  // // console.log(Array.isArray(cityList));

  return (
    <StoreOrder
      products={products?.data}
      categories={categories?.data}
      deliveryFee={deliveryFee.data}
      customers={customers?.data?.data}
      cityList={Array.isArray(cityList) ? cityList : []}
      order={orderDetailsData?.data}
    />
  );
};

export default OrderEditPage;
