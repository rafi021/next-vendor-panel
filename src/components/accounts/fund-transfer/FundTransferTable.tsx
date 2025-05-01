'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil } from 'lucide-react';
import { formatDate } from '@/utils/date-format';
import { IFundTransfer } from '@/types/fund-transfer-interface';

const FundTransferTable = ({
  fundTransfers,
  activePage,
  perPage,
}: {
  fundTransfers: IFundTransfer[];
  activePage: number;
  perPage: number;
}) => {
  const fundTransferSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Transfer Date</TableHead>
            <TableHead>From Account</TableHead>
            <TableHead>To Account</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Transfer Amount</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fundTransfers?.map(
            ({
              id,
              from_account,
              to_account,
              amount,
              transfer_amount,
              cost,
              comment,
              created_at,
            }, index: number) => (
              <TableRow key={id}>
                <TableCell>{fundTransferSerial(index)}</TableCell>
                <TableCell>{formatDate(created_at)}</TableCell>
                <TableCell>{from_account.name}</TableCell>
                <TableCell>{to_account.name}</TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell>{transfer_amount}</TableCell>
                <TableCell>{cost}</TableCell>
                <TableCell>{comment}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Link href={`/fund-transfer/update/${id}`}>
                    <Button variant="white" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  {/* <DeleteButton
                    url={`${FUND_TRANSFER.DELETE}/${id}`}
                    tags={FUND_TRANSFER.GET.TAGS}
                  /> */}
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default FundTransferTable;
