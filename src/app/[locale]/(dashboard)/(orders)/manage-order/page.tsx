import { api } from '@/server/api';
import { SearchParams } from 'nuqs/server';
import { SmsTemplateData } from '@/types/sms';
import { ORDERS } from '@/server/services/order';
import { SMS_CATEGORIES } from '@/server/services/sms';
import { getSearchParamsWithURL } from '@/utils/get-search-params';
import { OrderData, OrderMetaData } from '@/types/order-interface';
import OrderPageWrapper from '@/components/order/OrderPageWrapper';

const OrderPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const queryParams = await searchParams;


  const { orderUrl } = getSearchParamsWithURL(queryParams);

  const orderData = await api.get<ApiResponse<OrderData, OrderMetaData>>(
    orderUrl,
    ORDERS.GET.ORDERS.TAGS,
  );

  const smsCatData = await api.get<ApiResponse<SmsTemplateData>>(
    SMS_CATEGORIES.GET.SMS_CATEGORIES.URL,
    SMS_CATEGORIES.GET.SMS_CATEGORIES.TAGS,
  );

  return (
    <div>
      <OrderPageWrapper
        orders={orderData?.data?.data}
        meta={orderData?.metadata}
        smsCatData={smsCatData?.data?.data}
        paginateData={orderData?.data}
      />
    </div>
  );
};

export default OrderPage;
