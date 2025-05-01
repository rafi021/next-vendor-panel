
import { IStoreBrandProps } from '@/components/store-ui/footer/StoreFooterMenu';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FooterMenuSchema = z.object({
  head: z.string().min(2, {
    message: 'Head Field is required',
  }),
  sub_head: z.string().min(2, {
    message: 'Sub head Field is required',
  }),
  url: z.string({
    message: 'URL is required',
  }),
  priority: z.string().optional(),
});

export type FooterMenuSchemaDef = z.infer<typeof FooterMenuSchema>;

export const FooterMenuForm = (data: IStoreBrandProps['data']) => {
  const form = useForm<FooterMenuSchemaDef>({
    resolver: zodResolver(FooterMenuSchema),
    defaultValues: {
      head: data ? data.head : undefined,
      sub_head: data ? data.sub_head : undefined,
      url: data ? data.url : '',
      priority: data ? String(data.priority) : undefined,
    },
  });

  const handleReset = () => {
    form.setValue('head', data ? data.head : '');
    form.setValue('sub_head', data ? data.sub_head : '');
    form.setValue('url', data ? data.url : '');
    form.setValue('priority', data ? String(data.priority) : '');
  };

  const isActiveAction =
    form.watch('head')?.length > 0 &&
    form.watch('sub_head')?.length > 0 &&
    (form.watch('priority') ?? '').length > 0;

  return { form, handleReset, isActiveAction };
};

export const heads = ['Pages', 'Information', 'Others'];
