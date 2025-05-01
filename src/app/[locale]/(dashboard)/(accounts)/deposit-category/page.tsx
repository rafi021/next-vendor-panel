import { api } from '@/server/api';
import { IDepositCategoryData } from '@/types/deposit-category-interface';
import { DEPOSIT_CATEGORY } from '@/server/services/deposit-category';
import DepositCategoryPageWrapper from '@/components/accounts/deposit-category/DepositCategoryPageWrapper';

const DepositCategoryPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page: string; search: string }>;
}) => {
  const queryParams = await searchParams;
  const depositCategories = await api.get<ApiResponse<IDepositCategoryData>>(
    `${DEPOSIT_CATEGORY.GET.URL}?per_page=${15}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}`,
    DEPOSIT_CATEGORY.GET.TAGS,
  );
  return (
    <DepositCategoryPageWrapper depositCategories={depositCategories.data} />
  );
};

export default DepositCategoryPage;
