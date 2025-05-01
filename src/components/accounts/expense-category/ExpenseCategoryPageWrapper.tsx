'use client';

import { Card } from '@/components/ui/card';
import { DateSelect } from '@/components/common/DateSelect';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import SortAndFilterComponent from '@/components/common/SortAndFilterComponent';
import { IExpenseCategoryData } from '@/types/expense-category-interface';
import AddExpenseCategory from './AddExpenseCategory';
import ExpenseCategoryTable from './ExpenseCategoryTable';
import { FILTER_OPTIONS, SORT_OPTIONS } from '@/config/data';
import PaginateAction from '@/components/common/PaginateAction';

const ExpenseCategoryPageWrapper = ({
  expenseCategories,
}: {
  expenseCategories: IExpenseCategoryData;
}) => {
  return (
    <Card className="p-space16">
      <div className="flex justify-between items-center border-b border-gray-200 pb-space16">
        <div>
          {' '}
          <h1 className="text-md font-semibold">Expense Category</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            <SearchInput wrapperClasses="h-[40px]" />
            {/* <div className="relative flex">
              <SortAndFilterComponent
                label="Sort"
                triggerClassName="rounded-r-none"
                fields={SORT_OPTIONS}
                containerClassName="w-54 border-r-none"
              />
              <SortAndFilterComponent
                fields={FILTER_OPTIONS}
                triggerClassName="rounded-l-none"
                label="Filter"
              />
            </div>
            <DateSelect /> */}
            <AddExpenseCategory />
          </div>
        </div>
      </div>

      {expenseCategories?.data?.length > 0 ? (
        <ExpenseCategoryTable expenseCategories={expenseCategories?.data}
          activePage={expenseCategories?.current_page ?? 0}
          perPage={expenseCategories?.per_page ?? 0}
        />
      ) : (
        <EmptyTableData
          title="There is no expense category created here yet!"
          description="Add expense category to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={<AddExpenseCategory />}
        />
      )}
      <PaginateAction
        total={expenseCategories?.total ?? 0}
        perPage={expenseCategories?.per_page ?? 0}
        activePage={expenseCategories?.current_page ?? 0}
      />
    </Card>
  );
};

export default ExpenseCategoryPageWrapper;
