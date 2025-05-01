import { api } from '@/server/api';
import { IAccountsData } from '@/types/accounts-interface';
import { ACCOUNTS } from '@/server/services/accounts';
import AccountsPageWrapper from '@/components/accounts/account/AccountsPageWrapper';

const AccountsPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page: string; search: string }>;
}) => {
  const queryParams = await searchParams;
  const accounts = await api.get<ApiResponse<IAccountsData>>(
    `${ACCOUNTS.GET.URL}?per_page=${15}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}`,
    ACCOUNTS.GET.TAGS,
  );
  return <AccountsPageWrapper accounts={accounts?.data} />;
};

export default AccountsPage;
