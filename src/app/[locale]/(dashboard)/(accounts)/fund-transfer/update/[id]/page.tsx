import { api } from '@/server/api';
import { ACCOUNTS } from '@/server/services/accounts';
import { IAccountsData } from '@/types/accounts-interface';
import { IFundTransfer } from '@/types/fund-transfer-interface';
import { FUND_TRANSFER } from '@/server/services/fund-transfer';
import AddFundTransferForm from '@/components/accounts/fund-transfer/AddFundTransferForm';

const FundTransferUpdatePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const fundTransfer = await api.get<ApiResponse<IFundTransfer>>(
    `${FUND_TRANSFER.GET.URL}/${id}`,
    FUND_TRANSFER.GET.TAGS,
  );

  const accounts = await api.get<ApiResponse<IAccountsData, null>>(
    ACCOUNTS.GET.URL,
    ACCOUNTS.GET.TAGS,
  );

  return (
    <AddFundTransferForm
      data={fundTransfer?.data}
      accounts={accounts?.data?.data}
      title="Update Fund Transfer"
    />
  );
};

export default FundTransferUpdatePage;
