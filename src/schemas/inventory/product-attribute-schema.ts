import { IProductAttributeCreateData } from '@/types/attributes-interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Define Zod Schema
const ProductAttributeSchema = z.object({
  name: z.string().min(1, {
    message: 'Attribute name is required and must be at least 5 characters.',
  }),
  values: z
    .array(z.string().min(1, 'Each variant must be at least 1 character'))
    .min(1, {
      message: 'At least one variant is required.',
    }),
});

// TypeScript Type from Zod Schema
export type ProductAttributeSchemaDef = z.infer<typeof ProductAttributeSchema>;

export const useProductAttributeForm = (
  attributes?: IProductAttributeCreateData,
) => {
  // const form = useForm<ProductAttributeSchemaDef>({
  //   resolver: zodResolver(ProductAttributeSchema),
  //   defaultValues: {
  //     name: attributes?.name ? attributes.name : '',
  //     values: attributes?.attribute_options ? attributes?.attribute_options : []
  //   },
  // });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductAttributeSchemaDef>({
    resolver: zodResolver(ProductAttributeSchema),
    defaultValues: {
      name: attributes?.name ? attributes.name : '',
      values: attributes?.attribute_options
        ? attributes?.attribute_options.map((att) => att.value)
        : [''],
    } as ProductAttributeSchemaDef,
  });

  return { register, control, handleSubmit, errors, reset };
};
