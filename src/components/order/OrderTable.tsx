'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Calendar, Phone, RefreshCcw, Truck, User, Zap } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { InvoiceListView } from './components/InvoiceDetails';
import {
  CustomerInfoList,
  CustomerPhoneListView,
} from './components/CustomerInfo';
import { PaymentInfoList } from './components/PaymentInfo';
import { StatusListView } from './components/Status';
import OrderNoteForm from './components/OrderNoteForm';
import OrderOptions from './components/OrderOptions';
import { Order } from '@/types/order-interface';
import { formatDate } from '@/utils/date-format';
import { useEffect, useTransition } from 'react';
import SendToCourier from './components/SendToCourier';
import { Badge } from '../ui/badge';
import { getStatusColor } from '@/utils/status-color';
import { Button } from '../ui/button';
import { PATHAO } from '@/server/services/pathao';
import { toast } from 'sonner';
import { api } from '@/server/api';
import Link from 'next/link';

type OrderTableProps = {
  orders: Order[];
  selectedOrder: number[];
  toggleSelectedOrderIds: (ids: number | number[]) => void;
  toggleAllOrders: () => void;
  clearOrdersFromSelectedList: () => void;
};

const OrderTable = ({
  orders,
  selectedOrder,
  toggleSelectedOrderIds,
  toggleAllOrders,
  clearOrdersFromSelectedList,
}: OrderTableProps) => {
  // // console.log({ orders });
  const [isLoading, startTransition] = useTransition();
  const handleDeliveryStatusCheck = async (orderId: number) => {
    startTransition(async () => {
      const res = await api.post(
        PATHAO.GET_DELIVERY_STATUS_FROM_PATHAO.POST,
        {
          order_id: orderId,
        },
        PATHAO.GET_DELIVERY_STATUS_FROM_PATHAO.TAGS,
      );
      // // console.log(res);
      toast.success(res.message ?? 'Success');
      if (res?.success) {
        // // console.log('success');
        toast.success('Success');
      }
    });
    // try {
    //   const response = await checkCourierValidity(orderId);
    //   // console.log('Courier status check response:', response);
    // } catch (error) {
    //   console.error('Error checking courier status:', error);
    // }
  };
  useEffect(() => {
    return () => {
      clearOrdersFromSelectedList();
    };
  }, []);

  return (
    <Table className="mt-5 text-xs min-w-[1212px]">
      <TableHeader>
        <TableRow className="px-space8">
          <TableHead>
            <div className="flex items-center gap-space8">
              <Checkbox
                checked={orders.length === selectedOrder.length}
                onCheckedChange={() => {
                  toggleAllOrders();
                }}
              />
              # Invoice
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space8">
              <Calendar size={12} /> Date
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space8">
              <User size={12} /> Customer Info
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space8">
              <Phone size={12} />
              Contact
            </div>
          </TableHead>
          <TableHead>৳ Payments</TableHead>
          <TableHead>
            <div className="flex items-center gap-space8">
              <Truck size={12} /> Delivery
            </div>
          </TableHead>
          <TableHead>৳ Courier Fee</TableHead>
          <TableHead>
            <div className="flex items-center gap-space8">
              <Truck size={12} /> Status
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space8">
              <Zap size={12} /> Action
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((order) => (
          <TableRow key={order?.id}>
            <TableCell className="flex items-center py-space16 justify-start">
              <Checkbox
                checked={selectedOrder?.includes(order?.id)}
                onCheckedChange={(checked) => {
                  toggleSelectedOrderIds(order?.id);
                }}
              />
              <InvoiceListView
                orderId={order.id}
                tracking_number={order?.tracking_number}
                orderShortInfos={order?.order_products}
                orderAmounts={order?.amount_info}
              />
            </TableCell>
            <TableCell>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">Created</span>
                  <span className="text-gray-500 text-xs">
                    {formatDate(order?.created_at, 'D_M_Y_T')}
                  </span>
                </div>
                <div className=" flex items-center gap-1">
                  {order?.status_change_at && (
                    <>
                      <span className="font-semibold">Status Changed</span>
                      <span className="text-gray-500 text-xs">
                        {formatDate(order?.status_change_at, 'D_M_Y_T')}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <CustomerInfoList
                customer={order?.customer}
                billing_address={order?.billing_address}
                shipping_address={order?.shipping_address}
              />
              <span className="text-gray-500 text-xs text-wrap w-1/5">
                {order?.billing_address}
              </span>
            </TableCell>
            <TableCell>
              <CustomerPhoneListView customerPhoneNo={order?.customer?.phone} />
            </TableCell>
            <TableCell>
              <PaymentInfoList
                // paid_total={order.amount_info.paid_amount}
                // total={order.amount_info.paid_total}
                paid_amount={order?.amount_info?.paid_amount}
                due_amount={order?.amount_info?.due_amount}
                payment_status={order?.payment_status}
              />
            </TableCell>
            <TableCell>
              {order?.order_status === 'approved' && (
                <SendToCourier orderId={order?.id} />
              )}
              {order?.delivery && (
                <div>
                  <p className="capitalize text-sm font-normal">
                    {order?.delivery?.delivery_partner}
                  </p>
                  <p className="flex gap-space4">
                    ID:
                    <Link
                      href={`https://merchant.pathao.com/courier/orders/${order?.delivery?.consignment_id}`}
                      className="text-blue-500 underline"
                      target="_blank"
                    >
                      {order?.delivery?.consignment_id}
                    </Link>
                  </p>
                  {order?.delivery?.status && (
                    <div className="flex items-center gap-space12">
                      <Badge
                        className={`${getStatusColor(order?.delivery?.status ?? '')} capitalize`}
                      >
                        {order.delivery?.status}
                      </Badge>
                      {order?.delivery?.status !== 'Pickup Cancelled' && (
                        <Button
                          size={'xsm'}
                          variant={'outline'}
                          onClick={() => handleDeliveryStatusCheck(order?.id)}
                          className="flex items-center justify-center gap-space4"
                        >
                          <RefreshCcw className="h-space16 w-space16" />
                        </Button>
                      )}
                    </div>
                  )}
                  {/* {order.delivery.reason && (
                    <div>
                      Reason:
                      <p className="text-xs">{order.delivery.reason}</p>
                    </div>
                  )} */}
                </div>
              )}
            </TableCell>
            <TableCell>{order?.amount_info?.courier_cost}</TableCell>
            <TableCell>
              <StatusListView
                status={order?.order_status}
                orderId={order?.id}
                delivery_method={order?.delivery_method}
                due={order?.amount_info?.due_amount}
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-center gap-space12 text-gray-500 px-space8 py-space12">
                <OrderNoteForm orderId={order?.id} note={order?.staff_note} />
                <OrderOptions
                  orderId={order?.id}
                  paid_total={order?.amount_info?.due_amount}
                  status={order?.order_status}
                  delivery_method={order?.delivery_method}
                  paid_amount={order?.amount_info?.paid_amount}
                  delivery={order?.delivery}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
