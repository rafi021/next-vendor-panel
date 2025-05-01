'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  PurchaseReturnForm,
  PurchaseReturnSchemaDef,
} from '@/schemas/purchase/purchase-return';
import { api } from '@/server/api';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { useRouter } from 'next-nprogress-bar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useState } from 'react';
import { PackagePlus, Plus, Minus } from 'lucide-react';
import DatePicker from '@/components/common/forms/DatePicker';
import { IProduct } from '@/types/product-interface';
import { ISupplier } from '@/types/supplier-interface';
import BackButton from '@/components/common/back-button';
import { PURCHASES_RETURN } from '@/server/services/purchase-return';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { IPurchaseReturn } from '@/types/purchase-return-interface';
import { PURCHASES } from '@/server/services/purchase';

export interface IPurchaseReturnProps {
  suppliers?: ISupplier[];
  products?: IProduct[];
  title?: string;
  data?: IPurchaseReturn;
}

const AddPurchaseReturnForm = ({
  suppliers = [],
  products = [],
  title,
  data,
}: IPurchaseReturnProps) => {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const { form, isActiveAction, handleReset } = PurchaseReturnForm(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<
    PurchaseReturnSchemaDef['products']
  >([]);

  const calculateGrandTotal = () => {
    const products = form.watch('products') || [];
    const subtotal = products.reduce(
      (sum, product) => sum + product.sub_total,
      0,
    );
    const discount = form.watch('discount_amount') || 0;
    const shipping = form.watch('shipping_cost') || 0;
    const taxRate = form.watch('tax_rate') || 0;

    const taxAmount = subtotal * (taxRate / 100);
    const grandTotal = subtotal - discount + shipping + taxAmount;

    form.setValue('grand_total', grandTotal.toFixed(2));
    return grandTotal.toFixed(2);
  };

  const addProduct = () => {
    const currentProducts = form.getValues('products') || [];
    form.setValue('products', [
      ...currentProducts,
      { product_id: 0, purchase_price: 0, quantity: 1, sub_total: 0 },
    ]);
  };

  const removeProduct = (index: number) => {
    const currentProducts = form.getValues('products') || [];
    form.setValue(
      'products',
      currentProducts.filter((_, i) => i !== index),
    );
    calculateGrandTotal();
  };

  const updateSubtotal = (index: number) => {
    const currentProducts = form.getValues('products');
    if (currentProducts && currentProducts[index]) {
      const product = currentProducts[index];
      const subtotal = product.purchase_price * product.quantity;
      form.setValue(`products.${index}.sub_total`, subtotal);
      calculateGrandTotal();
    }
  };

  const onSubmit = (formData: PurchaseReturnSchemaDef) => {
    startTransition(async () => {
      try {
        // Create the purchase return
        const res = await api.post(
          PURCHASES_RETURN.POST,
          formData,
          PURCHASES_RETURN.GET.DETAILS.TAGS,
        );

        if (res.success) {
          // If successful and we have a purchase_id, update the original purchase
          // to mark it as having a return
          if (formData.purchase_id) {
            try {
              const updatePurchaseRes = await api.put(
                `${PURCHASES.PUT}/${formData.purchase_id}`,
                { purchase_return: { id: res.data.id } },
                PURCHASES.GET.TAGS,
              );

              if (!updatePurchaseRes.success) {
                console.error(
                  'Failed to update purchase with return status:',
                  updatePurchaseRes.message,
                );
              }
            } catch (error) {
              console.error(
                'Error updating purchase with return status:',
                error,
              );
            }
          }

          form.reset();
          toast.success(res.message);
          router.push('/purchase-return');
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.error('Error creating purchase return:', error);
        toast.error('Failed to create purchase return');
      }
    });
  };

  // Filter products for search
  const filteredProducts = searchTerm
    ? products.filter(
        (product) =>
          product.id.toString().includes(searchTerm) ||
          product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  return (
    <div className="min-h-screen">
      <Card className="mx-auto">
        <CardHeader className="p-space24 border-b border-gray-200">
          <div className="flex items-center justify-between gap-space16">
            <div className="flex  items-start gap-space16">
              <div className="p-2 border-[1px] rounded-lg bg-primary/10">
                <PackagePlus className="w-6 h-6 text-gray-500" />
              </div>
              <div className="">
                <h1 className="text-2xl font-semibold">
                  {title || 'Purchase Return'}
                </h1>
                <p className=" text-gray-500">
                  {data ? 'Update' : 'Create'} your purchase return in less than
                  2 minutes.
                </p>
              </div>
            </div>
            <BackButton />
          </div>
        </CardHeader>
        <CardContent className="!p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="p-space24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                  <div>
                    <FormField
                      control={form.control}
                      name="supplier_id"
                      render={({ field }) => (
                        <FormItem>
                          <Label>
                            Supplier <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select supplier" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {suppliers?.map((supplier) => (
                                <SelectItem
                                  key={supplier.id}
                                  value={supplier.id.toString()}
                                >
                                  {supplier.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <Label>
                            Date <span className="text-red-500">*</span>
                          </Label>
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
                  </div>
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="purchase_id"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <Label>Purchase ID</Label>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ''}
                            disabled={true}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {form.watch('products') &&
                  form.watch('products').length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium mb-2">
                        Return Items <span className="text-red-500">*</span>
                      </h3>
                      <Table>
                        <TableHeader className="bg-gray-200">
                          <TableRow>
                            <TableHead className="w-[60px]">#</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Purchase Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Subtotal</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {form.watch('products')?.map((product, index) => {
                            const selectedProduct = products.find(
                              (p) => p.id === product.product_id,
                            );
                            return (
                              <TableRow
                                key={index}
                                className="border-b border-gray-200 bg-gray-50"
                              >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                  {selectedProduct ? (
                                    `${selectedProduct.name} - ${selectedProduct.id}`
                                  ) : (
                                    <FormField
                                      control={form.control}
                                      name={`products.${index}.product_id`}
                                      render={({ field }) => (
                                        <Select
                                          onValueChange={(value) => {
                                            const productId = Number(value);
                                            field.onChange(productId);
                                            const product = products.find(
                                              (p) => p.id === productId,
                                            );
                                            if (product) {
                                              form.setValue(
                                                `products.${index}.purchase_price`,
                                                Number(product.purchase_price),
                                              );
                                              updateSubtotal(index);
                                            }
                                          }}
                                          value={field.value?.toString()}
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select product" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {products.map((product) => (
                                              <SelectItem
                                                key={product.id}
                                                value={product.id.toString()}
                                              >
                                                {product.name}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      )}
                                    />
                                  )}
                                </TableCell>
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`products.${index}.purchase_price`}
                                    render={({ field }) => (
                                      <Input
                                        type="number"
                                        step="0.01"
                                        {...field}
                                        onChange={(e) => {
                                          field.onChange(
                                            Number(e.target.value),
                                          );
                                          updateSubtotal(index);
                                        }}
                                      />
                                    )}
                                  />
                                </TableCell>

                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      type="button"
                                      onClick={() => {
                                        const currentQty = form.getValues(
                                          `products.${index}.quantity`,
                                        );
                                        if (currentQty > 1) {
                                          form.setValue(
                                            `products.${index}.quantity`,
                                            currentQty - 1,
                                          );
                                          updateSubtotal(index);
                                        }
                                      }}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <FormField
                                      control={form.control}
                                      name={`products.${index}.quantity`}
                                      render={({ field }) => (
                                        <Input
                                          type="number"
                                          min="1"
                                          className="w-16 text-center"
                                          {...field}
                                          onChange={(e) => {
                                            field.onChange(
                                              Number(e.target.value),
                                            );
                                            updateSubtotal(index);
                                          }}
                                        />
                                      )}
                                    />
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      type="button"
                                      onClick={() => {
                                        const currentQty = form.getValues(
                                          `products.${index}.quantity`,
                                        );
                                        form.setValue(
                                          `products.${index}.quantity`,
                                          currentQty + 1,
                                        );
                                        updateSubtotal(index);
                                      }}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`products.${index}.sub_total`}
                                    render={({ field }) => (
                                      <Input
                                        type="text"
                                        readOnly
                                        {...field}
                                        value={field.value.toFixed(2)}
                                      />
                                    )}
                                  />
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    type="button"
                                    variant="danger"
                                    onClick={() => removeProduct(index)}
                                  >
                                    Remove
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                <div className="mt-8">
                  <div className="flex justify-end ">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Subtotal</span>
                        <span className="font-bold">
                          ৳{' '}
                          {form
                            .watch('products')
                            ?.reduce(
                              (sum, product) => sum + product.sub_total,
                              0,
                            )
                            .toFixed(2) || '0.00'}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="font-medium">Tax Rate % &nbsp;</span>
                        <div className="flex items-center gap-1">
                          <FormField
                            control={form.control}
                            name="tax_rate"
                            render={({ field }) => (
                              <Input
                                type="number"
                                step="0.01"
                                className="w-52"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(Number(e.target.value));
                                  calculateGrandTotal();
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="font-medium">Discount &nbsp;</span>
                        <div className="flex items-center gap-1">
                          <span> ৳</span>
                          <FormField
                            control={form.control}
                            name="discount_amount"
                            render={({ field }) => (
                              <Input
                                type="number"
                                step="0.01"
                                className="w-52"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(Number(e.target.value));
                                  calculateGrandTotal();
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Shipping &nbsp;</span>
                        <div className="flex items-center gap-1">
                          <span>৳</span>
                          <FormField
                            control={form.control}
                            name="shipping_cost"
                            render={({ field }) => (
                              <Input
                                type="number"
                                step="0.01"
                                className="w-52"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(Number(e.target.value));
                                  calculateGrandTotal();
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-lg font-bold">
                          ৳ {form.watch('grand_total') || '0.00'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Notes</Label>
                        <FormControl>
                          <Textarea
                            placeholder="Enter notes here..."
                            className="resize-none"
                            {...field}
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t mt-4 border-gray-300 p-space24">
                <div className="flex gap-space12">
                  <Button variant="white" type="button" onClick={handleReset}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!isActiveAction || isLoading}>
                    {isLoading
                      ? 'Adding Purchase Return...'
                      : 'Add to Purchase Return'}
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

export default AddPurchaseReturnForm;
