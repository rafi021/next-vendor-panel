import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatDate } from '@/utils/date-format';

const ProductSchema = z.object({
  product_id: z.number().min(1, 'Product is required'),
  name: z.string().optional(),
  purchase_price: z.number().min(0, 'Purchase price must be a positive number'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  sub_total: z.number().min(0, 'Sub-total must be a positive number'),
  id: z.number().optional(),
});

export const PurchaseSchema = z.object({
  supplier_id: z.number().min(1, 'Supplier is required'),
  date: z.string().min(1, 'Date is required'),
  discount: z.number().optional(),
  shipping_cost: z.number().optional(),
  tax_rate: z.number().optional(),
  payment_status: z.enum(['paid', 'partially_paid', 'due']),
  account_id: z.number().optional(),
  paying_amount: z.string().optional(),
  category_id: z.string().optional(),
  brand_id: z.string().optional(),
  notes: z.string().optional(),
  grand_total: z.number().min(1, 'Grand total is required'),
  products: z.array(ProductSchema).min(1, 'At least one product is required'),
});

export type PurchaseSchemaDef = z.infer<typeof PurchaseSchema>;

export const PurchaseForm = (data?: any) => {
  const form = useForm<PurchaseSchemaDef>({
    resolver: zodResolver(PurchaseSchema),
    defaultValues: {
      supplier_id: data?.supplier_id || 0,
      date: data?.date || formatDate(new Date(), 'Y_M_D'),
      discount: data?.discount || 0,
      shipping_cost: data?.shipping_cost || 0,
      tax_rate: data?.tax_rate || 0,
      payment_status: data?.payment_status || 'due',
      account_id: data?.account_id || undefined,
      paying_amount: data?.paying_amount || '',
      category_id: data?.category_id || '',
      brand_id: data?.brand_id || '',
      notes: data?.notes || '',
      grand_total:data?.grand_total || 0,
      products: data?.products_purchase
        ? data.products_purchase.map((product: any) => ({
            name: product?.name || '',
            product_id: product?.product_id || '',
            purchase_price: product?.purchase_price || 0,
            quantity: product?.quantity || 0,
            sub_total: product?.sub_total || 0,
            id: product?.id || '',
          }))
        : [],
    },
  });

  const handleReset = () => {
    form.reset();
  };

  // const isActiveAction =
  // form.watch('supplier_id') > 0 &&
  // form.watch('date')?.length > 0 &&
  // form.watch('grand_total')?.length > 0

  return { form, handleReset };
};
