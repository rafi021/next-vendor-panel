'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { api } from '@/server/api';
import { ORDERS } from '@/server/services/order';
import { checkStatusEditable } from '@/utils/courier-status-check';
import { getStatusColor } from '@/utils/status-color';
import { Loader2 } from 'lucide-react';
import { useEffect, useState, useMemo, useTransition } from 'react';
import { toast } from 'sonner';

const Spinner = () => <Loader2 size={14} className="animate-spin" />;

type StatusType =
  | 'pending'
  | 'on_hold'
  | 'approved'
  | 'shipped'
  | 'delivered'
  | 'returned'
  | 'paid_returned'
  | 'cancelled'
  | 'inTransit';

const statusOptions: Record<
  StatusType,
  {
    title: string;
    value: StatusType;
    show: boolean;
    disabled?: boolean;
  }[]
> = {
  pending: [
    { title: 'On Hold', value: 'on_hold', show: true },
    { title: 'Approved', value: 'approved', show: true },
    { title: 'Canceled', value: 'cancelled', show: true },
  ],
  on_hold: [
    { title: 'Pending', value: 'pending', show: true },
    { title: 'Approved', value: 'approved', show: true },
    { title: 'Canceled', value: 'cancelled', show: true },
  ],
  approved: [
    { title: 'Pending', value: 'pending', show: true },
    { title: 'On Hold', value: 'on_hold', show: true },
    { title: 'Delivered', value: 'delivered', show: true },
    { title: 'Canceled', value: 'cancelled', show: true },
  ],
  shipped: [{ title: 'In Transit', value: 'inTransit', show: false }],
  delivered: [{ title: 'Returned', value: 'returned', show: true }],
  returned: [],
  paid_returned: [],
  cancelled: [],
  inTransit: [],
};

const allStatuses: { title: string; value: StatusType; show: boolean }[] = [
  { title: 'Pending', value: 'pending', show: true },
  { title: 'On Hold', value: 'on_hold', show: true },
  { title: 'Approved', value: 'approved', show: true },
  { title: 'Delivered', value: 'delivered', show: true },
  { title: 'Canceled', value: 'cancelled', show: true },
  { title: 'Returned', value: 'returned', show: false },
  { title: 'Paid Returned', value: 'paid_returned', show: false },
  { title: 'Shipped', value: 'shipped', show: false },
  { title: 'In Transit', value: 'inTransit', show: false },
];

export const StatusListView = ({
  status,
  orderId,
  delivery_method,
  due = 0,
}: {
  orderId?: number;
  status?: StatusType;
  delivery_method?: 'in_house' | 'pathao';
  due?: number;
}) => {
  const [orderStatus, setOrderStatus] = useState<StatusType>(
    status ?? 'pending',
  );
  const [isLoading, startTransition] = useTransition();

  const handleOrderStatusChange = (val: StatusType) => {
    // // console.log('order status change => ', val, due);
    if (val === 'delivered' && due > 0) {
      toast.warning(`Please make the payment of ${due} from the payment tab`);
      return;
    }

    startTransition(async () => {
      try {
        const response = await api.put(
          `${ORDERS.PUT.ORDER_STATUS_UPDATE}/${orderId}`,
          { order_status: val },
          [...ORDERS.GET.ORDERS.TAGS],
        );

        if (response.success) {
          setOrderStatus(val);
          toast.success('Status updated successfully!');
        } else {
          toast.error(
            response?.errors?.split('in')[0] ?? 'Something went wrong!!',
          );
        }
      } catch (error) {
        toast.error('Failed to update status!');
      }
    });
  };
  useEffect(() => {
    if (status) setOrderStatus(status);
  }, [status]);

  const availableStatuses = useMemo(() => {
    const selectable = statusOptions[orderStatus] ?? [];
    const currentStatusInfo = allStatuses.find((s) => s.value === orderStatus);

    const alreadyIncluded = selectable.some((s) => s.value === orderStatus);
    const extended =
      !alreadyIncluded && currentStatusInfo
        ? [{ ...currentStatusInfo, disabled: true }, ...selectable]
        : selectable;

    return extended.filter((s) => s);
  }, [orderStatus]);

  return (
    <Select
      value={orderStatus}
      onValueChange={handleOrderStatusChange}
      disabled={
        !checkStatusEditable(delivery_method) ||
        isLoading ||
        status === 'returned'
      }
    >
      <SelectTrigger
        className={cn(
          'max-w-max rounded-full gap-space6 h-space24 items-center capitalize',
          getStatusColor(orderStatus),
          'disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none',
        )}
      >
        <span className="capitalize">
          {allStatuses.find((s) => s.value === orderStatus)?.title ??
            'Select Status'}
        </span>

        {isLoading && <Spinner />}
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {availableStatuses.length > 0 ? (
            availableStatuses.map((stat) => (
              <SelectItem
                key={stat.value}
                value={stat.value}
                disabled={(stat as any).disabled}
                className={cn(
                  'capitalize',
                  stat.disabled && 'opacity-50 pointer-events-none',
                  stat.show !== true && 'hidden',
                )}
              >
                {stat.title}
              </SelectItem>
            ))
          ) : (
            <SelectItem
              value={orderStatus}
              disabled
              className="capitalize opacity-50 pointer-events-none"
            >
              {allStatuses.find((s) => s.value === orderStatus)?.title ??
                'Unknown'}
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
