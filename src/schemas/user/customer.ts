import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ICustomerProps } from '@/components/users/customer/AddCustomer';

export const CustomerSchema = z.object({
  image: z.string().optional(),
  name: z.string().min(1, 'Customer name is required'),
  phone: z.string().min(1, 'Contact number is required'),
  email: z.string().optional(),
});

export type CustomerSchemaDef = z.infer<typeof CustomerSchema>;

export const CustomerForm = (data?: ICustomerProps['data']) => {
  const form = useForm<CustomerSchemaDef>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      image: data?.image || '',
      name: data?.name || '',
      phone: data?.phone || '',
      email: data?.email || '',
    },
  });

  const isActiveAction =
    form.watch('name')?.length > 0 && form.watch('phone')?.length > 0;

  const handleReset = () => {
    form.reset();
  };

  return { form, isActiveAction, handleReset };
};
