import { api } from '@/server/api';
import { IExpenseCategoryData } from '@/types/expense-category-interface';
import { EXPENSE_CATEGORY } from '@/server/services/expense-category';
import ExpenseCategoryPageWrapper from '@/components/accounts/expense-category/ExpenseCategoryPageWrapper';

const ExpenseCategoryPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page: string; search: string }>;
}) => {
  const queryParams = await searchParams;

  const expenseCategories = await api.get<ApiResponse<IExpenseCategoryData>>(
    `${EXPENSE_CATEGORY.GET.URL}?per_page=${15}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}`,
    EXPENSE_CATEGORY.GET.TAGS,
  );
  return (
    <ExpenseCategoryPageWrapper expenseCategories={expenseCategories.data} />
  );
};

export default ExpenseCategoryPage;
