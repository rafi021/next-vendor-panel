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
import { Layers } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next-nprogress-bar';
import { Button } from '@/components/ui/button';
import { Select } from '@radix-ui/react-select';
import BackButton from '@/components/common/back-button';
import ImageDropify from '@/components/common/ImageDropify';
import DatePicker from '@/components/common/forms/DatePicker';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { IEmployee } from '@/types/employee-interface';
import { IDepartment } from '@/types/department-interface';
import { ILeaveType } from '@/types/leave-type-interface';
import {
  LeaveRequestForm,
  LeaveRequestSchemaDef,
} from '@/schemas/hrm/leave-request';
import { LEAVE_REQUESTS } from '@/server/services/leave-request';

export interface ILeaveRequestProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  employees?: IEmployee[];
  departments?: IDepartment[];
  leaveTypes?: ILeaveType[];
  data?: {
    id: string;
    employee_id?: string;
    department_id?: string;
    leave_type_id?: string;
    start_date?: string;
    end_date?: string;
    notes?: string;
    approval_status?: string;
    evidence?: string;
  };
}
const AddLeaveRequestForm = ({
  title,
  description = '',
  children,
  employees,
  departments,
  leaveTypes,
  data,
}: ILeaveRequestProps) => {
  const [isLoading, startTransition] = useTransition();
  const { form, handleReset, isActiveAction } = LeaveRequestForm(data);
  const router = useRouter();

  function onSubmit(formData: LeaveRequestSchemaDef) {
    startTransition(async () => {
      if (data) {
        const res = await api.put(
          `${LEAVE_REQUESTS.PUT.LEAVE_REQUEST_UPDATE}/${data.id}`,
          formData,
          LEAVE_REQUESTS.GET.TAGS,
        );

        if (res.success) {
          form.reset();
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await api.post(
          LEAVE_REQUESTS.POST,
          formData,
          LEAVE_REQUESTS.GET.TAGS,
        );

        if (res.success) {
          form.reset();
          toast.success(res.message);
          router.push('/leave-request');
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
                  {data ? 'Update' : 'Create'} your leave request in less than 2
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
                    <FormLabel>Leave Request Evidence</FormLabel>
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
                  name="department_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments?.map((dep) => (
                            <SelectItem key={dep.id} value={String(dep.id)}>
                              {dep.name}
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
                  name="leave_type_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Leave Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select leave type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {leaveTypes?.map((leaveType) => (
                            <SelectItem
                              key={leaveType.id}
                              value={String(leaveType.id)}
                            >
                              {leaveType.name}
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
                  name="approval_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Approval Status</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="Enter Approval Status"
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
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block py-space4">
                        Start Date
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
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block py-space4">
                        End Date Date
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
                    <FormLabel>Leave Note</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value ?? ''}
                        placeholder="Write your leave request note"
                        className="resize-none"
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
                  disabled={!isActiveAction || isLoading}
                >
                  {data ? 'Save Update' : 'Add Leave Request'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddLeaveRequestForm;
