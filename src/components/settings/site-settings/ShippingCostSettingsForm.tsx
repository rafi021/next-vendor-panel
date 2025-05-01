'use client';

import { z } from 'zod';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { SiteSettingsFormValues } from '@/schemas/settings/settings-schema';

type Props = {
  form: UseFormReturn<SiteSettingsFormValues>;
  data?: Record<string, number>;
};

export default function ShippingCostSettingsForm({ form, data }: Props) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'shipping_costs',
  });

  return (
    <div className="overflow-auto max-h-[400px] px-6 py-4 bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 gap-6 min-w-full">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-end gap-4 flex-wrap sm:flex-nowrap"
          >
            <div className="flex-1 min-w-[150px]">
              <Label htmlFor={`entries.${index}.key`}>Area</Label>
              <Input
                id={`entries.${index}.key`}
                placeholder="e.g. Inside Dhaka"
                {...form.register(`shipping_costs.${index}.key`)}
              />
            </div>
            <div className="w-40">
              <Label htmlFor={`entries.${index}.value`}>Cost</Label>
              <Input
                id={`entries.${index}.value`}
                type="number"
                placeholder="e.g. 80"
                {...form.register(`shipping_costs.${index}.value`, {
                  valueAsNumber: true,
                })}
              />
            </div>
            <Button
              type="button"
              variant="danger-outline"
              size="icon"
              onClick={() => remove(index)}
              className="mt-6"
            >
              <Trash size={16} />
            </Button>
          </div>
        ))}
        <div>
          <Button
            type="button"
            onClick={() => append({ key: '', value: 0 })}
            className="mt-4"
          >
            + Add Area
          </Button>
        </div>
      </div>
    </div>
  );
}
