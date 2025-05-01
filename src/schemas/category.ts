import * as z from 'zod';

export const categorySchema = z.object({
  image: z.string().optional(),
  parent_id: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 3 characters'),
  meta_keywords: z.string().optional(),
  meta_description: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
