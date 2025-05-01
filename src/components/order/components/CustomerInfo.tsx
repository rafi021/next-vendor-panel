'use client';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Info, Loader2, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState, useTransition } from 'react';
import { Customer } from '@/types/order-interface';
import { PopoverClose } from '@radix-ui/react-popover';
import { toast } from 'sonner';
import { getSuccessRateByPhone } from '@/server/actions/customerSuccessRate';
import { FrudResponse, SuccessRate } from '@/types/UserType';
import CopyComponent from '@/components/common/CopyComponent';
import PhoneComponent from '@/components/common/PhoneComponent';

type CustomerSuccessRateProps = {
  data?: SuccessRate | null;
  lastUpdatedBy?: string;
  lastUpdatedAt?: string;
  onFetchStatusClick?: () => void;
  isLoading?: boolean;
};

export const CustomerDeliveryDetails = ({
  data,
  onFetchStatusClick,
  isLoading,
}: {
  data?: SuccessRate | null;
  onFetchStatusClick?: () => void;
  isLoading?: boolean;
}) => {
  const couriers = data
    ? Object?.entries(data)?.map(([courier, stats]) => ({
        courier,
        ...stats,
      }))
    : [];

  return (
    <div>
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <Table className="border border-gray-200 rounded">
          <TableHeader className="bg-gray-50">
            <TableRow className="text-xs">
              <TableHead className="min-w-[100px] border-r border-gray-200">
                Courier
              </TableHead>
              <TableHead className="min-w-[50px] border-r border-gray-200">
                Total
              </TableHead>
              <TableHead className="min-w-[75px] border-r border-gray-200">
                Delivered
              </TableHead>
              <TableHead className="min-w-[85px] border-r border-gray-200">
                Undelivered
              </TableHead>
              <TableHead className="min-w-[84px]">Success Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {couriers.map((courier) => (
              <TableRow key={courier.courier} className="text-xs">
                <TableCell className="border-r border-gray-200 capitalize">
                  {courier.courier.split('_').join(' ')}
                </TableCell>
                <TableCell className="border-r border-gray-200">
                  {courier.total}
                </TableCell>
                <TableCell className="border-r border-gray-200">
                  {courier.delivered}
                </TableCell>
                <TableCell className="border-r border-gray-200">
                  {courier.cancelled}
                </TableCell>
                <TableCell>{courier.success_rate.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export const CustomerSuccessRate = ({
  data,
  lastUpdatedBy,
  lastUpdatedAt,
  onFetchStatusClick,
  isLoading,
}: CustomerSuccessRateProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const couriers = data
    ? Object.entries(data).map(([courier, stats]) => ({
        courier,
        ...stats,
      }))
    : [];

  const totalOrders = couriers.reduce((acc, curr) => acc + curr.total, 0);
  const totalDelivered = couriers.reduce(
    (acc, curr) => acc + curr.delivered,
    0,
  );
  const successRate =
    totalOrders > 0 ? (totalDelivered / totalOrders) * 100 : 0;

  return (
    <div className="border w-full m-space4 p-space8 rounded-lg flex flex-col gap-y-space8">
      <p className="flex items-center justify-between text-sm">
        <span>Delivery Success Rate</span>
        <span>{successRate.toFixed(2)}%</span>
      </p>
      <Progress
        value={successRate}
        variant="success"
        className="w-full h-space8"
      />
      <p className="text-sm text-gray-500">
        Updated on {lastUpdatedAt} by{' '}
        <span className="text-black font-semibold">{lastUpdatedBy}</span>
      </p>
      <div className="flex items-center gap-space8">
        <Button
          variant="white"
          size="sm"
          // loader={isLoading}
          disabled={isLoading}
          onClick={() => {
            toast.success('Updating success status');
            if (!!onFetchStatusClick) {
              onFetchStatusClick();
            }
          }}
        >
          Refresh
          <RefreshCw
            className={`${isLoading ? 'animate-spin' : ''}`}
            size={16}
          />
        </Button>
        <Button
          variant="white"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
        >
          Details
          <span className={`${showDetails ? 'rotate-180' : ''} duration-300`}>
            <ChevronDown size={16} />
          </span>
        </Button>
      </div>

      <div
        className={`grid duration-500 ${showDetails ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <CustomerDeliveryDetails data={data} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export const CustomerInfoView = ({
  customer,
  billing_address,
  shipping_address,
  data,
  onFetchStatusClick,
  isLoading,
}: {
  customer: Customer;
  billing_address: string | null;
  shipping_address: string | null;
  data?: SuccessRate | null;
  onFetchStatusClick: () => void;
  isLoading: boolean;
}) => {
  return (
    <>
      <Card className="border-none shadow-none px-space6">
        <div className="flex items-center justify-between">
          <CardTitle className="pt-space12">Customer Details</CardTitle>
          <CardTitle className="pt-space12">
            <PopoverClose asChild title="close">
              <X className="text-gray-500 hover:text-gray-800 hover:cursor-pointer" />
            </PopoverClose>
          </CardTitle>
        </div>
        <article className="text-sm flex flex-col gap-space6 py-space24">
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Customer Name</p>
            <div className="flex items-center gap-space8">
              <p>{customer.name}</p>
              {customer.isNew && (
                <Badge className="border-blue-500 bg-blue-50 text-blue-500 hover:bg-blue-50">
                  New
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Customer ID</p>
            <p>{customer.id}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Contact</p>
            <span className="flex items-center gap-space4">
              <CopyComponent value={customer.phone} iconSize={14}>
                <p>{customer.phone}</p>
              </CopyComponent>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Address</p>
            <p className="text-sm">{billing_address}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Shipping</p>
            <p className="text-xs">{shipping_address} </p>
          </div>
        </article>
      </Card>
      <CustomerSuccessRate
        data={data ?? null}
        onFetchStatusClick={onFetchStatusClick}
        isLoading={isLoading}
      />
    </>
  );
};

export const CustomerInfoList = ({
  customer,
  billing_address,
  shipping_address,
}: {
  customer: Customer;
  billing_address: string | null;
  shipping_address: string | null;
}) => {
  const [status, setStatus] = useState<FrudResponse | null>(null);
  const [isLoading, startTransition] = useTransition();
  const fetchStatus = async () => {
    if (!customer.phone) return;
    startTransition(async () => {
      const statusData = await getSuccessRateByPhone(customer.phone);
      if (statusData) {
        setStatus(statusData);
      }
    });
  };

  // useEffect(() => {
  //   if (customer.phone) {
  //     fetchStatus();
  //   }
  // }, [customer]);

  if (!customer) return null;

  return (
    <article>
      <span className="font-semibold flex items-center gap-space16">
        {customer.name}
        {/* {customer.is_new && (
          <Badge className={`${getStatusColor('new')}`}>New</Badge>
        )} */}

        <Popover>
          <PopoverTrigger asChild>
            <Info
              size={16}
              className="hover:text-black text-gray-500 hover:cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent className="w-[450px] p-space12">
            <CustomerInfoView
              customer={customer}
              billing_address={billing_address}
              shipping_address={shipping_address}
              data={status?.frud.data ?? null}
              onFetchStatusClick={fetchStatus}
              isLoading={isLoading}
            />
          </PopoverContent>
        </Popover>
      </span>
    </article>
  );
};

export const CustomerPhoneListView = ({
  customerPhoneNo,
}: {
  customerPhoneNo: string;
}) => {
  return (
    <article className="flex gap-space6 items-center">
      {customerPhoneNo ? (
        <PhoneComponent phoneNumber={customerPhoneNo} />
      ) : (
        <span>-</span>
      )}
    </article>
  );
};
