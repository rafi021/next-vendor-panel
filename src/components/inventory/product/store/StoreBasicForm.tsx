import React, { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { Switch } from '@/components/ui/switch';
import { Image } from '@/components/common/Image';
import { ITagsData } from '@/types/tag-interface';
import { BrandData } from '@/types/brands-interface';
import { ICategories } from '@/types/category-interfaces';
import ImageDropify from '@/components/common/ImageDropify';
import { MultiSelect } from '@/components/ui/multi-select';
import { ProductSchemaDef } from '@/schemas/inventory/product';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CircleX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { slugify } from '@/utils/string';
import MultiSelectCategory from '../../category/MultiSelectCategory';
const TextEditor = dynamic(
  () => import('@/components/common/forms/TextEditor'),
  {
    ssr: false,
  },
);

interface IProps {
  tags: ITagsData;
  brands: BrandData;
  categories: ICategories;
  form: UseFormReturn<ProductSchemaDef>;
}

const StoreBasicForm = ({ brands, categories, form, tags }: IProps) => {
  const images = form.watch('gallery');

  const handleRemoveImage = (index: number) => {
    let filteredImage = images.filter((_, idx) => idx !== index);

    form.setValue('gallery', filteredImage);
  };

  const slugUrl = useMemo(
    () => slugify(form.watch('name') || ''),
    [form.watch('name')],
  );

  useEffect(() => {
    form.setValue('slug', slugUrl, { shouldValidate: true });
  }, [slugUrl, form]);

  return (
    <div className="space-y-space16 border border-gray-200 rounded-md p-space16">
      <div className="">
        <FormLabel>
          Product image <span className="text-error-500">*</span>
        </FormLabel>

        <ImageDropify
          image={''}
          setImage={(img) => {
            form.setValue('gallery', images ? [...images, img] : [img]);
          }}
        />
        {images && (
          <div className="flex gap-space12 flex-wrap py-space12">
            {images.map((img, index) => (
              <div className="relative" key={img}>
                <Image
                  alt=""
                  src={img}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-full object-contain"
                  wrapperClasses="max-h-[74px] h-[74px] w-[74px] border border-gray-200 rounded-lg overflow-hidden"
                />

                <Button
                  size={'icon'}
                  type="button"
                  variant={'transparent'}
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-space6 -right-space6 rounded-full h-auto w-auto bg-white"
                >
                  <CircleX />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <FormField
        control={form.control}
        name="video_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product video</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ''}
                placeholder="Enter product video link here..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid sm:grid-cols-2 gap-space16">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Product name <span className="text-error-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder="e.g. Shirt"
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block py-space4">Slug</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder="e.g. Slug-name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-space16">
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Categories <span className="text-error-500">*</span>
              </FormLabel>
              <MultiSelectCategory
                value={field.value}
                categories={categories.data ?? []}
                onChange={(val) => field.onChange(val)}
                containerClass="sm:w-[calc(40vw)] lg:w-[calc(36vw)] xl:w-[calc(40vw)]"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tags <span className="text-error-500">*</span>
              </FormLabel>
              <MultiSelect
                maxCount={1}
                animation={2}
                variant="secondary"
                options={tags?.data?.map((tag) => ({
                  label: tag.name,
                  value: String(tag.id),
                }))}
                placeholder="Select tags"
                selectedValues={field.value}
                onValueChange={(val) => field.onChange(val)}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="brand_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Brand <span className="text-error-500">*</span>
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {brands.data?.map((brand) => (
                  <SelectItem key={brand.id} value={String(brand.id)}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="short_description"
        render={({ field }) => (
          <FormItem className="text-editor">
            <FormLabel>Short Description</FormLabel>
            <FormControl>
              <TextEditor
                height="100px"
                defaultValue={field.value || ''}
                onChange={(value) => field.onChange(value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="long_description"
        render={({ field }) => (
          <FormItem className="text-editor">
            <FormLabel>Descriptions</FormLabel>
            <FormControl>
              <TextEditor
                height="100px"
                defaultValue={field.value || ''}
                onChange={(value) => field.onChange(value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="specification"
        render={({ field }) => (
          <FormItem className="text-editor">
            <FormLabel>Specification</FormLabel>
            <FormControl>
              <TextEditor
                height="100px"
                defaultValue={field.value || ''}
                onChange={(value) => field.onChange(value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex gap-[40px]">
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">Product Status</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="manage_stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">Manage Stock</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value === '1' ? true : false}
                  onCheckedChange={(val) => field.onChange(val ? '1' : '0')}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default StoreBasicForm;
