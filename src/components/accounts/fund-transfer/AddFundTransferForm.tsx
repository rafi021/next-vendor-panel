'use client';

import React, { useTransition } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { api } from '@/server/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Layers } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import BackButton from '@/components/common/back-button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { IAccount } from '@/types/accounts-interface';
import ImageDropify from '@/components/common/ImageDropify';
import { Select } from '@radix-ui/react-select';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FUND_TRANSFER } from '@/server/services/fund-transfer';
import {
  FundTransferForm,
  FundTransferSchemaDef,
} from '@/schemas/accounts/fund-transfer';

export interface IFundTransferProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  accounts?: IAccount[];
  data?: {
    id: string;
    evidence?: string | null;
    comment: string;
    amount?: string;
    transfer_amount: string;
    cost: string;
    from_account_id: string;
    to_account_id: string;
  };
}
const AddFundTransferForm = ({
  title,
  description = '',
  children,
  accounts,
  data,
}: IFundTransferProps) => {
  const [isLoading, startTransition] = useTransition();
  const { form, handleReset, isActiveAction } = FundTransferForm(data);
  const router = useRouter();

  function onSubmit(formData: FundTransferSchemaDef) {
    startTransition(async () => {
      if (data) {
        const res = await api.put(
          `${FUND_TRANSFER.PUT.FUND_TRANSFER_UPDATE}/${data.id}`,
          formData,
          FUND_TRANSFER.GET.TAGS,
        );

        if (res.success) {
          form.reset();
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await api.post(
          FUND_TRANSFER.POST,
          formData,
          FUND_TRANSFER.GET.TAGS,
        );
        if (res.success) {
          form.reset();
          toast.success(res.message);
          router.push('/fund-transfer');
        } else {
          toast.error(res.message);
        }
      }
    });
  }

  return (
    <div className="bg-gray-50">
      <Card>
        <CardHeader className="p-space16 lg:p-space24 border-b border-gray-300">
          <div className="flex items-center justify-between gap-space16">
            <div className="flex  items-start gap-space16">
              <div className="p-2 border-[1px] rounded-lg bg-primary/10">
                <Layers className="w-6 h-6 text-gray-500" />
              </div>
              <div className="">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className=" text-gray-500">
                  {data ? 'Update' : 'Create'} your fund transfer in less than 2
                  minutes.
                </p>
              </div>
            </div>
            <BackButton />
          </div>
        </CardHeader>
        <CardContent className="lg:p-space24">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="evidence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fund Transfer Evidence</FormLabel>
                    <FormControl>
                      <ImageDropify
                        image={field.value ?? ''}
                        setImage={(img) => {
                          field.onChange(img);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid sm:grid-cols-2 gap-space16">
                <FormField
                  control={form.control}
                  name="from_account_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From Account</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          // If to_account_id is the same as the newly selected from_account_id, reset it
                          const toAccountId = form.getValues('to_account_id');
                          if (toAccountId === value) {
                            form.setValue('to_account_id', '');
                          }
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select from account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {accounts?.map((account) => (
                            <SelectItem
                              key={account.id}
                              value={String(account.id)}
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
                <FormField
                  control={form.control}
                  name="to_account_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To Account</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select to account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {accounts?.map((account) => {
                            // Disable the option if it's the same as from_account_id
                            const fromAccountId = form.getValues('from_account_id');
                            const isDisabled = String(account.id) === fromAccountId;
                            
                            return (
                              <SelectItem
                                key={account.id}
                                value={String(account.id)}
                                disabled={isDisabled}
                              >
                                {account.name}
                                {isDisabled && " (already selected as source)"}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-space16">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Amount</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="Enter total amount"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transfer_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transfer Amount</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="Enter transfer amount"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-space16">
                <FormField
                  control={form.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="Enter cost"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="Write your comment"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-space16 max-w-[400px]">
                <Button
                  type="button"
                  variant="white"
                  className="w-full"
                  onClick={handleReset}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full"
                  loader={isLoading}
                  disabled={!isActiveAction || isLoading}
                >
                  {data ? 'Save Update' : 'Add New Fund Transfer'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddFundTransferForm;
