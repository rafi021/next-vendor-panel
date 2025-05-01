'use client';
import { DateSelect } from '@/components/common/DateSelect';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import SortAndFilterComponent from '@/components/common/SortAndFilterComponent';
import { Card } from '@/components/ui/card';
import dynamic from 'next/dynamic';

const OrderTable = dynamic(() => import('./OrderTable'));

import { Plus } from 'lucide-react';

import { Order, OrderMetaData } from '@/types/order-interface';
import { useQueryState } from 'nuqs';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { SmsTemplate } from '@/types/sms';
import SmsSendComponent from './SmsSendComponent';
import { FILTER_OPTIONS, SORT_OPTIONS } from '@/config/data';
import PaginateAction from '../common/PaginateAction';

const orderStatus: Array<{ title: string; key: string }> = [
  { title: 'All', key: 'all' },
  { title: 'Pending', key: 'pending' },
  { title: 'On Hold', key: 'on_hold' },
  { title: 'Approved', key: 'approved' },
  { title: 'Shipped', key: 'shipped' },
  { title: 'Delivered', key: 'delivered' },
  { title: 'Returned', key: 'returned' },
  { title: 'Cancelled', key: 'cancelled' },
];

type paginateData = {
  current_page: number;
  per_page: number;
  total: number;
};

const OrderPageWrapper = ({
  orders,
  meta,
  smsCatData,
  paginateData,
}: {
  orders: Order[] | [];
  meta?: OrderMetaData;
  smsCatData: SmsTemplate[];
  paginateData: paginateData;
}) => {
  const [orderStatusQuery, setOrderStatusQuery] = useQueryState(
    'order_status',
    {
      shallow: false,
      defaultValue: 'all',
    },
  );

  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);

  const toggleSelectedOrderIds = useCallback((ids: number | number[]) => {
    const idArray = Array.isArray(ids) ? ids : [ids];

    setSelectedOrder((prevSelected) => {
      let updatedSelected = [...prevSelected];

      idArray.forEach((id) => {
        if (updatedSelected.includes(id)) {
          updatedSelected = updatedSelected.filter((item) => item !== id);
        } else {
          updatedSelected.push(id);
        }
      });

      return updatedSelected;
    });
  }, []);

  const toggleAllOrders = useCallback(() => {
    setSelectedOrder((prevSelected) => {
      if (prevSelected.length === orders.length) {
        return [];
      } else {
        return orders.map((order) => order.id);
      }
    });
  }, [orders]);

  const clearOrdersFromSelectedList = () => {
    setSelectedOrder([]);
  };

  return (
    <div className="space-y-space16 pb-space16">
      <Card className="py-space16 xl:px-space12 xl:py-space24 bg-gradient-primary grid grid-cols-2 lg:grid-cols-3 gap-space16 space-y-space16">
        <div className="space-y-space8 lg:border-r lg:  border-gray-300 px-space12 ">
          <div className="flex items-center gap-space8 text-gray-500 text-xs xl:text-sm font-medium">
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.66652 7.2474V4.7474C5.66652 2.90645 7.15891 1.41406 8.99985 1.41406C10.8408 1.41406 12.3332 2.90645 12.3332 4.7474V7.24739M16.0065 8.37403L16.5065 13.7074C16.6487 15.2238 16.7198 15.982 16.4681 16.5676C16.2471 17.0821 15.8598 17.5074 15.3682 17.7755C14.8086 18.0807 14.047 18.0807 12.524 18.0807H5.47573C3.95266 18.0807 3.19113 18.0807 2.63154 17.7755C2.13996 17.5074 1.7526 17.0821 1.53156 16.5676C1.27995 15.982 1.35103 15.2238 1.49319 13.7074L1.99319 8.37403C2.11324 7.09352 2.17326 6.45326 2.46124 5.9692C2.71486 5.54288 3.08958 5.20166 3.5377 4.98893C4.04653 4.7474 4.6896 4.7474 5.97573 4.7474L12.024 4.7474C13.3101 4.7474 13.9532 4.7474 14.462 4.98893C14.9101 5.20165 15.2848 5.54288 15.5385 5.9692C15.8264 6.45326 15.8865 7.09352 16.0065 8.37403Z"
                stroke="#FF920F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-green-500">{meta?.today_total_orders}</span>
            TODAYS ORDERS
          </div>

          <article className="flex items-center gap-space6">
            <p className=" text-black text-md xl:text-xl font-semibold">
              ৳{meta?.today_total_order_amount}
            </p>
          </article>
        </div>

        <div className="space-y-space8 lg:border-r lg:  border-gray-300 px-space12">
          <div className="flex items-center gap-space8 text-gray-500 text-xs xl:text-sm font-medium">
            <svg
              width="17"
              height="19"
              viewBox="0 0 17 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.833496 8.91406L7.16192 2.58564C7.5943 2.15326 7.81049 1.93707 8.06278 1.78246C8.28647 1.64539 8.53033 1.54438 8.78542 1.48314C9.07314 1.41406 9.37888 1.41406 9.99035 1.41406L13.3335 1.41406M15.8335 6.9974L15.8335 8.64283C15.8335 9.05048 15.8335 9.2543 15.7874 9.44611C15.7466 9.61618 15.6793 9.77875 15.5879 9.92787C15.4848 10.0961 15.3407 10.2402 15.0524 10.5284L8.55245 17.0284C7.89242 17.6885 7.5624 18.0185 7.18186 18.1421C6.84712 18.2509 6.48654 18.2509 6.1518 18.1421C5.77125 18.0185 5.44124 17.6885 4.78121 17.0284L2.71911 14.9663C2.05909 14.3063 1.72907 13.9763 1.60542 13.5958C1.49666 13.261 1.49666 12.9004 1.60542 12.5657C1.72907 12.1852 2.05909 11.8551 2.71911 11.1951L8.80245 5.11178C9.0907 4.82353 9.23483 4.6794 9.40302 4.57633C9.55214 4.48495 9.71472 4.41761 9.88478 4.37678C10.0766 4.33073 10.2804 4.33073 10.6881 4.33073H13.1668C14.1003 4.33073 14.567 4.33073 14.9235 4.51239C15.2371 4.67217 15.4921 4.92714 15.6518 5.24074C15.8335 5.59726 15.8335 6.06397 15.8335 6.9974Z"
                stroke="#FF920F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-green-500">{meta?.total_orders}</span> TOTAL
            ORDERS
          </div>

          <article className="flex items-center gap-space6">
            <p className=" text-black text-md xl:text-xl font-semibold">
              ৳{meta?.total_order_amount}
            </p>
          </article>
        </div>

        <div className="space-y-space8  px-space12 lg:  pt-space16 lg:pt-0">
          <div className="flex items-center gap-space8 text-gray-500 text-xs xl:text-sm font-medium">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.83333 14.5798H4.25482C2.70049 14.5798 1.92332 14.5798 1.48205 14.2542C1.09734 13.9702 0.853102 13.5347 0.811435 13.0584C0.763642 12.512 1.16889 11.8489 1.9794 10.5226L2.81019 9.16316M13.5582 7.58418L15.3539 10.5226C16.1644 11.8489 16.5697 12.512 16.5219 13.0584C16.4802 13.5347 16.236 13.9702 15.8513 14.2542C15.41 14.5798 14.6328 14.5798 13.0785 14.5798H11.5833M4.59259 6.24649L6.39125 3.30324C7.14357 2.07216 7.51974 1.45662 8.004 1.24678C8.42678 1.06357 8.90655 1.06357 9.32933 1.24678C9.8136 1.45662 10.1898 2.07216 10.9421 3.30324L11.7919 4.69391M3.66667 2.91322L4.58173 6.32828L7.99679 5.41322M17 8.41156L13.5849 7.49649L12.6699 10.9116M5.75 17.0798L8.25 14.5798L5.75 12.0798"
                stroke="#FF920F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-green-500">{meta?.pending_orders}</span>
            PENDING ORDERS
          </div>

          <article className="flex items-center gap-space6">
            <p className=" text-black text-md xl:text-xl font-semibold">
              {meta?.pending_order_amount}
            </p>
          </article>
        </div>

        <div className="space-y-space8 px-space12 pt-space16 lg:pt-0  lg:border-r border-gray-300">
          <div className="flex items-center gap-space8 text-gray-500 text-xs xl:text-sm font-medium">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0833 10.75V5.75M6.91667 10.75V5.75M12.5 15.75H5.5C4.09987 15.75 3.3998 15.75 2.86502 15.4775C2.39462 15.2378 2.01217 14.8554 1.77248 14.385C1.5 13.8502 1.5 13.1501 1.5 11.75V4.75C1.5 3.34987 1.5 2.6498 1.77248 2.11502C2.01217 1.64462 2.39462 1.26217 2.86502 1.02248C3.3998 0.75 4.09987 0.75 5.5 0.75H12.5C13.9001 0.75 14.6002 0.75 15.135 1.02248C15.6054 1.26217 15.9878 1.64462 16.2275 2.11502C16.5 2.6498 16.5 3.34987 16.5 4.75V11.75C16.5 13.1501 16.5 13.8502 16.2275 14.385C15.9878 14.8554 15.6054 15.2378 15.135 15.4775C14.6002 15.75 13.9001 15.75 12.5 15.75Z"
                stroke="#FF920F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-green-500">{meta?.on_hold_orders}</span>ON
            HOLD ORDERS
          </div>

          <article className="flex items-center gap-space6">
            <p className=" text-black text-md xl:text-xl font-semibold">
              {meta?.on_hold_order_amount}
            </p>
          </article>
        </div>
        <div className="space-y-space8 px-space12 pt-space16 lg:pt-0  lg:border-r border-gray-300">
          <div className="flex items-center gap-space8 text-gray-500 text-xs xl:text-sm font-medium">
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.58333 9.2474L8.08333 11.7474L13.0833 6.7474M17.6667 9.2474C17.6667 13.8498 13.9357 17.5807 9.33333 17.5807C4.73096 17.5807 1 13.8498 1 9.2474C1 4.64502 4.73096 0.914062 9.33333 0.914062C13.9357 0.914062 17.6667 4.64502 17.6667 9.2474Z"
                stroke="#FF920F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-green-500">{meta?.approved_orders}</span>
            APPROVED ORDER
          </div>

          <article className="flex items-center gap-space6">
            <p className=" text-black text-md xl:text-xl font-semibold">
              {meta?.approved_order_amount}
            </p>
          </article>
        </div>
        <div className="space-y-space8 px-space12 pt-space16 lg:pt-0  ">
          <div className="flex items-center gap-space8 text-gray-500 text-xs xl:text-sm font-medium">
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.3333 4.08333H6C3.23858 4.08333 1 6.32191 1 9.08333C1 11.8448 3.23858 14.0833 6 14.0833H14.3333M14.3333 4.08333L11 0.75M14.3333 4.08333L11 7.41667"
                stroke="#FF920F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-green-500">{meta?.returned_orders}</span>
            RETURN ORDERS
          </div>

          <article className="flex items-center gap-space6">
            <p className=" text-black text-md xl:text-xl font-semibold">
              {meta?.returned_order_amount}
            </p>
          </article>
        </div>
      </Card>
      <Card className="mb-space16 p-space16">
        <div className="  border-gray-200 pb-space12 mb-space12 pt-0 flex flex-col md:flex-row justify-between md:items-center">
          <h2 className="text-xl md:text-md font-medium text-black">Orders</h2>
          <div className="flex gap-space12 items-center flex-wrap">
            {selectedOrder.length > 0 && (
              <SmsSendComponent
                smsCatData={smsCatData}
                selectedOrder={selectedOrder}
              />
            )}
            <SearchInput wrapperClasses="h-[40px] flex-grow" />
            <div className="flex">
              <SortAndFilterComponent
                label="Sort"
                triggerClassName="rounded-r-none"
                fields={SORT_OPTIONS}
                containerClassName="w-54"
              />
              <SortAndFilterComponent
                fields={FILTER_OPTIONS}
                label="Filter"
                triggerClassName="rounded-l-none"
                containerClassName="w-26"
                align="end"
              />
            </div>
            <DateSelect />
            <Link href={'/manage-order/create'}>
              <Button>
                <Plus />
                Create Order
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-start border-b border-gray-200 overflow-x-scroll scroll_hidden">
          {orderStatus.map((item) => (
            <Label
              key={item.title}
              htmlFor={item.title}
              className={`px-space16 py-space8 text-nowrap ${orderStatusQuery == item.key ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 cursor-pointer'} ${meta?.[item.key as keyof OrderMetaData] === 0 && 'cursor-not-allowed'}`}
            >
              <span>
                <span>{item.title}</span>
              </span>

              <span
                className={`px-space8 rounded-lg text-xs ml-2 ${orderStatusQuery == item.key ? 'bg-blue-500 text-white' : 'text-gray-500 border border-gray-300'}`}
              >
                <span>{meta?.[item.key as keyof OrderMetaData]}</span>
              </span>

              <Input
                className="hidden"
                id={item.title}
                type="radio"
                name="tab"
                value={item.title}
                disabled={meta?.[item.key as keyof OrderMetaData] === 0}
                onChange={(evt) => {
                  // // console.log(evt.target.column);
                  setOrderStatusQuery(item.key);
                }}
              />
            </Label>
          ))}
        </div>
        {orders.length > 0 ? (
          <div>
            <OrderTable
              orders={orders}
              selectedOrder={selectedOrder}
              toggleSelectedOrderIds={toggleSelectedOrderIds}
              toggleAllOrders={toggleAllOrders}
              clearOrdersFromSelectedList={clearOrdersFromSelectedList}
            />
          </div>
        ) : (
          <EmptyTableData
            title="There is no Order here yet!"
            description=""
            action={<p></p>}
          />
        )}
        <PaginateAction
          total={paginateData?.total ?? 0}
          perPage={paginateData?.per_page ?? 0}
          activePage={paginateData?.current_page ?? 0}
          // onChange={(data) => // console.log(data)}
        />
      </Card>
    </div>
  );
};

export default OrderPageWrapper;
