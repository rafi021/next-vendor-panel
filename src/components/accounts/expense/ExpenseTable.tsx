'use client';

import Link from 'next/link';
import { Pencil } from 'lucide-react';
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
import DeleteButton from '@/components/common/DeleteButton';
import StatusUpdate from '@/components/common/StatusUpdate';
import { IExpense } from '@/types/expense-interface';
import { EXPENSES } from '@/server/services/expense';

const ExpenseTable = ({
  expenses,
  activePage,
  perPage,
}: {
  expenses: IExpense[];
  activePage: number;
  perPage: number;
}) => {
  const expenseSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Expense Date</TableHead>
            <TableHead>Account Name</TableHead>
            <TableHead>Expense Category</TableHead>
            <TableHead>Expense Amount</TableHead>
            <TableHead>Expense Note</TableHead>
            {/* <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses?.map(
            (
              { id, account, expense_category, amount, date, notes, is_active },
              index: number,
            ) => (
              <TableRow key={id}>
                <TableCell>{expenseSerial(index)}</TableCell>
                <TableCell>{formatDate(date)}</TableCell>
                <TableCell>{account?.name}</TableCell>
                <TableCell>{expense_category?.name}</TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell>{notes}</TableCell>
                {/* <TableCell>
                  <StatusUpdate
                    isActive={is_active == 1 ? true : false}
                    url={`${EXPENSES.PUT.STATUS_UPDATE}/${id}`}
                    tags={EXPENSES.GET.TAGS}
                  />
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Link href={`/expense/update/${id}`}>
                    <Button variant="white" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DeleteButton
                    url={`${EXPENSES.DELETE}/${id}`}
                    tags={EXPENSES.GET.TAGS}
                  />
                </TableCell> */}
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ExpenseTable;
