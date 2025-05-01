'use client';
import React, { useState, useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ImageDropify from '@/components/common/ImageDropify';

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
import { BRANDS } from '@/server/services/brand';
import { toast } from 'sonner';

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name Field is required',
  }),
  image: z.string().optional(),
});

interface IStoreBrandProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  data?: {
    id: number;
    name: string;
    image: string;
  };
}

const StoreBrand = ({
  title = 'Add New Brand',
  description = '',
  children,
  data,
}: IStoreBrandProps) => {
  const [isLoading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),

    defaultValues: {
      name: data ? data.name : undefined,
      image: data?.image ? data.image : undefined,
    },
  });

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    const payload = {
      ...formData,
      product_count: 0,
    };
    startTransition(async () => {
      if (data) {
        const res = await api.put(
          `${BRANDS.PUT.BRAND_UPDATE}/${data.id}`,
          payload,
          BRANDS.GET.BRANDS.TAGS,
        );

        if (res.success) {
          form.reset();
          toast.success(res.message);
          setIsOpen(false);
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await api.post(
          BRANDS.POST.BRAND_CREATE,
          payload,
          BRANDS.GET.BRANDS.TAGS,
        );

        if (res.success) {
          form.reset();
          toast.success(res.message);
          setIsOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    });
  }

  const handleReset = () => {
    form.setValue('name', data ? data.name : '');
    form.setValue('image', data ? data.image : '');
  };

  const isActiveAction = form.watch('name')?.length > 0;

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button>
            <Plus className="w-4 h-4" />
            Add Brand
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[620px] rounded-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <ImageDropify
                image={form.watch('image') ?? ''}
                setImage={(img) => {
                  form.setValue('image', img);
                }}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        placeholder="Enter brand name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
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
                  {data ? 'Save Update' : 'Add New'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoreBrand;
