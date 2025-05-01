'use client';
import React, { useEffect, useState, useTransition } from 'react';
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
import { CircleX, Plus } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { api } from '@/server/api';
import { toast } from 'sonner';
import { IProductAttributeCreateData } from '@/types/attributes-interface';

import { Label } from '@/components/ui/label';
import {
  ProductAttributeSchemaDef,
  useProductAttributeForm,
} from '@/schemas/inventory/product-attribute-schema';
import { useFieldArray } from 'react-hook-form';
import { ATTRIBUTES } from '@/server/services/attributes';

interface ICreateAttributeProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  data?: IProductAttributeCreateData;
}

const ProductAttributeForm = ({
  title = 'Add New Attribute',
  description = '',
  children,
  data,
}: ICreateAttributeProps) => {
  const [isLoading, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const { register, control, handleSubmit, errors, reset } =
    useProductAttributeForm(data);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'values' as never,
  });

  // Form Submit Handler
  const onSubmit = (formData: ProductAttributeSchemaDef) => {
    startTransition(async () => {
      if (data?.id) {
        const res = await api.put(
          `${ATTRIBUTES.PUT.ATTRIBUTES_UPDATE}/${data?.id}`,
          formData,
          ATTRIBUTES.GET.ATTRIBUTES.TAGS,
        );
        if (res.success) {
          toast.success(res.message || 'Attribute created successfully!');
          reset();
          setShowModal(false);
        } else {
          toast.error(res.message || 'Failed to create attribute.');
        }
      } else {
        const res = await api.post(
          ATTRIBUTES.POST.ATTRIBUTES_CREATE,
          formData,
          ATTRIBUTES.GET.ATTRIBUTES.TAGS,
        );

        if (res.success) {
          toast.success(res.message || 'Attribute created successfully!');
          reset();
          setShowModal(false);
        } else {
          toast.error(res.message || 'Failed to create attribute.');
        }
      }
    });
  };

  useEffect(() => {
    if (fields.length == 0) {
      append('');
    }
  }, [append, fields]);

  return (
    <Dialog
      open={showModal}
      onOpenChange={(status) => {
        reset();
        setShowModal(status);
      }}
    >
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="w-4 h-4" />
            Add Product Attribute
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Attribute Name Field */}
          <div>
            <Label>Attribute Name</Label>
            <Input
              {...register('name')}
              type="text"
              className="w-full"
              placeholder="e.g. Size, Color"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Dynamic Variant Fields */}
          <div>
            <Label>Variants</Label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex space-x-2 mb-2">
                <Input
                  {...register(`values.${index}` as const)}
                  type="text"
                  className="w-full"
                  placeholder={`Variant ${index + 1}`}
                  autoFocus
                />
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  variant={'danger-outline'}
                >
                  <CircleX />
                </Button>
              </div>
            ))}

            {/* Button to Add More Variants */}
            <Button type="button" onClick={() => append('')} variant={'white'}>
              <Plus className="w-4 h-4" />
              Add Variant
            </Button>

            {errors.values && (
              <p className="text-red-500 text-sm">{errors.values.message}</p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="pagination"
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
              {data ? 'Update' : 'Submit'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductAttributeForm;
