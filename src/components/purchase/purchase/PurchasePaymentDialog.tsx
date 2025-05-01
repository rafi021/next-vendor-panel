'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DollarSign } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { IAccount } from '@/types/accounts-interface';
import DatePicker from '@/components/common/forms/DatePicker';
import { formatDate } from '@/utils/date-format';
import { api } from '@/server/api';
import { PURCHASE_PAYMENT } from '@/server/services/purchase';

// Validation schema
const formSchema = z.object({
  invoice_amount: z.number().optional(),
  purchase_id: z.string().optional(),
  reference: z.string().optional(),
  date: z.string(),
  paying_amount: z.string().min(1, 'Payable amount is required'),
  paymentMethod: z.string().min(1, 'Payment choice is required'),
  account_id: z.string().min(1, 'Account is required'),
  notes: z.string().optional(),
});

const paymentMethods = ['Cash', 'MFS', 'Cheque', 'Bank Transfer'];

interface IPurchasePaymentDialogProps {
  purchase: {
    purchase_id: string;
    reference: string;
    grand_total: number;
    paid_amount: number;
    notes: string;
  };
  accounts: IAccount[];
}

const PurchasePaymentDialog = ({
  purchase,
  accounts,
}: IPurchasePaymentDialogProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoice_amount: purchase?.grand_total,
      purchase_id: String(purchase?.purchase_id),
      reference: purchase?.reference,
      date: formatDate(new Date(), 'Y_M_D'),
      paying_amount: String(purchase?.grand_total - purchase?.paid_amount),
      paymentMethod: '',
      account_id: '',
      notes: purchase?.notes ?? '',
    },
  });

  // // console.log(form.formState.errors);

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      // // console.log(formData);
      const res = await api.post(
        PURCHASE_PAYMENT.POST,
        formData,
        PURCHASE_PAYMENT.GET.TAGS,
      );

      if (res.success) {
        toast.success(res.message);
        form.reset();
        setOpen(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error('Failed to add payment');
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={'sm'}
          variant={'transparent'}
          className="hover:underline hover:bg-green-50 hover:text-green-600 w-full justify-start"
        >
          <DollarSign size={16} />
          Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Purchase Payment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="invoice_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Amount(৳)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0.00"
                        {...field}
                        type="number"
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input placeholder="PR_2150" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Date <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paying_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Payable Amount (৳) <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="account_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Payment Account <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accounts?.map((account) => (
                          <SelectItem
                            key={account.id}
                            value={account.id.toString()}
                          >
                            {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter payment description"
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="white"
                onClick={() => setOpen(false)}
                className="max-w-[120px] w-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="max-w-[120px] w-full"
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
              >
                {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PurchasePaymentDialog;
