'use client';
import { toast } from 'sonner';
import { api } from '@/server/api';
import dynamic from 'next/dynamic';
import React, { useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ImageDropify from '@/components/common/ImageDropify';
import { BlogForm, BlogSchemaDef } from '@/schemas/settings/blog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Layers } from 'lucide-react';
import { BLOG } from '@/server/services/blog';
import { useRouter } from 'next-nprogress-bar';
import { ITagsData } from '@/types/tag-interface';
import { Blog } from '@/types/store-settings-interface';
import BackButton from '@/components/common/back-button';
import { ICategories } from '@/types/category-interfaces';
import { MultiSelect } from '@/components/ui/multi-select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import DatePicker from '@/components/common/forms/DatePicker';
import MultiSelectCategory from '@/components/inventory/category/MultiSelectCategory';
const TextEditor = dynamic(
  () => import('@/components/common/forms/TextEditor'),
  {
    ssr: false,
  },
);

export interface IStoreBlogProps {
  tags: ITagsData;
  categories: ICategories;
  data?: Blog;
}

const StoreBlogForm = ({ data, tags, categories }: IStoreBlogProps) => {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const { form, handleReset, isActiveAction } = BlogForm(data);

  function onSubmit(formData: BlogSchemaDef) {
    const payload = {
      ...formData,
    };
    startTransition(async () => {
      if (data) {
        const res = await api.put(
          `${BLOG.PUT.BLOG_UPDATE}/${data.id}`,
          payload,
          BLOG.GET.BLOGS.TAGS,
        );

        if (res.success) {
          // form.reset();
          toast.success(res.message);
          router.back();
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await api.post(
          BLOG.POST.BLOG_CREATE,
          payload,
          BLOG.GET.BLOGS.TAGS,
        );

        if (res.success) {
          form.reset();
          toast.success(res.message);
          router.back();
        } else {
          toast.error(res.message);
        }
      }
    });
  }

  const tagOptions = tags.data.map((tag) => ({
    label: tag.name,
    value: String(tag.id),
  }));

  return (
    <div className="bg-gray-50">
      <Card>
        <CardHeader className="p-space16 lg:p-space24 border-b border-gray-300">
          <div className="flex items-center justify-between gap-space16">
            <div className="flex  items-start gap-space16">
              <div className="p-2 border-[1px] rounded-lg bg-primary/10">
                <Layers className="w-6 h-6 text-gray-500" />
              </div>
              <div className="">
                <h1 className="text-2xl font-semibold">
                  {data ? 'Update' : 'Add'} Blog
                </h1>
                <p className=" text-gray-500">
                  {data ? 'Update' : 'Create'}
                  your blog in less than 5 minutes.
                </p>
              </div>
            </div>
            <BackButton />
          </div>
        </CardHeader>
        <CardContent className="lg:p-space24">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <ImageDropify
                image={form.watch('image_url') ?? ''}
                setImage={(img) => {
                  form.setValue('image_url', img);
                }}
              />

              <div className="grid sm:grid-cols-2 gap-space16">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="Enter title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="published_at"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block py-space4">
                        Published Date
                      </FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value ?? ''}
                          onChange={(value) => field.onChange(value)}
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
                      <FormLabel>Categories</FormLabel>
                      <MultiSelectCategory
                        value={field.value ?? []}
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
                      <FormLabel>Tags</FormLabel>
                      <MultiSelect
                        maxCount={1}
                        animation={2}
                        variant="secondary"
                        options={tagOptions}
                        placeholder="Select tags"
                        selectedValues={field.value ?? []}
                        onValueChange={(val) => field.onChange(val)}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <TextEditor
                        defaultValue={field.value || ''}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-space16 max-w-[400px]">
                <Button
                  type="button"
                  variant="white"
                  className="w-full"
                  onClick={handleReset}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full"
                  loader={isLoading}
                  disabled={!isActiveAction || isLoading}
                >
                  {data ? 'Save Update' : 'Add New Blog'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreBlogForm;
