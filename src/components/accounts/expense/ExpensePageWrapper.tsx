'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import ExpenseTable from './ExpenseTable';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SortAndFilterComponent, {
  Field,
} from '@/components/common/SortAndFilterComponent';
import { IExpenseData } from '@/types/expense-interface';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import PaginateAction from '@/components/common/PaginateAction';
import { IExpenseCategoryData } from '@/types/expense-category-interface';

const ExpensePageWrapper = ({
  expenses,
  expenseCategories,
}: {
  expenses: IExpenseData;
  expenseCategories: IExpenseCategoryData;
}) => {
  const filterOptions: Field[] = expenseCategories?.data?.map(
    (expenseCategory) => ({
      name: expenseCategory.name,
      column: String(expenseCategory.id),
    }),
  );


  return (
    <Card className="p-space16">
      <div className="flex justify-between items-center border-b border-gray-200 pb-space16">
        <div>
          {' '}
          <h1 className="text-md font-semibold">Expenses</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            <SearchInput wrapperClasses="h-[40px]" />
            <div className="relative flex">
              <SortAndFilterComponent
                label="Filter"
                type="single"
                fields={filterOptions}
                queryKeys={{
                  filterKey: 'expense_category_id',
                }}
              />
            </div>
            {/* <DateSelect /> */}
            <Link href="/expense/create">
              <Button>
                <Plus className="w-4 h-4" />
                Add New Expense
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {expenses?.data?.length > 0 ? (
        <ExpenseTable
          expenses={expenses?.data}
          activePage={expenses?.current_page ?? 0}
          perPage={expenses?.per_page ?? 0}
        />
      ) : (
        <EmptyTableData
          title="There is no deposit category created here yet!"
          description="Add deposit category to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={''}
        />
      )}
      <PaginateAction
        total={expenses?.total ?? 0}
        perPage={expenses?.per_page ?? 0}
        activePage={expenses?.current_page ?? 0}
      />
    </Card>
  );
};

export default ExpensePageWrapper;
