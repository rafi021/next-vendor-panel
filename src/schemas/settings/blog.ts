import { IStoreBlogProps } from '@/components/settings/blogs/StoreBlogForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const BlogSchema = z.object({
  title: z.string().min(2, {
    message: 'Title Field is required',
  }),
  description: z.string().min(2, {
    message: 'Description Field is required',
  }),
  published_at: z.string({
    required_error: 'Publish date Field is required',
  }),
  image_url: z.string().optional(),
  categories: z.string().array().optional(),
  tags: z.string().array().optional(),
});

export type BlogSchemaDef = z.infer<typeof BlogSchema>;

export const BlogForm = (data: IStoreBlogProps['data']) => {
  const form = useForm<BlogSchemaDef>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: data ? data.title : undefined,
      description: data ? data.description : undefined,
      image_url: data?.image_url ? data.image_url : '',
      published_at: data?.published_at ? data.published_at : '',
      // categories: data ? String(data.priority) : undefined,
      // tags: data ? String(data.priority) : undefined,
    },
  });

  const handleReset = () => {
    form.setValue('title', data ? data.title : '');
    form.setValue('description', data ? data.description : '');
    form.setValue('image_url', data ? data.image_url : '/');
    form.setValue('published_at', data ? data.published_at : '');

    form.setValue('categories', data ? [] : []);
    form.setValue('tags', data ? [] : []);
  };

  const isActiveAction =
    form.watch('title')?.length > 0 && form.watch('description')?.length > 0;

  return { form, handleReset, isActiveAction };
};
