import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ILeaveRequestProps } from '@/components/hrm/leave-request/AddLeaveRequestForm';

const LeaveRequestSchema = z.object({
  evidence: z.string().optional(),
  employee_id: z.string().min(1, 'Employee is required'),
  department_id: z.string().min(1, 'Department is required'),
  leave_type_id: z.string().min(1, 'Leave type is required'),
  start_date: z.string().min(3, 'Start date is required'),
  end_date: z.string().min(3, 'End date is required'),
  approval_status: z.string().optional(),
  notes: z.string().optional(),
});
export type LeaveRequestSchemaDef = z.infer<typeof LeaveRequestSchema>;

export const LeaveRequestForm = (data: ILeaveRequestProps['data']) => {
  const form = useForm<LeaveRequestSchemaDef>({
    resolver: zodResolver(LeaveRequestSchema),
    defaultValues: {
      evidence: data ? data.evidence : '',
      employee_id: data?.employee_id ? String(data.employee_id) : '',
      department_id: data?.department_id ? String(data.department_id) : '',
      leave_type_id: data?.leave_type_id ? String(data.leave_type_id) : '',
      start_date: data?.start_date ? data.start_date : '',
      end_date: data?.end_date ? data.end_date : '',
      approval_status: data?.approval_status ? data.approval_status : '',
      notes: data?.notes ? data.notes : '',
    },
  });

  const handleReset = () => {
    form.setValue('evidence', data?.evidence ?? '');
    form.setValue('employee_id', data?.employee_id ?? '');
    form.setValue('department_id', data?.department_id ?? '');
    form.setValue('leave_type_id', data?.leave_type_id ?? '');
    form.setValue('start_date', data?.start_date ?? '');
    form.setValue('end_date', data?.end_date ?? '');
    form.setValue('approval_status', data?.approval_status ?? '');
    form.setValue('notes', data?.notes ?? '');
  };

  const isActiveAction = () => {
    return (
      form.watch('employee_id')?.length > 0 &&
      form.watch('department_id')?.length > 0 &&
      form.watch('leave_type_id')?.length > 0 &&
      form.watch('start_date')?.length > 0 &&
      form.watch('end_date')?.length > 0
    );
  };

  return { form, handleReset, isActiveAction };
};
