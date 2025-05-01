'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/utils/date-format';
import { Pencil } from 'lucide-react';
import DeleteButton from '@/components/common/DeleteButton';
import StatusUpdate from '@/components/common/StatusUpdate';
import { Image } from '@/components/common/Image';
import AddExpenseCategory from './AddExpenseCategory';
import { EXPENSE_CATEGORY } from '@/server/services/expense-category';
import { IExpenseCategory } from '@/types/expense-category-interface';

const ExpenseCategoryTable = ({
  expenseCategories,
  activePage,
  perPage,
}: {
  expenseCategories: IExpenseCategory[];
  activePage: number;
  perPage: number;
}) => {
  const expenseCategorySerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Icon</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Expense Amount</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenseCategories?.map(
            ({
              id,
              name,
              icon,
              description,
              expenses_sum_amount,
              created_at,
              is_active,
            }, index: number) => (
              <TableRow key={id}>
                <TableCell>{expenseCategorySerial(index)}</TableCell>
                <TableCell>
                  <Image
                    src={icon}
                    alt={name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-full w-full object-contain"
                    wrapperClasses="h-[32px] max-w-max"
                  />
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{expenses_sum_amount}</TableCell>
                <TableCell>{formatDate(created_at)}</TableCell>
                <TableCell>
                  <StatusUpdate
                    isActive={is_active == 1 ? true : false}
                    url={`${EXPENSE_CATEGORY.PUT.STATUS_UPDATE}/${id}`}
                    tags={EXPENSE_CATEGORY.GET.TAGS}
                  />
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <AddExpenseCategory
                    title="Edit Expense Category"
                    data={{
                      id,
                      name,
                      icon,
                      description,
                    }}
                  >
                    <Button variant="white" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </AddExpenseCategory>
                  <DeleteButton
                    url={`${EXPENSE_CATEGORY.DELETE}/${id}`}
                    tags={EXPENSE_CATEGORY.GET.TAGS}
                  />
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ExpenseCategoryTable;
