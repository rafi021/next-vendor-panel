import { Order } from '@/types/order-interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const OrderSchema = z.object({
  name: z.string().min(5, {
    message: 'Customer name is required and must be at least 5 characters.',
  }),
  customer_id: z.string().optional(),
  phone: z
    .string()
    .min(11, {
      message: 'Valid number of 11 digit is required',
    })
    .max(11, {
      message: 'Valid number of 11 digit is required',
    }),
  address: z.string().min(5, {
    message: 'Address required and must be at least 5 characters',
  }),
  discount_type: z.string().default('percentage'),
  discount: z
    .string()
    .min(1, {
      message: 'Enter a number or 0',
    })
    .default('0'),
  amount: z
    .string()
    .min(1, {
      message: 'Enter a number or 0',
    })
    .default('0'),

  location_type: z.string().optional(),

  note: z.string().nullable().optional(),
  staff_note: z.string().nullable().optional(),
  courier_cost: z.string().default('0'), // pathao
  sales_tax: z.string().default('0'),
  delivery_fee: z.string().default('0'), // customer
});

export type OrderSchemaDef = z.infer<typeof OrderSchema>;

export const useOrderForm = (order?: Order) => {
  const form = useForm<OrderSchemaDef>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      name: order ? order.customer.name : '',
      customer_id: order ? order?.customer_id : '',
      phone: order ? order.customer.phone : '',
      address: order ? order.shipping_address : '',
      note: order ? order.note : '',
      staff_note: order ? order.staff_note : '',
      amount: order ? String(order.amount_info.amount) : '0',
      sales_tax: String(order?.amount_info?.sales_tax ?? '0'),
      courier_cost: String(order?.amount_info?.courier_cost ?? '0'),
      delivery_fee: String(order?.amount_info?.delivery_fee ?? ''),
      location_type:
        order?.location_type && order?.amount_info?.delivery_fee
          ? `${order.location_type}/${order.amount_info.delivery_fee}`
          : '',
      discount_type: order?.amount_info.discount_type ?? 'fixed',
      discount: order?.amount_info?.discount
        ? String(order.amount_info.discount)
        : '0',
    },
  });

  return { form };
};
