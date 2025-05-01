'use client';
import React, { useState, useTransition } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { TAGS } from '@/server/services/tags';
import { toast } from 'sonner';
import { ITag } from '@/types/tag-interface';
import { Badge } from '@/components/ui/badge';

const FormSchema = z.object({
  name: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  text_color: z.string().min(1, { message: 'Text color is required' }),
  bg_color: z.string().min(1, { message: 'Background color is required' }),
  is_active: z.number(),
});

type PickTag = Pick<
  ITag,
  'id' | 'name' | 'bg_color' | 'text_color' | 'is_active'
>;

interface ICreateTagProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  data?: PickTag;
}

const CreateProductTag = ({
  title = 'Add New Tag',
  description = '',
  children,
  data,
}: ICreateTagProps) => {
  const [isLoading, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data?.name ? data.name : '',
      text_color: data?.text_color ? data.text_color : '#E4E0E1',
      bg_color: data?.bg_color ? data.bg_color : '#604652',
      is_active: data?.is_active ? data.is_active : 1,
    },
  });

  const onSubmit = (formData: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      if (data?.id) {
        const res = await api.put(
          `${TAGS.PUT.TAGS_UPDATE}/${data.id}`,
          formData,
          TAGS.GET.TAGS.TAGS,
        );
        // // console.log(res);

        if (res.success) {
          toast.success(res.message || 'Tag created successfully!');
          // form.reset();
          // // console.log(form)
          setShowModal(false);
        } else {
          toast.error(res.message || 'Failed to create tag.');
        }
      } else {
        const res = await api.post(
          TAGS.POST.TAGS_CREATE,
          formData,
          TAGS.GET.TAGS.TAGS,
        );
        // // console.log(res);

        if (res.success) {
          toast.success(res.message || 'Tag created successfully!');
          form.reset();
          setShowModal(false);
        } else {
          toast.error(res.message || 'Failed to create tag.');
        }
      }
    });
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="w-4 h-4" />
            Add Tag
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter tag name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="text_color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text Color</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bg_color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Color</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="border-t pt-space8 space-y-space6">
              <p className="text-black text-sm font-semibold">Preview</p>
              <Badge
                className="!border shadow-sm "
                style={{
                  backgroundColor: form.watch('bg_color'),
                  color: form.watch('text_color'),
                }}
              >
                {form.watch('name') === '' ? 'Test' : form.watch('name')}
              </Badge>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="white"
                  disabled={isLoading}
                  className="w-full"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                loader={isLoading}
              >
                {data ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductTag;
