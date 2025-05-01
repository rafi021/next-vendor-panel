'use client';

import { z } from 'zod';
import { toast } from 'sonner';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { api } from '@/server/api';
import { useForm } from 'react-hook-form';
import { Role } from '@/types/permission';
import { Employee } from '@/types/UserType';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ChevronDown, Plus } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { EMPLOYEES } from '@/server/services/employee';
import React, { useState, useTransition } from 'react';
import ImageDropify from '@/components/common/ImageDropify';
import SelectorWithSearch from '@/components/common/forms/SelectorWithSearch';

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z
    .string()
    .email({ message: 'Invalid email' })
    .optional()
    .or(z.literal('')),
  nid: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .min(11, { message: 'Phone number is invalid' }),
  role_id: z.string().min(1, { message: 'Role is required' }),
  status: z.boolean(),
  avatar: z.string().optional(),
  password: z.string().optional(),
});

interface EmployeeFormProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  data?: Employee;
  roles: Role[];
}

const EmployeeForm = ({
  title = 'Add New Employee',
  description = '',
  children,
  data,
  roles,
}: EmployeeFormProps) => {
  const [isLoading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data?.name || '',
      email: data?.email || '',
      nid: data?.nid || '',
      address: data?.address || '',
      phone: data?.phone || '',
      role_id: data?.role_id ? `${data.role_id}_${data.role.name}` : '',
      status: data?.status === 1 ? true : false,
      avatar: data?.avatar || '',
      password: data?.password || '',
    },
  });

  const isActiveAction = !!form.watch('name');

  const handleSubmit = (formData: z.infer<typeof FormSchema>) => {
    const [id, roleName] = formData.role_id.split('_');
    const payload = {
      ...formData,
      role_id: id,
      roles: roleName,
      status: formData.status ? 1 : 0,
      password: formData.password === '' ? null : formData.password,
    };

    startTransition(async () => {
      if (data?.id) {
        // console.log(`${EMPLOYEES.PUT}/${data.id}`);
        const res = await api.put(
          `${EMPLOYEES.PUT}/${data.id}`,
          payload,
          EMPLOYEES.GET.LIST.TAGS,
        );
        // console.log('res -> ', res);
        if (res.success) {
          toast.success('Employee updated successfully!');
          form.reset();
          setIsOpen(false);
        } else {
          toast.error(res.message ?? 'Failed to update Employee');
        }
      } else {
        const res = await api.post(
          EMPLOYEES.POST,
          payload,
          EMPLOYEES.GET.LIST.TAGS,
        );

        // console.log('res -> ', res);

        if (res.success) {
          toast.success('Employee created successfully!');
          form.reset();
          setIsOpen(false);
        } else {
          toast.error(res.message ?? 'Failed to create Employee');
        }
      }
    });
  };
  // console.log(data);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[620px] rounded-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6 "
            >
              {/* Avatar Upload */}
              <ImageDropify
                image={form.watch('avatar') ?? ''}
                setImage={(img) => form.setValue('avatar', img)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space8">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter employee name"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter email"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Phone Field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Phone
                        <span className="text-blue-500 text-[11px]">
                          {' '}
                          (must be 11 digits and start with 013 to 019)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 013XXXXXXXX"
                          {...field}
                          maxLength={11}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Only allow digits and ensure it starts with 01
                            if (
                              /^(01[3-9]\d*)$/.test(value) ||
                              value === '' ||
                              value === '0' ||
                              value === '01'
                            ) {
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* NID Field */}
                <FormField
                  control={form.control}
                  name="nid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NID</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter NID number"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address Field */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter address"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role Select */}
                <FormField
                  control={form.control}
                  name="role_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <SelectorWithSearch
                          options={
                            roles?.map((role) => ({
                              label: role.name,
                              value: `${role.id}_${role.name}`,
                            })) || []
                          }
                          onChange={(val) => field.onChange(val)}
                          value={field.value}
                          Icon={ChevronDown}
                          placeholder="Select a role of the employee"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value}
                          placeholder="Enter password for the employee"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Status Field */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <div className="flex flex-row items-center justify-between rounded-lg border p-2 shadow-sm">
                        <p className="text-sm text-muted-foreground">
                          Is the employee active?
                        </p>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isLoading}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              {/* Status Toggle */}

              {/* Actions */}
              <DialogFooter className="flex gap-2">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="white"
                    className="w-full"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isActiveAction || isLoading}
                >
                  {isLoading
                    ? 'Please wait...'
                    : data
                      ? 'Save Changes'
                      : 'Add New'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeForm;
