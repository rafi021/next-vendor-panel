'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, Copy, Info, Printer, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AmountInfo, OrderProduct } from '@/types/order-interface';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import CopyComponent from '@/components/common/CopyComponent';
import { Button } from '@/components/ui/button';

export function InvoiceTableInfo({
  tracking_number,
  orderShortInfos,
  orderAmounts,
}: {
  tracking_number: string;
  orderShortInfos: OrderProduct[];
  orderAmounts?: AmountInfo;
}) {
  return (
    <div>
      <article className="flex items-start justify-between">
        <span className="flex gap-space6 pb-space8">
          Invoice No.
          <span className="text-blue-500">#{tracking_number}</span>
        </span>
        <PopoverClose>
          <X size={15} />
        </PopoverClose>
      </article>
      <Table className="border border-gray-200 rounded">
        {/* <TableCaption>{`A list of customer's invoice`}</TableCaption> */}
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="min-w-[40px] border-r border-gray-200">
              SL
            </TableHead>
            <TableHead className="min-w-[280px] border-r border-gray-200">
              Product Name
            </TableHead>
            <TableHead className="min-w-[40px] border-r border-gray-200">
              Qty
            </TableHead>
            <TableHead className="min-w-[70px] border-r border-gray-200">
              Price
            </TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderShortInfos.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="min-w-[40px] border-r border-gray-200">
                {product.id}
              </TableCell>
              <TableCell className="min-w-[280px] border-r border-gray-200">
                {product.name}
              </TableCell>
              <TableCell className="min-w-[40px] border-r border-gray-200">
                {product.order_quantity}
              </TableCell>
              <TableCell className="min-w-[70px] border-r border-gray-200 text-end">
                {product.sell_price}
              </TableCell>
              <TableCell>{product.subtotal}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="min-w-[40px] border-r border-gray-200"></TableCell>
            <TableCell className="min-w-[280px] border-r border-gray-200 text-end font-semibold">
              Subtotal
            </TableCell>
            <TableCell className="min-w-[40px] border-r border-gray-200"></TableCell>
            <TableCell className="min-w-[70px] border-r border-gray-200"></TableCell>
            <TableCell>৳{orderAmounts?.amount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="min-w-[40px] border-r border-gray-200"></TableCell>
            <TableCell className="min-w-[280px] border-r border-gray-200 text-end font-semibold">
              Delivery Charge
            </TableCell>
            <TableCell className="min-w-[40px] border-r border-gray-200"></TableCell>
            <TableCell className="min-w-[70px] border-r border-gray-200"></TableCell>
            <TableCell>৳{orderAmounts?.delivery_fee}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="min-w-[40px] border-r border-gray-200"></TableCell>
            <TableCell className="min-w-[280px] border-r border-gray-200 text-end font-semibold">
              Total
            </TableCell>
            <TableCell className="min-w-[40px] border-r border-gray-200"></TableCell>
            <TableCell className="min-w-[70px] border-r border-gray-200"></TableCell>
            <TableCell>৳{orderAmounts?.paid_total}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="min-w-[40px] border-r border-gray-200"></TableCell>
            <TableCell className="min-w-[280px] border-r border-gray-200 text-blue-500 text-end font-semibold">
              Amount Due
            </TableCell>
            <TableCell className="min-w-[40px] border-r border-gray-200"></TableCell>
            <TableCell className="min-w-[70px] border-r border-gray-200"></TableCell>
            <TableCell className="text-blue-500">
              ৳{orderAmounts?.due_amount}
            </TableCell>
          </TableRow>
        </TableBody>
        {/* <TableFooter>
        </TableFooter> */}
      </Table>
    </div>
  );
}
export const InvoiceListView = ({
  tracking_number,
  orderShortInfos,
  orderAmounts,
  orderId,
}: {
  tracking_number: string;
  orderShortInfos: OrderProduct[];
  orderAmounts?: AmountInfo;
  orderId: number;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <span className="text-[10px] font-normal">{tracking_number}</span>
      <div className="flex items-center justify-center gap-1 h-space16 w-[72px] text-gray-500">
        <CopyComponent value={tracking_number}>
          <></>
        </CopyComponent>

        {/* <PrinterAction orderId={orderId} /> */}
        <Link
          target="_blank"
          href={`https://molymart.codemoly.io/order-invoice-download/${orderId}`}
          className="pt-1"
        >
          <Button variant={'transparent'} className="h-auto !p-0 ">
            <Printer
              size={16}
              className="hover:text-black hover:cursor-pointer"
            />
          </Button>
        </Link>

        <Popover>
          <PopoverTrigger asChild>
            <Info size={16} className="hover:text-black hover:cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent className="w-[540px] p-space8" align="start">
            <InvoiceTableInfo
              tracking_number={tracking_number}
              orderShortInfos={orderShortInfos}
              orderAmounts={orderAmounts}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export const InvoiceDetailsView = () => {
  return <div>Invoice Details List</div>;
};

import { useReactToPrint } from 'react-to-print';
import { useOrderPdf } from '@/server/actions/order';
import Link from 'next/link';

// Printable component
const PrintableInvoice = React.forwardRef<HTMLDivElement, { orderId: number }>(
  ({ orderId }, ref) => {
    return (
      <div ref={ref}>
        <h1>Invoice #{orderId}</h1>
        <p>Customer: John Doe</p>
        <p>Total: $123.45</p>
      </div>
    );
  },
);
PrintableInvoice.displayName = 'PrintableInvoice';

// Main component
const PrinterAction = ({ orderId }: { orderId: number }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `invoice-${orderId}`,
    onAfterPrint: () => console.log('Invoice printed!'),
  });

  return (
    <>
      <Button
        variant="transparent"
        className="h-auto !p-0"
        onClick={handlePrint}
      >
        <Printer size={16} className="hover:text-black hover:cursor-pointer" />
      </Button>

      {/* Hidden printable content */}
      <div style={{ display: 'none' }}>
        <PrintableInvoice ref={printRef} orderId={orderId} />
      </div>
    </>
  );
};
