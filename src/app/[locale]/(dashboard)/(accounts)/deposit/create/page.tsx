import { api } from '@/server/api';
import { IAccountsData } from '@/types/accounts-interface';
import { ACCOUNTS } from '@/server/services/accounts';
import AddDepositForm from '@/components/accounts/deposit/AddDepositForm';
import { DEPOSIT_CATEGORY } from '@/server/services/deposit-category';
import { IDepositCategoryData } from '@/types/deposit-category-interface';

const DepositCreatePage = async () => {
  const accounts = await api.get<ApiResponse<IAccountsData, null>>(
    ACCOUNTS.GET.URL,
    ACCOUNTS.GET.TAGS,
  );

  const depositCategories = await api.get<
    ApiResponse<IDepositCategoryData, null>
  >(DEPOSIT_CATEGORY.GET.URL, DEPOSIT_CATEGORY.GET.TAGS);

  return (
    <AddDepositForm
      accounts={accounts?.data?.data}
      depositCategories={depositCategories?.data?.data}
      title="Add New Deposit"
    />
  );
};

export default DepositCreatePage;
