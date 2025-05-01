import { CUSTOMERS } from '@/server/services/customer';
import { ORDERS } from '@/server/services/order';
import { PRODUCT } from '@/server/services/product';
import { SearchParams } from 'nuqs';

/**
 * Builds URLs for product and customer queries using search parameters.
 *
 * @param searchParams — An object containing optional search parameters.
 * @returns An object with productUrl and customerUrl strings.
 */
export const getSearchParamsWithURL = (searchParams: SearchParams) => {
  // Product query params
  const productParams = new URLSearchParams();

  if (searchParams?.search) {
    productParams.append(
      'search',
      Array.isArray(searchParams.search)
        ? searchParams.search.join(',')
        : searchParams.search,
    );
  }

  if (searchParams?.max_price !== undefined) {
    productParams.append('max_price', String(searchParams.max_price));
  }

  if (searchParams?.min_price !== undefined) {
    productParams.append('min_price', String(searchParams.min_price));
  }

  if (searchParams?.categories) {
    if (Array.isArray(searchParams.categories)) {
      // If array: join or stringify depending on backend expectation
      productParams.append('category_ids', searchParams.categories.join(','));
      // OR productParams.append('category_ids', JSON.stringify(searchParams.categories));
    } else {
      // Single string value
      productParams.append('category_ids', searchParams.categories);
    }
  }

  const productUrl = `${PRODUCT.GET.PRODUCTS.URL}?${productParams.toString()}`;

  // Customer query params
  const customerParams = new URLSearchParams();

  if (searchParams?.customer) {
    customerParams.append(
      'search',
      Array.isArray(searchParams.customer)
        ? searchParams.customer.join(',')
        : searchParams.customer,
    );
  }

  const customerUrl = `${CUSTOMERS.GET.CUSTOMERS.URL}?${customerParams.toString()}`;

  const orderParams = new URLSearchParams();
  if (searchParams?.search) {
    orderParams.append(
      'search',
      Array.isArray(searchParams.search)
        ? searchParams.search.join(',')
        : searchParams.search,
    );
  }
  if (searchParams?.page) {
    orderParams.append(
      'page',
      Array.isArray(searchParams.page)
        ? searchParams.page.join(',')
        : searchParams.page,
    );
  }
  if (searchParams?.date) {
    orderParams.append(
      'date',
      Array.isArray(searchParams.date)
        ? searchParams.date.join(',')
        : searchParams.date,
    );
  }
  if (searchParams?.sort_column) {
    orderParams.append(
      'sort_column',
      Array.isArray(searchParams.sort_column)
        ? searchParams.sort_column.join(',')
        : searchParams.sort_column,
    );
  }
  if (searchParams?.sort_direction) {
    orderParams.append(
      'sort_direction',
      Array.isArray(searchParams.sort_direction)
        ? searchParams.sort_direction.join(',')
        : searchParams.sort_direction,
    );
  }
  if (searchParams?.order_status) {
    orderParams.append(
      'order_status',
      Array.isArray(searchParams.order_status)
        ? searchParams.order_status.join(',')
        : searchParams.order_status,
    );
  }

  const orderUrl = `${ORDERS.GET.ORDERS.URL}?per_page=10&${orderParams.toString()}`;

  return { productUrl, customerUrl, orderUrl };
};
