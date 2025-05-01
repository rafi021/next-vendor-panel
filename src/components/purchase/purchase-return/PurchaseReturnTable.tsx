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
import { Eye } from 'lucide-react';
import { formatDate } from '@/utils/date-format';
import { IPurchaseReturnData } from '@/types/purchase-return-interface';

const PurchaseReturnTable = ({
  purchaseReturns,
  activePage,
  perPage,
}: {
  purchaseReturns: IPurchaseReturnData;
  activePage: number;
  perPage: number;
}) => {
  const purchaseReturnSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Return Date</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchaseReturns?.data?.map(
            ({ id, supplier, date, payment_status, grand_total, notes }, index: number) => (
              <TableRow key={id}>
                <TableCell>{purchaseReturnSerial(index)}</TableCell>
                <TableCell>{supplier?.name}</TableCell>
                <TableCell>{formatDate(date)}</TableCell>
                <TableCell>{grand_total}</TableCell>
                <TableCell>{payment_status}</TableCell>
                <TableCell>{notes}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Link href={`/purchase-return/view/${id}`}>
                    <Button variant="white" size="icon">
                      <Eye className="h-4 w-4" />
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

export default PurchaseReturnTable;
