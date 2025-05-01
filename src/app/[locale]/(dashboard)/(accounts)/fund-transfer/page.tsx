import { api } from '@/server/api';
import { FUND_TRANSFER } from '@/server/services/fund-transfer';
import { IFundTransferData } from '@/types/fund-transfer-interface';
import FundTransferPageWrapper from '@/components/accounts/fund-transfer/FundTransferPageWrapper';

const FundTransferPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page: string; search: string }>;
}) => {
  const queryParams = await searchParams;
  const fundTransfers = await api.get<ApiResponse<IFundTransferData>>(
    `${FUND_TRANSFER.GET.URL}?per_page=${15}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}`,
    FUND_TRANSFER.GET.TAGS,
  );

  return <FundTransferPageWrapper fundTransfers={fundTransfers?.data} />;
};

export default FundTransferPage;
