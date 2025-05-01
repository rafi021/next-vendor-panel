import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ILeaveTypeProps } from '@/components/hrm/leave-type/AddLeaveType';

const LeaveTypeSchema = z.object({
  name: z.string().min(2, 'Department name is required'),
  description: z.string().min(3, 'Description is required'),
});
export type LeaveTypeSchemaDef = z.infer<typeof LeaveTypeSchema>;

export const LeaveTypeForm = (data: ILeaveTypeProps['data']) => {
  const form = useForm<LeaveTypeSchemaDef>({
    resolver: zodResolver(LeaveTypeSchema),
    defaultValues: {
      name: data ? data.name : '',
      description: data ? data.description : '',
    },
  });

  const handleReset = () => {
    form.setValue('name', data?.name ?? '');
    form.setValue('description', data?.description ?? '');
  };

  const isActiveAction =
    form.watch('name')?.length > 0 && form.watch('description')?.length > 0;

  return { form, handleReset, isActiveAction };
};
