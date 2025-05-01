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
import { toast } from 'sonner';
import { SMS_CATEGORIES, SMS_TEMPLATES } from '@/server/services/sms';
import { SmsTemplate } from '@/types/sms';

const FormSchema = z.object({
  name: z
    .string({ required_error: 'Category name is required' })
    .min(3, { message: 'Title must be at least 3 characters' }),
});

interface SmsCategoryFormProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  data?: SmsTemplate;
}

const SmsCategoryForm = ({
  title = 'Create SMS Category',
  description = '',
  children,
  data,
}: SmsCategoryFormProps) => {
  const [isLoading, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data?.name ? data.name : '',
    },
  });

  const onSubmit = (formData: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      if (data?.id) {
        const res = await api.put(
          `${SMS_CATEGORIES.PUT.SMS_CATEGORIES_UPDATE}/${data.id}`,
          formData,
          [
            ...SMS_CATEGORIES.GET.SMS_CATEGORIES.TAGS,
            ...SMS_TEMPLATES.GET.SMS_TEMPLATES.TAGS,
          ],
        );

        if (res.success) {
          toast.success(
            res.message || 'SMS Template Category created successfully!',
          );
          form.reset();
          setShowModal(false);
        } else {
          toast.error(res.message || 'Failed to create SMS Template Category');
        }
      } else {
        const res = await api.post(
          SMS_CATEGORIES.POST.SMS_CATEGORIES_CREATE,
          formData,
          [
            ...SMS_CATEGORIES.GET.SMS_CATEGORIES.TAGS,
            ...SMS_TEMPLATES.GET.SMS_TEMPLATES.TAGS,
          ],
        );

        if (res.success) {
          toast.success(
            res.message || 'SMS Template Category created successfully!',
          );
          form.reset();
          setShowModal(false);
        } else {
          toast.error(res.message || 'Failed to create SMS Template Category');
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
            Create Template Category
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
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="white"
                  disabled={isLoading}
                  className="w-full"
                  onClick={() => form.reset()}
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
                {data ? 'Update Category' : 'Create Category'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SmsCategoryForm;
