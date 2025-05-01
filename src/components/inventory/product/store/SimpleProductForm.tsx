import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ProductSchemaDef } from '@/schemas/inventory/product';
import {
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

import { ulid } from 'ulid';
import { Button } from '@/components/ui/button';
import { ListRestart } from 'lucide-react';

const units = ['KG', 'GRAM'];
const discountTypes = ['fixed', 'percent'];
const stockStatus = [
  {
    key: 'instock',
    value: 'In Stock',
  },
  {
    key: 'outofstock',
    value: 'Out Of Stock',
  },
];

interface IProps {
  form: UseFormReturn<ProductSchemaDef>;
}

const SimpleProductForm = ({ form }: IProps) => {
  const regularPrice = parseFloat(form.watch('regular_price') ?? '0');
  const discountType = form.watch('discount_type'); // 'percentage' | 'fixed'
  const discountValue = parseFloat(form.watch('discounted_price') ?? '0');

  useEffect(() => {
    const calculateSellPrice = () => {
      if (regularPrice <= 0) return 0;

      let sellPrice = 0;

      if (discountType === 'percent') {
        sellPrice = regularPrice - (regularPrice * discountValue) / 100;
      } else if (discountType === 'fixed') {
        sellPrice = regularPrice - discountValue;
      } else {
        sellPrice = regularPrice; // no discount type provided
      }

      // Prevent negative prices
      sellPrice = Math.max(0, sellPrice);

      // Set the form value as a string with 2 decimal places
      form.setValue('sell_price', sellPrice.toFixed(2));

      // console.log('Calculated Sell Price:', sellPrice);
    };

    calculateSellPrice();
  }, [regularPrice, discountType, discountValue, form]);

  return (
    <div className="space-y-space12 border border-gray-200 rounded-md p-space12">
      <div className="grid sm:grid-cols-2 gap-space16">
        <FormField
          control={form.control}
          name="purchase_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Purchase Price <span className="text-error-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  value={field.value ?? ''}
                  placeholder="Enter purchase price"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="regular_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Regular Price <span className="text-error-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  value={field.value ?? ''}
                  placeholder="Enter regular price"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-space16">
        <div className="space-y-1 ">
          <FormLabel>
            Discount{' '}
            {form.watch('discount_type') == 'percent' ? 'Percentage' : 'Amount'}
          </FormLabel>

          <div className="flex items-center w-full">
            <FormField
              control={form.control}
              name="discount_type"
              render={({ field }) => (
                <FormItem className="min-w-max">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-r-none">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {discountTypes.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item.toLocaleUpperCase()}
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
              name="discounted_price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!discountType}
                      type="number"
                      value={field.value ?? '0'}
                      className="rounded-l-none border-l-0"
                      placeholder={`Enter discount ${form.watch('discount_type') === 'percent' ? 'percent' : 'price'}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="sell_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sell Price</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  value={field.value ?? ''}
                  placeholder="Enter sell price"
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
          name="stock_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? 'instock'}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stock status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stockStatus.map((item) => (
                    <SelectItem key={item.key} value={item.key}>
                      {item.value}
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
          name="stock_quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock Quantity</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  value={field.value ?? ''}
                  placeholder="Enter stock quantity"
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
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <div className="flex items-center gap-space8">
                  <Input
                    {...field}
                    value={field.value ?? ulid()}
                    onChange={(evt) => {
                      form.setValue('sku', evt.target.value);
                    }}
                    placeholder="Enter sku"
                  />
                  <Button
                    size={'sm'}
                    type="button"
                    onClick={() => {
                      form.setValue('sku', ulid());
                    }}
                  >
                    <ListRestart />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-space12 items-end">
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Select Weight</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="0.0"
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? 'KG'}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SimpleProductForm;
