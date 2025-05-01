import { api } from '@/server/api';
import { IAccountsData } from '@/types/accounts-interface';
import { ACCOUNTS } from '@/server/services/accounts';
import AddFundTransferForm from '@/components/accounts/fund-transfer/AddFundTransferForm';

const FundTransferCreatePage = async () => {
  const accounts = await api.get<ApiResponse<IAccountsData, null>>(
    ACCOUNTS.GET.URL,
    ACCOUNTS.GET.TAGS,
  );

  return (
    <AddFundTransferForm
      accounts={accounts?.data?.data}
      title="Add New Fund Transfer"
    />
  );
};

export default FundTransferCreatePage;
