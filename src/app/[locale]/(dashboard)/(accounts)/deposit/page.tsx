import { api } from '@/server/api';
import { IDepositData } from '@/types/deposit-interface';
import { DEPOSITS } from '@/server/services/deposit';
import DepositPageWrapper from '@/components/accounts/deposit/DepositPageWrapper';
import { DEPOSIT_CATEGORY } from '@/server/services/deposit-category';
import { IDepositCategoryData } from '@/types/deposit-category-interface';

const DepositPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    page: string;
    search: string;
    deposit_category_id: string;
  }>;
}) => {
  const queryParams = await searchParams;

  const deposits = await api.get<ApiResponse<IDepositData>>(
    `${DEPOSITS.GET.URL}?per_page=${15}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}&deposit_category_id=${queryParams?.deposit_category_id ?? ''}`,
    DEPOSITS.GET.TAGS,
  );

  const depositCategories = await api.get<ApiResponse<IDepositCategoryData>>(
    `${DEPOSIT_CATEGORY.GET.URL}`,
    DEPOSIT_CATEGORY.GET.TAGS,
  );

  return (
    <DepositPageWrapper
      deposits={deposits?.data}
      depositCategories={depositCategories?.data}
    />
  );
};

export default DepositPage;
