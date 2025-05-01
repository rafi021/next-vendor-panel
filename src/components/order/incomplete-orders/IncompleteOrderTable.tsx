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
import { IIncompleteOrder } from '@/types/incomplete-order-interface';
import PhoneComponent from '@/components/common/PhoneComponent';
const IncompleteOrderTable = ({
  incompleteOrders,
  activePage,
  perPage,
}: {
  incompleteOrders: IIncompleteOrder[];
  activePage: number;
  perPage: number;
}) => {
  const incompleteOrderSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Products</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {incompleteOrders?.map(
          (
            { id, customer_name, customer_phone, products, total, created_at },
            index,
          ) => (
            <TableRow key={id}>
              <TableCell>{incompleteOrderSerial(index)}</TableCell>
              <TableCell>{formatDate(created_at)}</TableCell>
              <TableCell>{customer_name}</TableCell>
              <TableCell>
                <PhoneComponent phoneNumber={customer_phone} />
              </TableCell>
              <TableCell>
                {products?.map((product, idx) => (
                  <div key={idx} className="flex text-sm mb-1 gap-2">
                    <span className="font-medium">
                      {product.name.length > 20
                        ? `${product.name.substring(0, 20)}...`
                        : product.name}{' '}
                      -
                    </span>
                    <div className="flex gap-2">
                      <span className="text-gray-500 font-medium">
                        Qty: {product.qty} -
                      </span>
                      <span className="text-gray-500 font-medium">
                        Subtotal:{product.subtotal}
                      </span>
                    </div>
                  </div>
                ))}
              </TableCell>
              <TableCell>{total}</TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};

export default IncompleteOrderTable;
