'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ImageDropify from '@/components/common/ImageDropify';
import { api } from '@/server/api';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { useRouter } from 'next-nprogress-bar';
import {
  SupplierForm,
  SupplierSchemaDef,
  supplierTypes,
} from '@/schemas/user/supplier';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { User } from 'lucide-react';
import DatePicker from '@/components/common/forms/DatePicker';
import { SUPPLIERS } from '@/server/services/suppliers';
import BackButton from '@/components/common/back-button';
import { ISupplier } from '@/types/supplier-interface';

export interface ISupplierProps {
  data?: ISupplier;
  title?: string;
}

const AddSupplierForm = ({ data, title }: ISupplierProps) => {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const { form, isActiveAction, handleReset } = SupplierForm(data);

  const onSubmit = (formData: SupplierSchemaDef) => {
    // console.log('data', formData);
    startTransition(async () => {
      try {
        let response;
        if (data?.id) {
          // Update existing supplier
          response = await api.put(
            `${SUPPLIERS.PUT}/${data.id}`,
            formData,
            SUPPLIERS.GET.TAGS,
          );
        } else {
          // Create new supplier
          response = await api.post(
            SUPPLIERS.POST,
            formData,
            SUPPLIERS.GET.TAGS,
          );
        }

        if (response.success) {
          toast.success(
            data?.id
              ? 'Supplier updated successfully'
              : 'Supplier created successfully',
          );
          router.push('/suppliers');
        } else {
          toast.error(response.message || 'Failed to process supplier');
        }
      } catch (error) {
        toast.error('An error occurred while processing the supplier');
        console.error(error);
      }
    });
  };

  return (
    <div className="bg-gray-50">
      <Card>
        <CardHeader className="p-space16 lg:p-space24 border-b border-gray-300">
          <div className="flex items-center justify-between gap-space16">
            <div className="flex  items-start gap-space16">
              <div className="p-2 border-[1px] rounded-lg bg-primary/10">
                <User className="w-6 h-6 text-gray-500" />
              </div>
              <div className="">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className=" text-gray-500">
                  {data ? 'Update' : 'Create'} your supplier in less than 2
                  minutes.
                </p>
              </div>
            </div>
            <BackButton />
          </div>
        </CardHeader>
        <CardContent className="!p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Supplier Image */}
              <div className="space-y-space16 p-6">
                <div className="space-y-2">
                  <FormLabel>Supplier image</FormLabel>
                  <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ImageDropify
                            image={field.value || ''}
                            setImage={(img) => field.onChange(img)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Two columns layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Supplier Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Contact */}
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
                  {/* Supplier Type */}
                  <FormField
                    control={form.control}
                    name="party_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {supplierTypes.map((type) => (
                              <SelectItem key={type} value={type.toUpperCase()}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Due Amount */}
                  <FormField
                    control={form.control}
                    name="due_amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Amount</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value ?? ''}
                            placeholder="Enter due amount..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="due_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <DatePicker
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            placeholder="Select date"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Advance Payment Amount */}
                  <FormField
                    control={form.control}
                    name="advance_amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Advance Payment Amount</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value ?? ''}
                            placeholder="Enter advance payment amount..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-gray-300 p-space24">
                <div className="flex gap-space12">
                  <Button variant="white" type="button" onClick={handleReset}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!isActiveAction || isLoading}>
                    {isLoading
                      ? data?.id
                        ? 'Updating Supplier...'
                        : 'Adding Supplier...'
                      : data?.id
                        ? 'Update Supplier'
                        : 'Add to Supplier'}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSupplierForm;
