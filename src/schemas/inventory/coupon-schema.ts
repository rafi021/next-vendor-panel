import { ICoupon } from '@/types/coupon-interface';
import { formatDate } from '@/utils/date-format';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const CouponSchema = z.object({
  name: z.string().min(5, {
    message: 'Coupon name is required and must be at least 5 characters.',
  }),
  discount_type: z.enum(['percentage', 'fixed'], {
    required_error: 'You need to select a discount type.',
  }),
  amount: z
    .string({
      required_error: 'End date is required.',
    })
    .min(1, 'Amount is required'),
  valid_from: z
    .string({
      required_error: 'Start date is required.',
    })
    .min(1, 'Start date is required'),
  valid_to: z
    .string({
      required_error: 'End date is required.',
    })
    .min(1, 'End date is required'),
  usage_limit: z.string({ required_error: 'Usage limit is required.' }),
  max_uses_per_customer: z
    .string({ required_error: 'Max usage per customer is required' })
    .min(1, 'Must be at least 1 per customer.'),
  min_purchase_amount: z
    .string({ required_error: 'Min purchase amount is required' })
    .min(0, 'Minimum purchase amount must be 0 or more.'),
});

export type CouponSchemaDef = z.infer<typeof CouponSchema>;

export const useCouponForm = (data?: ICoupon) => {
  const form = useForm<CouponSchemaDef>({
    resolver: zodResolver(CouponSchema),
    defaultValues: {
      name: data ? data.name : '',
      discount_type: data?.discount_type ? data.discount_type : 'percentage',
      amount: data?.amount ? String(data.amount) : '',
      valid_from: data ? formatDate(data.valid_from, 'Y_M_D') : undefined,
      valid_to: data ? formatDate(data.valid_to, 'Y_M_D') : undefined,
      usage_limit: data ? data.usage_limit?.toString() : '1',
      max_uses_per_customer: data
        ? data.max_uses_per_customer?.toString()
        : '1',
      min_purchase_amount: data ? data.min_purchase_amount?.toString() : '0',
    },
  });

  return form;
};
