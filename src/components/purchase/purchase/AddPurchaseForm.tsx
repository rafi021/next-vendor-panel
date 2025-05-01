'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PurchaseForm, PurchaseSchemaDef } from '@/schemas/purchase/purchase';
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
import { PackagePlus, Plus, Minus, Trash, X } from 'lucide-react';
import DatePicker from '@/components/common/forms/DatePicker';
import { IProduct } from '@/types/product-interface';
import { ISupplier } from '@/types/supplier-interface';
import { IAccount } from '@/types/accounts-interface';
import BackButton from '@/components/common/back-button';
import { IPurchase } from '@/types/purchase-interface';
import { PURCHASES } from '@/server/services/purchase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { ICategory } from '@/types/category-interfaces';
import { Brand } from '@/types/brands-interface';
import SearchInput from '@/components/common/forms/SearchInput';
import { useQueryState } from 'nuqs';

export interface IPurchaseProps {
  suppliers?: ISupplier[];
  products?: IProduct[];
  accounts?: IAccount[];
  categories?: ICategory[];
  brands?: Brand[];
  title?: string;
  data?: IPurchase;
}

const AddPurchaseForm = ({
  suppliers = [],
  products = [],
  accounts = [],
  categories = [],
  brands = [],
  title,
  data,
}: IPurchaseProps) => {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const { form, handleReset } = PurchaseForm(data);

  const [selectedProducts, setSelectedProducts] = useState<
    PurchaseSchemaDef['products']
  >(
    data?.products_purchase
      ? data.products_purchase.map((item) => ({
          product_id: Number(item.product_id),
          purchase_price: Number(item.purchase_price),
          quantity: Number(item.quantity),
          sub_total: Number(item.sub_total),
          name: item.product?.name,
          id: Number(item.id),
        }))
      : [],
  );

  const calculateGrandTotal = () => {
    const products = form.watch('products') || [];
    const subtotal = products.reduce(
      (sum, product) => sum + product.sub_total,
      0,
    );
    const discount = form.watch('discount') || 0;
    const shipping = form.watch('shipping_cost') || 0;
    const taxRate = form.watch('tax_rate') || 0;

    const taxAmount = subtotal * (taxRate / 100);
    const grandTotal = subtotal - discount + shipping + taxAmount;

    form.setValue('grand_total', Number(grandTotal.toFixed(2)));
    return grandTotal.toFixed(2);
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

  const onSubmit = (formData: PurchaseSchemaDef) => {
    startTransition(async () => {
      if (data) {
        const res = await api.put(
          `${PURCHASES.PUT}/${data.id}`,
          formData,
          PURCHASES.GET.TAGS,
        );

        if (res.success) {
          form.reset();
          toast.success(res.message);
          router.push('/purchase');
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await api.post(
          PURCHASES.POST,
          formData,
          PURCHASES.GET.TAGS,
        );
        if (res.success) {
          form.reset();
          toast.success(res.message);
          router.push('/purchase');
        } else {
          toast.error(res.message);
        }
      }
    });
  };

  // Filter products for search
  const [selectedBrand, setSelectedBrand] = useQueryState('brand', {
    shallow: false,
    defaultValue: '',
  });

  const [selectedCategory, setSelectedCategory] = useQueryState('category', {
    shallow: false,
    defaultValue: '',
  });

  const [searchTerm, setSearchTerm] = useQueryState('search', {
    shallow: false,
    defaultValue: '',
  });

  const isViewingProducts = selectedBrand || selectedCategory || searchTerm;

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
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className=" text-gray-500">
                  {data ? 'Update' : 'Create'} your purchase in less than 2
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
              <div className="p-space24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                  <div>
                    <FormField
                      control={form.control}
                      name="supplier_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Supplier <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            value={field.value?.toString()}
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
                          <FormLabel>
                            Date <span className="text-red-500">*</span>
                          </FormLabel>
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
                <div className="bg-gray-50 mb-6 p-space12 border relative border-gray-200 rounded-lg">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      setSelectedBrand('');
                      setSelectedCategory('');
                      setSearchTerm('');
                      form.setValue('brand_id', '');
                      form.setValue('category_id', '');
                    }}
                    className="text-xs absolute right-3 top-1.5 h-7"
                  >
                    Reset
                  </Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                    <FormField
                      control={form.control}
                      name="brand_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Filter by Brand</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedBrand(value);
                              setSelectedCategory('');
                              setSearchTerm('');
                            }}
                            value={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select brand" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {brands?.map((brand) => (
                                <SelectItem
                                  key={brand.id}
                                  value={brand.id.toString()}
                                >
                                  {brand.name}
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
                      name="category_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Filter by Category</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedCategory(value);
                              setSelectedBrand('');
                              setSearchTerm('');
                            }}
                            value={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories?.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id.toString()}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <Label>
                        Products <span className="text-red-500">*</span>
                      </Label>
                    </div>
                    <SearchInput
                      className="!h-[40px]"
                      onChange={(value) => {
                        setSelectedBrand('');
                        setSelectedCategory('');
                      }}
                    />
                    {isViewingProducts.length > 0 && products?.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1">
                        {products?.map((product) => (
                          <div
                            key={product?.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                            onClick={() => {
                              selectedProducts.push({
                                product_id: product?.id,
                                purchase_price:
                                  Number(product?.purchase_price) || 310,
                                quantity: 1,
                                sub_total:
                                  Number(product?.purchase_price) || 310,
                                name: product?.name,
                              });
                              // setSelectedProducts(selectedProducts);
                              form.setValue('products', selectedProducts);
                              calculateGrandTotal();
                              setSearchTerm('');
                            }}
                          >
                            {product?.id} - {product?.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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
                          {selectedProducts?.map((product, index) => {
                            // Check if this product appears earlier in the array
                            const isDuplicate = selectedProducts.findIndex(p => p.product_id === product.product_id) !== index;
                            
                            // Show alert for duplicate products
                            if (isDuplicate) {
                              toast.error(`${product?.name} is already exist in your list.`);
                            }
                            
                            return !isDuplicate && (
                            <TableRow
                              key={index}
                              className="border-b border-gray-200 bg-gray-50"
                            >
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>
                                {product ? (
                                  `${product?.name} - ${product?.product_id}`
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
                                          {products?.map((product) => (
                                            <SelectItem
                                              key={product?.id}
                                              value={product?.id.toString()}
                                            >
                                              {product?.name}
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
                                        field.onChange(Number(e.target.value));
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
                                  className="text-xs"
                                >
                                  <Trash className="w-4 h-4" />
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

                      {/* <div className="flex justify-between items-center">
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
                      </div> */}

                      <div className="flex justify-between items-center">
                        <span className="font-medium">Discount &nbsp;</span>
                        <div className="flex items-center gap-1">
                          <span> ৳</span>
                          <FormField
                            control={form.control}
                            name="discount"
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
                      {/* <div className="flex justify-between items-center">
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
                      </div> */}

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
                    name="payment_status"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <Label>Status</Label>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="partially_paid">
                              Partially Paid
                            </SelectItem>
                            <SelectItem value="due">Due</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Payment details for paid or partially paid */}
                  {(form.watch('payment_status') === 'paid' ||
                    form.watch('payment_status') === 'partially_paid') && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="account_id"
                        render={({ field }) => (
                          <FormItem>
                            <Label>
                              Payment Account{' '}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
                              value={field.value?.toString()}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select account" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {accounts?.map((account) => (
                                  <SelectItem
                                    key={account?.id}
                                    value={account?.id.toString()}
                                  >
                                    {account?.name}
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
                        name="paying_amount"
                        render={({ field }) => (
                          <FormItem>
                            <Label>
                              Paying Amount{' '}
                              <span className="text-red-500">*</span>
                            </Label>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter paying amount"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

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
                  <Button type="submit" disabled={isLoading}>
                    {isLoading
                      ? data?.id
                        ? 'Updating Purchase...'
                        : 'Adding Purchase...'
                      : data?.id
                        ? 'Update Purchase'
                        : 'Add to Purchase'}
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

export default AddPurchaseForm;
