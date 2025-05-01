import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatDate } from '@/utils/date-format';

export const SupplierSchema = z.object({
  avatar: z.string().optional(),
  name: z.string().min(1, 'Supplier name is required'),
  phone: z
    .string()
    .min(11, 'Contact number is required')
    .max(11, 'Contact number must be 11 digits'),
  due_amount: z.string().optional(),
  advance_amount: z.string().optional(),
  party_type: z.string().min(1, 'Supplier type is required'),
  due_date: z.string().optional(),
});

export type SupplierSchemaDef = z.infer<typeof SupplierSchema>;

export const supplierTypes = ['Dealer', 'Distributor', 'Producer'];

export const SupplierForm = (data?: any) => {
  const form = useForm<SupplierSchemaDef>({
    resolver: zodResolver(SupplierSchema),
    defaultValues: {
      avatar: data?.avatar || '',
      name: data?.name || '',
      phone: data?.phone || '',
      due_amount: String(data?.due_amount ?? ''),
      advance_amount: String(data?.advance_amount ?? ''),
      party_type: data?.party_type || '',
      due_date: data?.due_date || '',
    },
  });

  const isActiveAction =
    form.watch('name')?.length > 0 &&
    form.watch('phone')?.length > 0 &&
    form.watch('party_type')?.length > 0;

  const handleReset = () => {
    form.reset();
  };

  return { form, isActiveAction, handleReset };
};
