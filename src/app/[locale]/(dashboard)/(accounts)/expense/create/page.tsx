import { api } from '@/server/api';
import { ACCOUNTS } from '@/server/services/accounts';
import { IAccountsData } from '@/types/accounts-interface';
import { EXPENSE_CATEGORY } from '@/server/services/expense-category';
import { IExpenseCategoryData } from '@/types/expense-category-interface';
import AddExpenseForm from '@/components/accounts/expense/AddExpenseForm';

const ExpenseCreatePage = async () => {
  const accounts = await api.get<ApiResponse<IAccountsData, null>>(
    ACCOUNTS.GET.URL,
    ACCOUNTS.GET.TAGS,
  );

  const expenseCategories = await api.get<
    ApiResponse<IExpenseCategoryData, null>
  >(EXPENSE_CATEGORY.GET.URL, EXPENSE_CATEGORY.GET.TAGS);

  return (
    <AddExpenseForm
      accounts={accounts?.data?.data}
      expenseCategories={expenseCategories?.data?.data}
      title="Add New Expense"
    />
  );
};

export default ExpenseCreatePage;
