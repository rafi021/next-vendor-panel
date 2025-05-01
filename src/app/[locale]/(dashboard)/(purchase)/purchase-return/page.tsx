import { api } from '@/server/api';
import { PURCHASES_RETURN } from '@/server/services/purchase-return';
import { IPurchaseReturnData } from '@/types/purchase-return-interface';
import PurchaseReturnPageWrapper from '@/components/purchase/purchase-return/PurchaseReturnPageWrapper';

const PurchaseReturnPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page: string; search: string }>;
}) => {
  const queryParams = await searchParams;
  const purchaseReturns = await api.get<ApiResponse<IPurchaseReturnData>>(
    `${PURCHASES_RETURN.GET.INDEX.URL}?per_page=${15}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}`,
    PURCHASES_RETURN.GET.INDEX.TAGS,
  );

  return <PurchaseReturnPageWrapper purchaseReturns={purchaseReturns?.data} />;
};

export default PurchaseReturnPage;
