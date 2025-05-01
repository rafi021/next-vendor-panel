'use client';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CircleDollarSign, EllipsisVertical, Pen, Send } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/server/api';
import { ORDERS } from '@/server/services/order';
import { toast } from 'sonner';

const OrderOptions = ({
  orderId,
  paid_total,
  status,
  delivery_method,
  paid_amount,
  delivery,
}: {
  orderId: number;
  paid_total: number | null;
  status:
    | 'on_hold'
    | 'approved'
    | 'delivered'
    | 'cancelled'
    | 'returned'
    | 'pending';
  delivery_method: 'in_house' | 'pathao';
  paid_amount: number | null;
  delivery: {
    id: number;
    order_id: number;
    delivery_partner: string;
    consignment_id: string;
    merchant_order_id: string;
  } | null;
}) => {
  const [open, setOpen] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);

  const [isLoading, startTransition] = useTransition();

  const [paymentAmount, setPaymentAmount] = useState(paid_total ?? 0);

  const handlePaymentClick = () => {
    startTransition(async () => {
      const res = await api.post(
        ORDERS.POST.PARTIAL_PAYMENT,
        {
          order_id: orderId,
          amount: paymentAmount,
        },
        ORDERS.GET.ORDERS.TAGS,
      );
      // // console.log('res', res);
      if (res.success) {
        setOpenPayment(false);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  // reset payment amount when dialog is closed with updated props data
  useEffect(() => {
    setPaymentAmount(paid_total ?? 0);
  }, [paid_total]);

  if (status === 'cancelled' || status === 'returned' || status === 'delivered')
    return <EllipsisVertical size={16} className="text-transparent" />;

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <EllipsisVertical size={16} className="hover:cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          side="left"
          className="p-0 max-w-[138px] text-xs font-normal"
        >
          {(status === 'pending' ||
            status === 'on_hold' ||
            status === 'approved') && (
            <Link href={`/manage-order/update/${orderId}`}>
              <Button
                size={'sm'}
                variant={'transparent'}
                className="hover:underline hover:bg-green-50 hover:text-green-600 w-full justify-start"
              >
                <Pen size={16} />
                Edit Order
              </Button>
            </Link>
          )}
          {/* 
        <DeleteButton
          url={`${ORDERS.DELETE.ORDER_DELETE}/${orderId}`}
          tags={ORDERS.GET.ORDERS.TAGS}
          title={`Delete Order ${tracking_number}`}
          description="Are you sure you want to delete this order? This action cannot be undone."
        >
          <Button
            size={'sm'}
            variant={'transparent'}
            className="hover:underline hover:bg-red-50 hover:text-red-600 w-full  justify-start"
          >
            <Trash2 size={16} />
            Delete Order
          </Button>
        </DeleteButton> */}
          {/* <Button
            size={'sm'}
            variant={'transparent'}
            className="hover:underline hover:bg-blue-50 hover:text-blue-600 w-full justify-start"
          >
            <Send size={16} />
            Send Invoice
          </Button> */}

          {status === 'approved' && (
            <Button
              size={'sm'}
              variant={'transparent'}
              className="hover:underline hover:bg-yellow-50 hover:text-yellow-600 w-full justify-start"
              onClick={() => {
                setOpen(false);
                setOpenPayment(true);
              }}
            >
              {/* <Send size={16} /> */}
              <CircleDollarSign size={16} />
              Payment
            </Button>
          )}
        </PopoverContent>
      </Popover>
      <Dialog open={openPayment} onOpenChange={setOpenPayment}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit payment</DialogTitle>
            <DialogDescription>
              {`Make changes to payment here. Click save when you're done.`}
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <div className="flex items-center justify-between">
              <Label className="">Amount</Label>
              <div>
                <Label className="text-xs">Total payable: </Label>
                <span className="font-semibold  px-1 rounded ">
                  {paid_total}
                </span>
              </div>
            </div>
            <Input
              type="number"
              placeholder="Enter amount"
              // min={0}
              value={paymentAmount ?? 0}
              className="col-span-3"
              onChange={(evt) => setPaymentAmount(Number(evt.target.value))}
              required
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
              loader={isLoading}
              onClick={handlePaymentClick}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderOptions;
