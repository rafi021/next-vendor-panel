import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

// Define the schema for product items in a purchase return
const PurchaseReturnProductSchema = z.object({
  product_id: z.number(),
  purchase_price: z.number(),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  sub_total: z.number(),
});

// Define the purchase return schema
export const PurchaseReturnSchema = z.object({
  supplier_id: z.string({
    required_error: 'Supplier is required',
  }),
  date: z.string({
    required_error: 'Date is required',
  }),
  purchase_id: z.number().min(1, 'Purchase ID is required'),
  products: z
    .array(PurchaseReturnProductSchema)
    .min(1, 'At least one product is required'),
  tax_rate: z.number().default(0),
  discount_amount: z.number().default(0),
  shipping_cost: z.number().default(0),
  grand_total: z.string().default('0.00'),
  notes: z.string().optional().nullable(),
});

// Define the type for the schema
export type PurchaseReturnSchemaDef = z.infer<typeof PurchaseReturnSchema>;

// Hook to create form with default values
export const PurchaseReturnForm = (data?: any) => {
  const [isActiveAction, setIsActiveAction] = useState(true);

  // Set default values
  const defaultValues: Partial<PurchaseReturnSchemaDef> = {
    supplier_id: String(data?.supplier_id ?? ""),
    date: new Date().toISOString(),
    purchase_id: data?.id || undefined,
    products: data?.products_purchase
      ? data.products_purchase.map((product: any) => ({
          product_id: product?.product_id,
          purchase_price: product?.purchase_price,
          quantity: product?.quantity,
          sub_total: product?.sub_total,
        }))
      : [],
    tax_rate: data?.tax_rate || 0,
    discount_amount: data?.discount || 0,
    shipping_cost: data?.shipping_cost || 0,
    grand_total: data?.grand_total?.toString() || '0.00',
    notes: data?.notes || '',
  };

  // Create form with validation schema
  const form = useForm<PurchaseReturnSchemaDef>({
    resolver: zodResolver(PurchaseReturnSchema),
    defaultValues,
  });

  // Reset form handler
  const handleReset = () => {
    form.reset();
    setIsActiveAction(false);
  };

  return {
    form,
    isActiveAction,
    handleReset,
  };
};
