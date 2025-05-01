import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IAccountProps } from '@/components/accounts/account/AddAccount';

const AccountSchema = z.object({
  name: z.string().min(3, 'Account name required'),
  number: z.string().min(3, 'Account number is required'),
  balance: z.string({ message: 'Enter a balance or zero' }).default('0'),
  notes: z.string().optional(),
});
export type AccountSchemaDef = z.infer<typeof AccountSchema>;

export const AccountForm = (data: IAccountProps['data']) => {
  const form = useForm<AccountSchemaDef>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: data ? data.name : '',
      number: data?.number ? data.number : '',
      balance: data?.balance ? data.balance : '0',
      notes: data?.notes ? data.notes : '',
    },
  });

  const handleReset = () => {
    form.setValue('name', data ? data.name : '');
    form.setValue('balance', data ? data.balance : '');
    form.setValue('number', data ? data.number : '');
    form.setValue('notes', data ? data.notes : '');
  };

  const isActiveAction =
    form.watch('name')?.length > 0 &&
    form.watch('number')?.length > 0 &&
    form.watch('balance')?.length > 0;

  return { form, handleReset, isActiveAction };
};
