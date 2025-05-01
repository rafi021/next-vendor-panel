import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IDepositProps } from '@/components/accounts/deposit/AddDepositForm';

const DepositSchema = z.object({
  evidence: z.string().nullable().optional(),
  account_id: z.string().min(1, 'Account is required'),
  deposit_category_id: z.string().min(1, 'Deposit Category is required'),
  date: z.string().min(3, 'Date is required'),
  amount: z.string().min(1, 'Amount is required'),
  notes: z.string().optional(),
});
export type DepositSchemaDef = z.infer<typeof DepositSchema>;

export const DepositForm = (data: IDepositProps['data']) => {
  const form = useForm<DepositSchemaDef>({
    resolver: zodResolver(DepositSchema),
    defaultValues: {
      evidence: data ? data.evidence : null,
      account_id: data?.account_id ? String(data.account_id) : '',
      deposit_category_id: data?.deposit_category_id
        ? String(data.deposit_category_id)
        : '',
      amount: data?.amount ? String(data.amount) : '',
      notes: data?.notes ? data.notes : '',
      date: data?.date ? data.date : '',
    },
  });

  const handleReset = () => {
    form.setValue('amount', data?.amount ?? '');
    form.setValue('notes', data ? data.notes : '');
    form.setValue('date', data ? data.date : '');
  };

  const isActiveAction =
    form.watch('account_id')?.length > 0 &&
    form.watch('deposit_category_id')?.length > 0 &&
    form.watch('date')?.length > 0 &&
    form.watch('amount')?.length > 0;

  return { form, handleReset, isActiveAction };
};
