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
import { Select } from '@radix-ui/react-select';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IEmployee } from '@/types/employee-interface';
import {
  months,
  PayrollForm,
  PayrollSchemaDef,
  status,
  years,
} from '@/schemas/hrm/payroll';
import { IAccount } from '@/types/accounts-interface';
import { PAYROLL } from '@/server/services/payroll';

export interface IPayrollProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  employees?: IEmployee[];
  accounts?: IAccount[];
  data?: {
    id: string;
    employee_id?: string;
    account_id?: string;
    reference?: string;
    month?: string;
    year?: string;
    amount?: string;
    method?: string;
    status?: string;
    notes?: string;
    date?: string;
  };
}
const AddPayrollForm = ({
  title,
  description = '',
  children,
  employees,
  accounts,
  data,
}: IPayrollProps) => {
  const [isLoading, startTransition] = useTransition();
  const { form, handleReset, isActiveAction } = PayrollForm(data);
  const router = useRouter();

  function onSubmit(formData: PayrollSchemaDef) {
    startTransition(async () => {
      if (data) {
        const res = await api.put(
          `${PAYROLL.PUT.UPDATE_PAYROLL}/${data.id}`,
          formData,
          PAYROLL.GET.TAGS,
        );

        if (res.success) {
          form.reset();
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await api.post(PAYROLL.POST, formData, PAYROLL.GET.TAGS);

        if (res.success) {
          form.reset();
          toast.success(res.message);
          router.push('/payroll');
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
                  {data ? 'Update' : 'Create'} your payroll in less than 2
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
              <div className="grid sm:grid-cols-2 gap-space16">
                <FormField
                  control={form.control}
                  name="employee_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select employee" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employees?.map((employee) => (
                            <SelectItem
                              key={employee.id}
                              value={String(employee.id)}
                            >
                              {employee.name}
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
                      <FormLabel>Account</FormLabel>
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
              </div>
              <div className="grid sm:grid-cols-2 gap-space16">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="Enter payment amount"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment method</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="Enter payment method"
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
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block py-space4">
                        Payment Date
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
                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment reference</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="Enter payment reference"
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
                  name="month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Month</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select month" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {months?.map((month) => (
                            <SelectItem key={month} value={String(month)}>
                              {month}
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
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Year</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years?.map((year) => (
                            <SelectItem key={year} value={String(year)}>
                              {year}
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
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {status?.map((stat) => (
                            <SelectItem key={stat} value={String(stat)}>
                              {stat}
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
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment note</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="Enter payment note"
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
                  {data ? 'Save Update' : 'Add Payroll'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPayrollForm;
