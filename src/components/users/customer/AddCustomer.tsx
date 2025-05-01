'use client';

import React, { useState, useTransition } from 'react';
import {
  Dialog,
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
import { toast } from 'sonner';
import { api } from '@/server/api';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CUSTOMERS } from '@/server/services/customer';
import ImageDropify from '@/components/common/ImageDropify';
import { CustomerForm, CustomerSchemaDef } from '@/schemas/user/customer';

export interface ICustomerProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  data?: {
    id?: string;
    name: string;
    image: string;
    phone: string;
    email: string | undefined;
  };
}
const AddCustomer = ({
  title,
  description = '',
  children,
  data,
}: ICustomerProps) => {
  const [isLoading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { form, handleReset, isActiveAction } = CustomerForm(data);

  function onSubmit(formData: CustomerSchemaDef) {
    startTransition(async () => {
      if (data) {
        const res = await api.put(
          `${CUSTOMERS.PUT.CUSTOMERS_UPDATE}/${data.id}`,
          formData,
          CUSTOMERS.GET.CUSTOMERS.TAGS,
        );

        if (res.success) {
          form.reset();
          toast.success(res.message);
          setIsOpen(false);
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await api.post(
          CUSTOMERS.POST.CUSTOMERS_CREATE,
          formData,
          CUSTOMERS.GET.CUSTOMERS.TAGS,
        );

        if (res.success) {
          form.reset();
          toast.success(res.message);
          setIsOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    });
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button>
            <Plus className="w-4 h-4" />
            Add New Customer
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[620px] rounded-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <ImageDropify
                image={form.watch('image') ?? ''}
                setImage={(img) => {
                  form.setValue('image', img);
                }}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        placeholder="Write customer name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Contact
                      <span className="text-blue-500 text-xs">
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        placeholder="Enter customer email address"
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
                  {data ? 'Save Update' : 'Add New'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomer;
