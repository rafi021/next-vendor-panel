'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/utils/date-format';
import { IPurchase, IPurchaseData } from '@/types/purchase-interface';
import PurchaseActions from './PurchaseActions';
import { getStatusColor } from '@/utils/status-color';
import { Badge } from '@/components/ui/badge';
import InvoicePreview from './InvoicePreview';
import { IAccount } from '@/types/accounts-interface';
import PhoneComponent from '@/components/common/PhoneComponent';

const PurchaseTable = ({
  purchases,
  accounts,
  activePage,
  perPage,
}: {
  purchases: IPurchaseData;
  accounts?: IAccount[];
  activePage: number;
  perPage: number;
}) => {
  const purchaseSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="lg:w-[70px]">#</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Invoice Number</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Grand Amount</TableHead>
            <TableHead>Paid Amount</TableHead>
            <TableHead>Due Amount</TableHead>
            <TableHead>Paid From</TableHead>
            <TableHead>Payment Status</TableHead>

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases?.data?.map((purchase: IPurchase, index: number) => (
            <TableRow key={purchase?.id}>
              <TableCell>{purchaseSerial(index)}</TableCell>
              <TableCell>{formatDate(purchase?.date)}</TableCell>
              <TableCell className="flex gap-1 items-center">
                <InvoicePreview purchase={purchase} />
              </TableCell>
              <TableCell>
                <PhoneComponent phoneNumber={purchase?.supplier?.phone} />
              </TableCell>
              <TableCell>{purchase?.grand_total}</TableCell>
              <TableCell>{purchase?.paid_amount}</TableCell>
              <TableCell>
                {purchase?.grand_total - purchase?.paid_amount}
              </TableCell>
              <TableCell>
                {purchase?.purchase_payment?.map((payment) => (
                  <p key={payment?.id}>
                    {formatDate(payment?.payment_date)} -{' '}
                    <span className="font-bold">
                      {payment?.account?.name}:{' '}
                    </span>
                    {payment?.amount}
                  </p>
                ))}
              </TableCell>
              <TableCell className="py-2">
                <Badge
                  className={`${getStatusColor(purchase?.payment_status)} capitalize`}
                >
                  {purchase?.payment_status.split('_').join(' ')}
                </Badge>
              </TableCell>
              <TableCell className="flex gap-2 justify-end">
                <PurchaseActions purchase={purchase} accounts={accounts} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default PurchaseTable;
