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
import DatePicker from '@/components/common/forms/DatePicker';
import { IAccount } from '@/types/accounts-interface';
import ImageDropify from '@/components/common/ImageDropify';
import { Select } from '@radix-ui/react-select';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ExpenseForm, ExpenseSchemaDef } from '@/schemas/accounts/expense';
import { EXPENSES } from '@/server/services/expense';
import { IExpenseCategory } from '@/types/expense-category-interface';

export interface IExpenseProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  accounts?: IAccount[];
  expenseCategories?: IExpenseCategory[];
  data?: {
    id: string;
    evidence?: string;
    date: string;
    notes: string;
    amount?: string;
    account_id: string;
    expense_category_id: string;
  };
}
const AddExpenseForm = ({
  title,
  description = '',
  children,
  accounts,
  expenseCategories,
  data,
}: IExpenseProps) => {
  const [isLoading, startTransition] = useTransition();
  const { form, handleReset, isActiveAction } = ExpenseForm(data);
  const router = useRouter();
  // // console.log(data);

  function onSubmit(formData: ExpenseSchemaDef) {
    startTransition(async () => {
      if (data) {
        const res = await api.put(
          `${EXPENSES.PUT.EXPENSE_UPDATE}/${data.id}`,
          formData,
          EXPENSES.GET.TAGS,
        );

        if (res.success) {
          form.reset();
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await api.post(EXPENSES.POST, formData, EXPENSES.GET.TAGS);
        if (res.success) {
          form.reset();
          toast.success(res.message);
          router.push('/expense');
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
                  {data ? 'Update' : 'Create'} your expense in less than 2
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
                    <FormLabel>Expense Evidence</FormLabel>
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
                  name="account_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expense Account</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
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
                  name="expense_category_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expense Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select expense category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {expenseCategories?.map((ExpCat) => (
                            <SelectItem
                              key={ExpCat.id}
                              value={String(ExpCat.id)}
                            >
                              {ExpCat.name}
                            </SelectItem>
                          ))}
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
                      <FormLabel>Expense Amount</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="Enter expense amount"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block py-space4">
                        Expense Date
                      </FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value ?? ''}
                          onChange={(value) => field.onChange(value)}
                        />
                      </FormControl>
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
                    <FormLabel>Expense Note</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        placeholder="Write your expense note"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                  disabled={(data ? false : !isActiveAction) || isLoading}
                >
                  {data ? 'Save Update' : 'Add New Expense'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddExpenseForm;
