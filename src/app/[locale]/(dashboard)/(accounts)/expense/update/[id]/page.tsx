import { api } from '@/server/api';
import { IExpense } from '@/types/expense-interface';
import { EXPENSES } from '@/server/services/expense';
import { ACCOUNTS } from '@/server/services/accounts';
import { IAccountsData } from '@/types/accounts-interface';
import { EXPENSE_CATEGORY } from '@/server/services/expense-category';
import AddExpenseForm from '@/components/accounts/expense/AddExpenseForm';
import { IExpenseCategoryData } from '@/types/expense-category-interface';

const ExpenseUpdatePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const expenseData = await api.get<ApiResponse<IExpense>>(
    `${EXPENSES.GET.URL}/${id}`,
    EXPENSES.GET.TAGS,
  );

  const accounts = await api.get<ApiResponse<IAccountsData, null>>(
    ACCOUNTS.GET.URL,
    ACCOUNTS.GET.TAGS,
  );
  const expenseCategories = await api.get<
    ApiResponse<IExpenseCategoryData, null>
  >(EXPENSE_CATEGORY.GET.URL, EXPENSE_CATEGORY.GET.TAGS);

  return (
    <AddExpenseForm
      data={expenseData?.data}
      accounts={accounts?.data?.data}
      expenseCategories={expenseCategories?.data?.data}
      title="Update Expense"
    />
  );
};

export default ExpenseUpdatePage;
