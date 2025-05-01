'use client';

import { toast } from 'sonner';
import { api } from '@/server/api';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import SelectCategory from './SelectCategory';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { CATEGORIES } from '@/server/services/category';
import ImageDropify from '@/components/common/ImageDropify';
import { ICategories, ICategory } from '@/types/category-interfaces';
import { CategoryFormValues, categorySchema } from '@/schemas/category';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Layers } from 'lucide-react';

const CategoryForm = ({
  categories,
  categoryDetails,
}: {
  categories: ICategories;
  categoryDetails?: ICategory;
}) => {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: categoryDetails ? categoryDetails.name : '',
      image: categoryDetails ? (categoryDetails.image ?? '') : '',
      parent_id: String(categoryDetails?.parent_id ?? '') ?? null,
      meta_keywords: categoryDetails?.meta_keywords
        ? categoryDetails.meta_keywords
        : '',
      meta_description: categoryDetails?.meta_description
        ? categoryDetails.meta_description
        : '',
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    startTransition(async () => {
      if (categoryDetails) {
        const res = await api.put(
          `${CATEGORIES.PUT.CATEGORY_UPDATE}/${categoryDetails.id}`,
          data,
          CATEGORIES.GET.CATEGORIES.TAGS,
        );
        if (res.success) {
          toast.success(res.message);
          form.reset();
          router.push('/category');
        } else {
          toast.error(res.message || 'Category was not updated!');
        }
      } else {
        const res = await api.post(
          CATEGORIES.POST.CATEGORY_CREATE,
          data,
          CATEGORIES.GET.CATEGORIES.TAGS,
        );
        if (res.success) {
          toast.success('Category was created successfully');
          form.reset();
          router.push('/category');
        } else {
          toast.error(res.message || 'Category was not created!');
        }
      }
    });
  };

  const isActiveAction = form.watch('name')?.length > 0;

  const handleReset = () => {
    form.setValue('name', categoryDetails ? categoryDetails.name : '');
    form.setValue('image', categoryDetails ? categoryDetails.image : '');
    form.setValue(
      'meta_keywords',
      categoryDetails ? categoryDetails.meta_keywords : '',
    );
    form.setValue(
      'meta_description',
      categoryDetails ? categoryDetails.meta_description : '',
    );
  };

  return (
    <div className="bg-gray-50">
      <Card>
        <CardHeader className="p-space24 border-b border-gray-300">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="p-2 border-[1px] rounded-lg bg-primary/10">
              <Layers className="w-6 h-6 text-gray-500" />
            </div>
            <div className="">
              <h1 className="text-2xl font-semibold">
                {categoryDetails ? categoryDetails.name : 'Add New Category'}
              </h1>
              <p className=" text-gray-500">
                {categoryDetails ? 'Edit Category' : 'Add Category'}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="!p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-space16 p-6">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category image</FormLabel>
                      <FormControl>
                        <ImageDropify
                          image={field.value ?? ''}
                          setImage={(img) => {
                            field.onChange(img);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Linear" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="parent_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Category</FormLabel>
                        <FormControl>
                          <SelectCategory
                            categories={categories}
                            placeholder="Select parent category if needed"
                            value={field.value ?? ''}
                            onChange={(value) => {
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="meta_keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Keywords</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Textarea
                              placeholder="Write a few keywords about the category for SEO..."
                              maxLength={200}
                              {...field}
                              onChange={(e) => {
                                if (e.target.value.length <= 200) {
                                  field.onChange(e);
                                }
                              }}
                            />
                            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                              {field.value?.length || 0}/200
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="meta_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Textarea
                              placeholder="Write a few sentences about the category for SEO..."
                              maxLength={200}
                              {...field}
                              onChange={(e) => {
                                if (e.target.value.length <= 200) {
                                  field.onChange(e);
                                }
                              }}
                            />
                            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                              {field.value?.length || 0}/200
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="border-t border-gray-300 p-space24">
                <div className="flex gap-space12 sm:w-1/2">
                  <Button variant="white" type="button" onClick={handleReset}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loader={isLoading}
                    disabled={!isActiveAction || isLoading}
                  >
                    {categoryDetails ? 'Update category' : 'Add to category'}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryForm;
