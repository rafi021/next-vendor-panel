'use client';
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';

import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { api } from '@/server/api';
import { toast } from 'sonner';

import {
  FooterMenuSlugList,
  IPageBuilder,
} from '@/types/page-builder-interface';
import {
  PageBuilderSchema,
  usePageBuilderForm,
} from '@/schemas/order/page-builder-schema';
import ImageDropify from '@/components/common/ImageDropify';
import { useRouter } from 'next/navigation';
import { PAGE_BUILDER } from '@/server/services/page-builder';
import TextEditor from '@/components/common/forms/TextEditor';
import SelectorWithSearch from '@/components/common/forms/SelectorWithSearch';

interface IPageBuilderFormProps {
  footerMenuSlugList: FooterMenuSlugList[] | [];
  data?: IPageBuilder;
}

const PageBuilderForm = ({
  data,
  footerMenuSlugList,
}: IPageBuilderFormProps) => {
  const [isLoading, startTransition] = useTransition();
  const form = usePageBuilderForm(data);
  const router = useRouter();

  const onSubmit = async (formData: z.infer<typeof PageBuilderSchema>) => {
    const [id, _] = formData.slug?.split('_') ?? '';

    const payload = {
      title: formData.title,
      footer_menu_id: id,
      image: formData.image_url,
      description: formData.description,
    };

    startTransition(async () => {
      let res;
      if (data) {
        res = await api.put(
          `${PAGE_BUILDER.PUT.PAGE_BUILDER_UPDATE}/${data.id}`,
          payload,
          PAGE_BUILDER.GET.PAGE_BUILDER.TAGS,
        );
      } else {
        res = await api.post(
          PAGE_BUILDER.POST.PAGE_BUILDER_CREATE,
          payload,
          PAGE_BUILDER.GET.PAGE_BUILDER.TAGS,
        );
      }

      if (res.success) {
        toast.success(res?.message ?? 'Page saved successfully!');
        form.reset();
        router.push('/store-ui/page-builder');
      } else {
        toast.error(res.message ?? 'Failed to save page.');
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-space16 p-6">
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page image</FormLabel>
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
          <div className="grid md:grid-cols-2 gap-space16">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Linear" {...field} />
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
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <SelectorWithSearch
                      value={field.value}
                      onChange={(val) => {
                        form.setValue('slug', val);
                      }}
                      options={footerMenuSlugList.map((slug) => ({
                        label: slug.url,
                        value: String(slug.id + '_' + slug.url),
                      }))}
                      placeholder="Select a slug"
                    />
                  </FormControl>
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
                <FormLabel>Build Page</FormLabel>
                <FormControl>
                  <TextEditor
                    defaultValue={field.value ?? ''}
                    onChange={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="border-t border-gray-300 p-space24">
          <div className="flex gap-space12 sm:w-1/2">
            <Button
              variant="white"
              type="button"
              onClick={(e) => {
                router.push('/store-ui/page-builder');
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loader={isLoading}
              // disabled={!isActiveAction || isLoading}
            >
              {data ? 'Update page' : 'Add new page'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PageBuilderForm;
