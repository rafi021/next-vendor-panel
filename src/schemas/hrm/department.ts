import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IDepartmentProps } from '@/components/hrm/department/AddDepartment';

const DepartmentSchema = z.object({
    icon: z.string().nullable().optional(),
    name: z.string().min(2, 'Department is name required'),
    description: z.string().optional()
  });
export type DepartmentSchemaDef = z.infer<typeof DepartmentSchema>;

export const DepartmentForm = (data: IDepartmentProps['data']) => {
  const form = useForm<DepartmentSchemaDef>({
    resolver: zodResolver(DepartmentSchema),
    defaultValues: {
        name: data ? data.name : '',
        icon: data ? data.icon : null,
        description: data ? data.description : '',
      },
  });

  const handleReset = () => {
    form.setValue('name', data?.name ?? '');
    form.setValue('icon', data ? data.icon : null);
    form.setValue('description', data ? data.description : '');
  };

  const isActiveAction =
    form.watch('name')?.length > 0;

  return { form, handleReset, isActiveAction };
};

