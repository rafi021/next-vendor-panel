import { api } from '@/server/api';
import { EXPENSES } from '@/server/services/expense';
import { IExpenseData } from '@/types/expense-interface';
import { EXPENSE_CATEGORY } from '@/server/services/expense-category';
import { IExpenseCategoryData } from '@/types/expense-category-interface';
import ExpensePageWrapper from '@/components/accounts/expense/ExpensePageWrapper';

const ExpensePage = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    page: string;
    search: string;
    expense_category_id: string;
  }>;
}) => {
  const queryParams = await searchParams;

  const expenses = await api.get<ApiResponse<IExpenseData>>(
    `${EXPENSES.GET.URL}?per_page=${15}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}&expense_category_id=${queryParams?.expense_category_id ?? ''}`,
    EXPENSES.GET.TAGS,
  );

  const expenseCategories = await api.get<ApiResponse<IExpenseCategoryData>>(
    `${EXPENSE_CATEGORY.GET.URL}`,
    EXPENSE_CATEGORY.GET.TAGS,
  );

  return (
    <ExpensePageWrapper
      expenses={expenses?.data}
      expenseCategories={expenseCategories?.data}
    />
  );
};

export default ExpensePage;
