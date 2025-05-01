import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const DamageSchema = z.object({
  image: z.string().optional(),
  product_id: z.string().min(1, 'Product is required'),
  type: z.string().min(1, 'Product type is required'),
  date: z.string().min(1, 'Damage date is required'),
  quantity: z.string().min(1, 'Damage quantity is required'),
  notes: z.string().optional(),
});
export type DamageSchemaDef = z.infer<typeof DamageSchema>;

export const DamageForm = () => {
  const form = useForm<DamageSchemaDef>({
    resolver: zodResolver(DamageSchema),
  });

  const isActiveAction =
    form.watch('product_id')?.length > 0 &&
    form.watch('type')?.length > 0 &&
    form.watch('date')?.length > 0 &&
    form.watch('quantity')?.length > 0;

  return { form, isActiveAction };
};

export const damageTypes = [
  'lost-product',
  'damage',
  'damage-return',
  'expire-product',
];
