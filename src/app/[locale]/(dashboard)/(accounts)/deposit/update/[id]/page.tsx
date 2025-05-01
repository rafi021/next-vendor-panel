import { api } from '@/server/api';
import { IAccountsData } from '@/types/accounts-interface';
import { ACCOUNTS } from '@/server/services/accounts';
import AddDepositForm from '@/components/accounts/deposit/AddDepositForm';
import { IDeposit } from '@/types/deposit-interface';
import { DEPOSITS } from '@/server/services/deposit';
import { DEPOSIT_CATEGORY } from '@/server/services/deposit-category';
import { IDepositCategoryData } from '@/types/deposit-category-interface';

const DepositUpdatePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const depositData = await api.get<ApiResponse<IDeposit>>(
    `${DEPOSITS.GET.URL}/${id}`,
    DEPOSITS.GET.TAGS,
  );

  const accounts = await api.get<ApiResponse<IAccountsData, null>>(
    ACCOUNTS.GET.URL,
    ACCOUNTS.GET.TAGS,
  );
  const depositCategories = await api.get<
    ApiResponse<IDepositCategoryData, null>
  >(DEPOSIT_CATEGORY.GET.URL, DEPOSIT_CATEGORY.GET.TAGS);

  return (
    <AddDepositForm
      data={depositData?.data}
      accounts={accounts?.data?.data}
      depositCategories={depositCategories?.data?.data}
      title="Update Deposit"
    />
  );
};

export default DepositUpdatePage;
