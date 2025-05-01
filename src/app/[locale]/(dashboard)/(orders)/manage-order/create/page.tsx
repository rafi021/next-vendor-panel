import { api } from '@/server/api';
import { City } from '@/types/address-types';
import { SearchParams } from 'nuqs/server';
import { PRODUCT } from '@/server/services/product';
import { ADDRESS } from '@/server/services/address';
import { CATEGORIES } from '@/server/services/category';
import { IProductData } from '@/types/product-interface';
import { CustomerData } from '@/types/accounts-interface';
import { ICategories } from '@/types/category-interfaces';
import { DeliveryFeeType } from '@/types/order-interface';
import StoreOrder from '@/components/order/store/StoreOrder';
import { getSearchParamsWithURL } from '@/utils/get-search-params';

const OrderCreate = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const queryParams = await searchParams;

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

  let customers;
  if (customerUrl) {
    customers = await api.get<ApiResponse<CustomerData>>(customerUrl);
  }

  const cityList = await api.get<City[]>(ADDRESS.GET.CITIES.URL);

  return (
    <StoreOrder
      products={products?.data}
      categories={categories?.data}
      deliveryFee={deliveryFee?.data}
      customers={customers?.data?.data}
      cityList={Array.isArray(cityList) ? cityList : []}
    />
  );
};

export default OrderCreate;
