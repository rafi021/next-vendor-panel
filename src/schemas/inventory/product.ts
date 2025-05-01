import { useProductStore } from '@/stores/useProductStore';
import { IProduct } from '@/types/product-interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ulid } from 'ulid';

const ProductSchema = z.object({
  brand_id: z.string().min(1, {
    message: 'Brand Field is required',
  }),
  name: z
    .string({
      required_error: 'This field is required',
    })
    .min(1, {
      message: 'This Field is required',
    }),
  slug: z.string().optional(),
  product_type: z.enum(['variable', 'simple'], {
    required_error: 'You need to select a product type.',
  }),
  manage_stock: z.string().default('0').optional(),

  short_description: z.string().optional(),
  long_description: z.string().optional(),
  specification: z.string().optional(),
  video_url: z.string().optional(),
  gallery: z.string().array().min(1, 'At least one image is required'),
  is_active: z.boolean().default(false),
  categories: z.string().array().min(1, 'At least one category is required'),
  tags: z.string().array().min(1, 'At least one tag is required'),
  date: z.string().optional(),

  // Use this for simple product ---------------------------
  purchase_price: z.string().optional(),
  regular_price: z.string().optional(),
  sell_price: z.string().optional(),
  discounted_price: z.string().default('0').optional(),
  sku: z.string().default(ulid()).optional(),
  stock_quantity: z.string().optional(),
  discount_type: z.enum(['percent', 'fixed']).default('fixed'),
  stock_status: z.enum(['outofstock', 'instock']).default('instock').optional(),
  weight: z.string().optional(),
  unit: z.string().optional(),

  // Additional Fields -------------------
  return_policy: z.string().optional(),
  estimated_delivery: z.string().optional(),
  delivery_details: z.string().optional(),
  page_title: z
    .string({
      required_error: 'This field is required',
    })
    .min(1, {
      message: 'This Field is required',
    }),
  url_handle: z
    .string({
      required_error: 'This field is required',
    })
    .min(1, {
      message: 'This Field is required',
    }),
  meta_keywords: z
    .string({
      required_error: 'This field is required',
    })
    .min(1, {
      message: 'This Field is required',
    }),
  meta_description: z
    .string({
      required_error: 'This field is required',
    })
    .min(1, {
      message: 'This Field is required',
    }),
});

export type ProductSchemaDef = z.infer<typeof ProductSchema>;

export const useProductForm = (data?: IProduct) => {
  const form = useForm<ProductSchemaDef>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: data ? data.name : '',
      slug: data ? data.slug : '',
      manage_stock: data ? String(data.manage_stock) : '0',
      gallery: data ? [...data.gallery] : [],
      brand_id: data ? String(data.brand_id) : '',
      short_description: data?.short_description ? data.short_description : '',
      long_description: data?.long_description ? data.long_description : '',
      specification: data?.specification ? data.specification : '',
      video_url: data?.video_url ? data.video_url : '',
      is_active: data ? (data.is_active == 1 ? true : false) : false,
      categories: data ? data.categories.map((cat) => String(cat.id)) : [],
      tags: data ? data.tags.map((tag) => String(tag.id)) : [],

      page_title: data ? data.meta_data.page_title : '',
      url_handle: data ? data.meta_data.url_handle : '',
      meta_keywords: data ? data.meta_data.meta_keywords : '',
      meta_description: data ? data.meta_data.meta_description : '',
      delivery_details: data ? data.meta_data.delivery_details : '',
      estimated_delivery: data ? data.meta_data.estimated_delivery : '',
      return_policy: data ? data.meta_data.return_policy : '',

      product_type: data ? data.product_type : 'simple',

      ...(data?.product_type === 'simple' && {
        purchase_price: data ? String(data.purchase_price) : '',
        regular_price: data ? String(data.regular_price) : '',
        sell_price: data ? String(data.sell_price) : '',
        discounted_price: data ? String(data.discounted_price ?? '0') : '0',
        discount_type: data ? (data.discount_type ?? 'fixed') : 'fixed',
        stock_status: data ? data.stock_status : 'instock',
        stock_quantity: data ? String(data.stock_quantity) : '',
        sku: data ? (data.sku ?? ulid()) : ulid(),
        weight: data ? String(data.dimensions.weight) : '',
        unit: data ? String(data.dimensions.unit) : 'KG',
      }),
    },
  });

  const handleReset = () => {
    // form.setValue('title', data ? data.title : '');
    // form.setValue('description', data ? data.description : '');
    // form.setValue('image_url', data ? data.image_url : '/');
    // form.setValue('published_at', data ? data.published_at : '');
    // form.setValue('categories', data ? [] : []);
    // form.setValue('tags', data ? [] : []);
  };

  const tableFields = useProductStore((state) => state.variationTableData);

  const isActiveAction = (): boolean => {
    const isCommon =
      form.watch('name')?.length > 0 &&
      form.watch('categories')?.length > 0 &&
      form.watch('tags')?.length > 0 &&
      form.watch('brand_id')?.length > 0 &&
      form.watch('gallery')?.length > 0;
    // &&
    // form.watch('page_title')?.length > 0 &&
    // form.watch('url_handle')?.length > 0 &&
    // form.watch('meta_keywords')?.length > 0 &&
    // form.watch('meta_description')?.length > 0;

    const isVariable = tableFields.every(
      (field) =>
        field.purchase_price.length > 0 &&
        field.sell_price.length > 0 &&
        field.regular_price.length > 0 &&
        field.stock_quantity.length > 0 &&
        field.weight.length > 0,
    );

    const isSimple =
      (form.watch('purchase_price')?.length ?? 0) > 0 &&
      (form.watch('regular_price')?.length ?? 0) > 0 &&
      (form.watch('sell_price')?.length ?? 0) > 0 &&
      (form.watch('stock_quantity')?.length ?? 0) > 0 &&
      // (form.watch('sku')?.length ?? 0) > 0 &&
      (form.watch('weight')?.length ?? 0) > 0;
    // (form.watch('discounted_price')?.length ?? 0) > 0 &&
    //   (form.watch('discount_type')?.length ?? 0) > 0 &&
    (form.watch('stock_status')?.length ?? 0) > 0;

    if (form.watch('product_type') === 'simple') {
      return isCommon && isSimple;
    } else {
      return isCommon && isVariable;
    }
  };

  return { form, handleReset, isActiveAction };
};
