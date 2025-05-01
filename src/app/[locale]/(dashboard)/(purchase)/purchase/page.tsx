import { api } from '@/server/api';
import { ACCOUNTS } from '@/server/services/accounts';
import { PURCHASES } from '@/server/services/purchase';
import { IAccountsData } from '@/types/accounts-interface';
import { IPurchaseData } from '@/types/purchase-interface';
import PurchasePageWrapper from '@/components/purchase/purchase/PurchasePageWrapper';

const PurchasePage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page: string; search: string }>;
}) => {
  const queryParams = await searchParams;

  const purchases = await api.get<ApiResponse<IPurchaseData>>(
    `${PURCHASES.GET.URL}?per_page=${15}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}`,
    PURCHASES.GET.TAGS,
  );

  const accounts = await api.get<ApiResponse<IAccountsData>>(
    ACCOUNTS.GET.URL,
    ACCOUNTS.GET.TAGS,
  );

  return (
    <PurchasePageWrapper
      purchases={purchases?.data}
      accounts={accounts?.data?.data}
      activePage={purchases?.data?.current_page ?? 0}
      perPage={purchases?.data?.per_page ?? 0}
    />
  );
};

export default PurchasePage;
