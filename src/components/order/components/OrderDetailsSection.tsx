'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomerSuccessRate } from './CustomerInfo';
import { StatusListView } from './Status';
import { Order } from '@/types/order-interface';
import { formatDate } from '@/utils/date-format';
import { useEffect, useState } from 'react';
import { FrudResponse } from '@/types/UserType';
import { getSuccessRateByPhone } from '@/server/actions/customerSuccessRate';

const OrderDetailsSection = ({ order }: { order?: Order }) => {
  const [status, setStatus] = useState<FrudResponse | null>(null);
  const fetchStatus = async () => {
    // toast.success('Updating success status for ' + order?.customer.phone);
    if (!order?.customer.phone) return;
    const statusData = await getSuccessRateByPhone(order?.customer.phone);
    if (statusData) setStatus(statusData);
  };
  useEffect(() => {
    fetchStatus();
  }, [order]);

  return (
    <Card className="px-0 border-0 rounded-none border-r">
      <CardHeader className="p-0">
        <CardTitle className="border-b p-space12 border-gray-200 flex justify-between items-center">
          <p className="text-md font-semibold">Order Details</p>
          <StatusListView
            status={order?.order_status}
            orderId={order?.id}
            delivery_method={order?.delivery_method}
            due={order?.amount_info.due_amount}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-space16">
        <section className="space-y-space12">
          <article className="border border-gray-200 rounded-sm px-space12">
            <p className="border-b pt-space12 pb-space4">Customer Details</p>
            <section className="text-xs pt-space4 flex flex-col gap-space12 text-gray-800 font-medium">
              <p className="flex items-center justify-between">
                <span className="text-gray-500">Customer Name</span>
                <span>{order?.customer.name}</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-gray-500">Customer ID</span>
                <span>{order?.customer.id}</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-gray-500">Contact</span>
                <span className=" flex items-center gap-1">
                  {order?.customer.phone}
                  <Copy
                    size={16}
                    className="hover:cursor-pointer text-gray-500 hover:text-black"
                  />
                </span>
              </p>
              <p className="flex items-start justify-between gap-space12 ">
                <span className="text-gray-500">Address</span>
                <span className="">{order?.billing_address} </span>
              </p>
              <p className="flex items-start justify-between gap-space12 ">
                <span className="text-gray-500">Shipping</span>
                <span>{order?.shipping_address}</span>
              </p>
              <p className="flex items-start justify-between gap-space12 ">
                <span className="text-gray-500">Location Type</span>
                <span>Inside Dhaka</span>
              </p>
              <p className="flex items-start justify-between gap-space12 ">
                <span className="text-gray-500">City</span>
                <span>Dhaka</span>
              </p>
              <p className="flex items-start justify-between gap-space12 ">
                <span className="text-gray-500">Zone</span>
                <span>Aftab Nagar</span>
              </p>
              <p className="flex items-start justify-between gap-space12 ">
                <span className="text-gray-500">Area</span>
                <span>Block-F</span>
              </p>
            </section>
            <section className="py-space16">
              <CustomerSuccessRate onFetchStatusClick={fetchStatus} />
            </section>
          </article>
          <article className="border border-gray-200 rounded-sm px-space12">
            <p className="border-b pb-space12 text-sm pt-space12">
              Order Details
            </p>
            <section className="text-xs py-space12 flex flex-col gap-space12 text-gray-800 font-medium">
              <p className="flex items-center justify-between">
                <span className="text-gray-500">Invoice No.</span>
                <span className=" flex gap-1 items-center">
                  {order?.id}
                  <span className="flex gap-space8 text-gray-500">
                    <Copy
                      className="hover:cursor-pointer hover:text-black"
                      size={15}
                    />
                    <Eye
                      className="hover:cursor-pointer hover:text-black"
                      size={15}
                    />
                    <Download
                      className="hover:cursor-pointer hover:text-black"
                      size={15}
                    />
                  </span>
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-gray-500">Order Date</span>
                {order?.created_at && (
                  <span className=" ">
                    {formatDate(order?.created_at, 'D_M_Y_T')}
                  </span>
                )}
              </p>
              {order?.status_change_at && (
                <p className="flex items-center justify-between">
                  <span className="text-gray-500">Status changed</span>
                  <span className="  flex items-center gap-1">
                    {formatDate(order?.status_change_at, 'D_M_Y_T')}
                  </span>
                </p>
              )}
              {/* <p className="flex items-center justify-between">
                <span className="text-gray-500">In Transit Date</span>
                <span className=" ">31/12/2024, 12:59 PM</span>
              </p> */}
              <p className="flex items-center justify-between">
                <span className="text-gray-500">Source</span>
                <span className=" ">Website</span>
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Source Link</span>
                <Button
                  variant={'link'}
                  className="
                  !p-0"
                >
                  www.molymart.com
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Note</span>
                <span className="font-medium font-sm text-purple-500">
                  {order?.note}
                </span>
              </div>
            </section>
          </article>

          {/* {order?.amount_info.discount && (
            <article className="border border-gray-200 rounded-sm px-space12">
              <p className="border-b pb-space12 text-sm pt-space12">Discount</p>
              <section className="text-xs py-space12 flex gap-space12">
                <Button variant={'pagination'} size={'sm'} className="text-xs">
                  Fixed
                </Button>
                <Button variant={'pagination'} size={'sm'} className="text-xs">
                  ৳{order?.amount_info.discount}
                </Button>
              </section>
            </article>
          )} */}
          <article className="border border-gray-200 rounded-sm px-space12">
            <p className="border-b pb-space12 text-sm pt-space12">
              Delivery Partner
            </p>
            <section className="text-xs py-space12 flex gap-space12">
              <Button variant={'pagination'} size={'sm'} className="text-xs">
                Pathao
              </Button>
            </section>
          </article>
          <article className="border border-gray-200 rounded-sm px-space12">
            <p className="border-b pb-space12 text-sm pt-space12">
              Order History
            </p>
            <section className="text-xs py-space12 flex flex-col gap-space12">
              <p className="flex items-center justify-between">
                <span className="text-gray-500">Total Orders</span>
                <span className="text-black font-semibold flex gap-1 items-center">
                  1
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-gray-500">Delivered</span>
                <span className="text-black font-semibold">1</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-gray-500">Cancelled</span>
                <span className="text-black font-semibold flex items-center gap-1">
                  0
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-gray-500">Return</span>
                <span className="text-black font-semibold">0</span>
              </p>
            </section>
          </article>
        </section>
      </CardContent>
    </Card>
  );
};

export default OrderDetailsSection;
