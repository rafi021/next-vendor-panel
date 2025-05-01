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
import Link from 'next/link';
import { IPayrollsData } from '@/types/payroll-interface';
import { PAYROLL } from '@/server/services/payroll';

const PayrollTable = ({
  payrolls,
  activePage,
  perPage,
}: {
  payrolls: IPayrollsData;
  activePage: number;
  perPage: number;
}) => {
  const payrollSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Employee Name</TableHead>
            <TableHead>Account Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Payment Date</TableHead>
            <TableHead>Month</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payrolls?.data?.map(
            ({
              id,
              employee,
              account,
              amount,
              date,
              reference,
              month,
              year,
              method,
              status,
              notes,
              is_active,
            }, index: number) => (
              <TableRow key={id}>
                <TableCell>{payrollSerial(index)}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell>{method}</TableCell>
                <TableCell>{reference}</TableCell>
                <TableCell>{formatDate(date)}</TableCell>
                <TableCell>{month}</TableCell>
                <TableCell>{year}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{notes}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Link href={`/payroll/update/${id}`}>
                    <Button variant="white" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DeleteButton
                    url={`${PAYROLL.DELETE}/${id}`}
                    tags={PAYROLL.GET.TAGS}
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

export default PayrollTable;
