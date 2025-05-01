'use client';
import React, { useState, useTransition } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Plus } from 'lucide-react';

import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { api } from '@/server/api';
import { toast } from 'sonner';
import { ICoupon } from '@/types/coupon-interface';
import { COUPONS } from '@/server/services/coupons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/date-format';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CouponSchema, useCouponForm } from '@/schemas/inventory/coupon-schema';

interface ICouponFormProps {
  title?: string;
  children?: React.ReactNode;
  data?: ICoupon;
}

const CouponForm = ({
  title = 'Add New Coupon',
  children,
  data,
}: ICouponFormProps) => {
  const [isLoading, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const form = useCouponForm(data);

  const onSubmit = async (formData: z.infer<typeof CouponSchema>) => {
    // // console.log('subitted=> ', formData);

    const payload = {
      ...formData,
      valid_from: formatDate(formData.valid_from, 'Y_M_D'),
      valid_to: formatDate(formData.valid_to, 'Y_M_D'),
    };

    startTransition(async () => {
      // // console.log(payload);

      let res;
      if (data) {
        res = await api.put(
          `${COUPONS.PUT.COUPONS_UPDATE}/${data.id}`,
          payload,
          COUPONS.GET.COUPONS.TAGS,
        );
      } else {
        res = await api.post(
          COUPONS.PUT.COUPONS_UPDATE,
          payload,
          COUPONS.GET.COUPONS.TAGS,
        );
      }
      // // console.log(res);
      if (res.success) {
        toast.success(res?.message ?? 'Coupon saved successfully!');
        form.reset();
        setOpen(false);
      } else {
        toast.error(res.message ?? 'Failed to save coupon.');
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button>
            <Plus className="w-4 h-4" />
            Add Coupon
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[860px] w-full ">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{`Create a coupon for avail discount`}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-space16"
          >
            <div className="grid md:grid-cols-2 gap-space16">
              <FormField
                control={form.control}
                name="discount_type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Discount Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-y-1 space-x-space12"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="percentage" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Percentage
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="fixed" />
                          </FormControl>
                          <FormLabel className="font-normal">Fixed</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space12">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coupon Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter coupon name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {form.watch('discount_type') == 'fixed'
                        ? 'Amount'
                        : 'Percentage'}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter amount / percentage"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="usage_limit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usage Limit</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter total usage limit"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="max_uses_per_customer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max usage limit per customer</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter max usage limit per customer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="min_purchase_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min purchase amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter minimum purchase amount to valid the coupon"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-space16">
              {/* valid from */}
              <FormField
                control={form.control}
                name="valid_from"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'white'}
                            className={cn(
                              'w-[240px] text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              formatDate(field.value)
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={(date) => {
                            let formatted_date = formatDate(
                              date ?? '',
                              'Y_M_D',
                            );
                            field.onChange(formatted_date);
                          }}
                          // disabled={(date) =>
                          //   date > new Date() : date < new Date('1900-01-01')
                          // }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* valid to */}
              <FormField
                control={form.control}
                name="valid_to"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'white'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              formatDate(field.value)
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={(date) => {
                            let formatted_date = formatDate(
                              date ?? '',
                              'Y_M_D',
                            );
                            field.onChange(formatted_date);
                          }}
                          // disabled={(date) =>
                          //   date > new Date() : date < new Date('1900-01-01')
                          // }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <DialogClose asChild>
                <Button
                  variant="white"
                  onClick={() => form.reset()}
                  type="button"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {data ? 'Update Coupon' : 'Add Coupon'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CouponForm;
