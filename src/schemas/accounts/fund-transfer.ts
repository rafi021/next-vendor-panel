import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IFundTransferProps } from '@/components/accounts/fund-transfer/AddFundTransferForm';

const FundTransferSchema = z.object({
  evidence: z.string().optional(),
  from_account_id: z.string().min(1, 'From account is required'),
  to_account_id: z.string().min(1, 'To account is required'),
  amount: z.string().min(1, 'Amount is required'),
  transfer_amount: z.string().min(1, 'Transfer amount is required'),
  cost: z.string().min(1, 'Cost is required'),
  comment: z.string().optional(),
});
export type FundTransferSchemaDef = z.infer<typeof FundTransferSchema>;

export const FundTransferForm = (data: IFundTransferProps['data']) => {
  const form = useForm<FundTransferSchemaDef>({
    resolver: zodResolver(FundTransferSchema),
    defaultValues: {
      evidence: data?.evidence ?? '',
      from_account_id: data?.from_account_id
        ? String(data.from_account_id)
        : '',
      to_account_id: data?.to_account_id ? String(data.to_account_id) : '',
      amount: data?.amount ? String(data.amount) : '',
      transfer_amount: data?.transfer_amount
        ? String(data.transfer_amount)
        : '',
      cost: data?.cost ? String(data.cost) : '',
      comment: data?.comment ? data.comment : '',
    },
  });

  const handleReset = () => {
    form.setValue('amount', data?.amount ?? '');
    form.setValue('cost', data ? data.cost : '');
    form.setValue('comment', data ? data.comment : '');
    form.setValue('transfer_amount', data ? data.transfer_amount : '');
  };

  const isActiveAction =
    form.watch('from_account_id')?.length > 0 &&
    form.watch('to_account_id')?.length > 0 &&
    form.watch('amount')?.length > 0 &&
    form.watch('transfer_amount')?.length > 0 &&
    form.watch('cost')?.length > 0;

  return { form, handleReset, isActiveAction };
};
