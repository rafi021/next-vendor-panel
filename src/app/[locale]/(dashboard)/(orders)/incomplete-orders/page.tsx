import { api } from '@/server/api';
import { INCOMPLETE_ORDERS } from '@/server/services/order';
import { IIncompleteOrderData } from '@/types/incomplete-order-interface';
import IncompleteOrderPageWrapper from '@/components/order/incomplete-orders/IncompleteOrderPageWrapper';

const IncompleteOrderPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page: string; search: string }>;
}) => {
  const queryParams = await searchParams;
  const incompleteOrders = await api.get<ApiResponse<IIncompleteOrderData>>(
    `${INCOMPLETE_ORDERS.GET.URL}?per_page=${15}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}`,
    INCOMPLETE_ORDERS.GET.TAGS,
  );

  return (
    <IncompleteOrderPageWrapper incompleteOrders={incompleteOrders?.data} />
  );
};

export default IncompleteOrderPage;
