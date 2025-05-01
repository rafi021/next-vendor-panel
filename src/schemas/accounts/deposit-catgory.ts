import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IDepositCategoryProps } from '@/components/accounts/deposit-category/AddDepositCategory';

const DepositCategorySchema = z.object({
  name: z.string().min(3, 'Deposit category name required'),
  description: z.string().optional(),
  icon: z.string().optional(),
});
export type DepositCategorySchemaDef = z.infer<typeof DepositCategorySchema>;

export const DepositCategoryForm = (data: IDepositCategoryProps['data']) => {
  const form = useForm<DepositCategorySchemaDef>({
    resolver: zodResolver(DepositCategorySchema),
    defaultValues: {
      name: data ? data.name : '',
      description: data?.description ? data.description : '',
      icon: data?.icon ? data.icon : '',
    },
  });

  const handleReset = () => {
    form.setValue('name', data ? data.name : '');
    form.setValue('icon', data ? data.icon : '');
    form.setValue('description', data ? data.description : '');
  };

  const isActiveAction =
    form.watch('name')?.length > 0

  return { form, handleReset, isActiveAction };
};
