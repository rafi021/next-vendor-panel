import { IPageBuilder } from '@/types/page-builder-interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const PageBuilderSchema = z.object({
  title: z.string().min(3, {
    message: 'Title is required and must be at least 3 characters.',
  }),
  slug: z.string().optional(),
  description: z
    .string()
    .min(1, { message: 'Site description is required to show on site' }),
  image_url: z.string().optional().nullable(),
});

export type PageBuilderSchemaDef = z.infer<typeof PageBuilderSchema>;

export const usePageBuilderForm = (data?: IPageBuilder) => {
  // console.log('page data from form 00', data);
  const form = useForm<PageBuilderSchemaDef>({
    resolver: zodResolver(PageBuilderSchema),
    defaultValues: {
      title: data ? data.title : '',
      slug: data ? data.slug : '',
      description: data ? data.description : '',
      image_url: data ? data.image_url : '',
    },
  });

  return form;
};
