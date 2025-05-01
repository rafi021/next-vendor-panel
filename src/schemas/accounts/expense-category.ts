import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IExpenseCategoryProps } from '@/components/accounts/expense-category/AddExpenseCategory';

const ExpenseCategorySchema = z.object({
  name: z.string().min(3, 'Expense category name required'),
  description: z.string().optional(),
  icon: z.string().optional(),
});
export type ExpenseCategorySchemaDef = z.infer<typeof ExpenseCategorySchema>;

export const ExpenseCategoryForm = (data: IExpenseCategoryProps['data']) => {
  const form = useForm<ExpenseCategorySchemaDef>({
    resolver: zodResolver(ExpenseCategorySchema),
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
