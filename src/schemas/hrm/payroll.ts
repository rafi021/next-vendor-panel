import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IPayrollProps } from '@/components/hrm/payroll/AddPayrollForm';

const PayrollSchema = z.object({
  employee_id: z.string().min(1, 'Employee is required'),
  account_id: z.string().min(1, 'Account is required'),
  amount: z.string().min(1, 'Amount is required'),
  method: z.string().min(1, 'Method is required'),
  date: z.string().min(3, 'Date is required'),
  reference: z.string().optional(),
  notes: z.string().optional(),
  status: z.string().optional(),
  month: z.string().min(1, 'Month is required'),
  year: z.string().optional(),
});
export type PayrollSchemaDef = z.infer<typeof PayrollSchema>;

export const PayrollForm = (data: IPayrollProps['data']) => {
  const form = useForm<PayrollSchemaDef>({
    resolver: zodResolver(PayrollSchema),
    defaultValues: {
      employee_id: data?.employee_id ? String(data.employee_id) : '',
      account_id: data?.account_id ? String(data.account_id) : '',
      amount: data?.amount ?? '',
      method: data?.method ?? '',
      date: data?.date ?? '',
      reference: data?.reference ?? '',
      notes: data?.notes ?? '',
      status: data?.status ?? '',
      month: data?.month ?? '',
      year: data?.year ?? '',
    },
  });

  const handleReset = () => {
    form.setValue('employee_id', data?.employee_id ?? '');
    form.setValue('account_id', data?.account_id ?? '');
    form.setValue('amount', data?.amount ?? '');
    form.setValue('method', data?.method ?? '');
    form.setValue('date', data?.date ?? '');
    form.setValue('reference', data?.reference ?? '');
    form.setValue('notes', data?.notes ?? '');
    form.setValue('status', data?.status ?? '');
    form.setValue('month', data?.month ?? '');
    form.setValue('year', data?.year ?? '');
    form.setValue('month', data?.month ?? '');
    form.setValue('year', data?.year ?? '');
  };

  const isActiveAction =
    form.watch('employee_id')?.length > 0 &&
    form.watch('account_id')?.length > 0 &&
    form.watch('amount')?.length > 0 &&
    form.watch('method')?.length > 0 &&
    form.watch('date')?.length > 0;

  return { form, handleReset, isActiveAction };
};

export const status = ['pending', 'paid', 'partial'];

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const years = Array.from(
  { length: 20 },
  (_, i) => new Date().getFullYear() - i,
);
