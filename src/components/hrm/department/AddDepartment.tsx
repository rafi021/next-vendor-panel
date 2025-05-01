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
import { DEPARTMENT } from '@/server/services/department';
import { DepartmentForm, DepartmentSchemaDef } from '@/schemas/hrm/department';

export interface IDepartmentProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  data?: {
    id?: string;
    name?: string;
    icon?: string;
    description?: string;
  };
}
const AddDepartment = ({
  title,
  description = '',
  children,
  data,
}: IDepartmentProps) => {
  const [isLoading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { form, handleReset, isActiveAction } = DepartmentForm(data);

  function onSubmit(formData: DepartmentSchemaDef) {
    startTransition(async () => {
      if (data) {
        const res = await api.put(
          `${DEPARTMENT.PUT.DEPARTMENT_UPDATE}/${data.id}`,
          formData,
          DEPARTMENT.GET.TAGS,
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
          DEPARTMENT.POST,
          formData,
          DEPARTMENT.GET.TAGS,
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
            Add Department
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
                    <FormLabel>Department Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        placeholder="Enter department name"
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
                        placeholder="Write descriptions"
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

export default AddDepartment;
