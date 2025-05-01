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
import { IDeposit } from '@/types/deposit-interface';
import { DEPOSITS } from '@/server/services/deposit';
import Link from 'next/link';

const DepositTable = ({ deposits, activePage, perPage }: { deposits: IDeposit[], activePage: number, perPage: number }) => {
  const depositSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Deposit Date</TableHead>
            <TableHead>Account Name</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead>Deposit Category</TableHead>
            <TableHead>Deposit Amount</TableHead>
            <TableHead>Deposit Note</TableHead>
            {/* <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {deposits?.map(
            ({
              id,
              account,
              deposit_category,
              amount,
              date,
              notes,
              is_active,
            }, index: number) => (
              <TableRow key={id}>
                <TableCell>{depositSerial(index)}</TableCell>
                <TableCell>{formatDate(date)}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.number}</TableCell>
                <TableCell>{deposit_category.name}</TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell>{notes}</TableCell>
                {/* <TableCell>
                  <StatusUpdate
                    isActive={is_active == 1 ? true : false}
                    url={`${DEPOSITS.PUT.STATUS_UPDATE}/${id}`}
                    tags={DEPOSITS.GET.TAGS}
                  />
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Link href={`/deposit/update/${id}`}>
                    <Button variant="white" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DeleteButton
                    url={`${DEPOSITS.DELETE}/${id}`}
                    tags={DEPOSITS.GET.TAGS}
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

export default DepositTable;
