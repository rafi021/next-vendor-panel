import React from 'react';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { ProductSchemaDef } from '@/schemas/inventory/product';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface IProps {
  form: UseFormReturn<ProductSchemaDef>;
}

const StoreOthersForm = ({ form }: IProps) => {
  return (
    <div className="space-y-space16">
      <div className="space-y-space12 border border-gray-200 rounded-md p-space16">
        <div className="border-b border-gray-200 text-black font-semibold text-md pb-space8">
          Return Policy
        </div>

        <FormField
          control={form.control}
          name="return_policy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Return Policy</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder="e.g. Within 15 days of purchase"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-space12 border border-gray-200 rounded-md p-space16">
        <div className="border-b border-gray-200 text-black font-semibold text-md pb-space8">
          Estimated Delivery
        </div>

        <FormField
          control={form.control}
          name="estimated_delivery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Delivery Time</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder="e.g. 20 Dec 2024"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="delivery_details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Details</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ''}
                  placeholder="Write a few sentences about the delivery details..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-space12 border border-gray-200 rounded-md p-space16">
        <div className="border-b border-gray-200 text-black font-semibold text-md pb-space8">
          Search Engine Listing
        </div>

        <FormField
          control={form.control}
          name="page_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Page Title <span className="text-error-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder="Your page title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url_handle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                URL Handle <span className="text-error-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder="e.g. Products/handle"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="meta_keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Meta Keywords <span className="text-error-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder="Write a few keywords for the website..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="meta_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Meta Description <span className="text-error-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ''}
                  placeholder="Write a few sentences about the website..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default StoreOthersForm;
