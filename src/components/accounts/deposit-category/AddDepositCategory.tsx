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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { api } from '@/server/api';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ImageDropify from '@/components/common/ImageDropify';
import { DEPOSIT_CATEGORY } from '@/server/services/deposit-category';
import {
  DepositCategoryForm,
  DepositCategorySchemaDef,
} from '@/schemas/accounts/deposit-catgory';

export interface IDepositCategoryProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  data?: {
    id?: string;
    name: string;
    icon: string;
    description: string;
  };
}
const AddDepositCategory = ({
  title,
  description = '',
  children,
  data,
}: IDepositCategoryProps) => {
  const [isLoading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { form, handleReset, isActiveAction } = DepositCategoryForm(data);

  function onSubmit(formData: DepositCategorySchemaDef) {
    startTransition(async () => {
      if (data) {
        const res = await api.put(
          `${DEPOSIT_CATEGORY.PUT.CATEGORY_UPDATE}/${data.id}`,
          formData,
          DEPOSIT_CATEGORY.GET.TAGS,
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
          DEPOSIT_CATEGORY.POST,
          formData,
          DEPOSIT_CATEGORY.GET.TAGS,
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

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button>
            <Plus className="w-4 h-4" />
            Add Deposit Category
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
                image={form.watch('icon') ?? ''}
                setImage={(img) => {
                  form.setValue('icon', img);
                }}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deposit Category Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        placeholder="Write deposit category name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        placeholder="Write description"
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

export default AddDepositCategory;
