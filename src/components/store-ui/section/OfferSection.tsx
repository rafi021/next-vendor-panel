'use state';
import SelectorWithSearch from '@/components/common/forms/SelectorWithSearch';
import TextEditor from '@/components/common/forms/TextEditor';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Offer, useStoreUISectionState } from '@/stores/useStoreUiSection';

import { ChevronDown, GripVertical, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';

import { ICategory } from '@/types/category-interfaces';
import { MultiSelect } from '@/components/ui/multi-select';
import { Brand } from '@/types/brands-interface';
import { Tag } from '@/types/product-interface';
import DatePicker from '@/components/common/forms/DatePicker';
import { slugify } from '@/utils/string';

import { motion } from 'framer-motion';

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
import MultiSelectCategory from '@/components/inventory/category/MultiSelectCategory';

type SectionProps = {
  section: Offer;
  index: number;
  categories?: ICategory[];
  brands?: Brand[];
  tags?: Tag[];
};

const OfferSection = ({
  index,
  section,
  categories,
  brands,
  tags,
}: SectionProps) => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const { removeSection, updateSection } = useStoreUISectionState();

  return (
    <div className="border bg-white border-gray-200 rounded-sm px-space12 py-space8">
      <div className="flex items-center justify-between py-space8">
        <div
          className="flex w-full items-center justify-start gap-space12 px-space4 hover:cursor-pointer hover:text-black"
          onClick={() => setShow((prev) => !prev)}
        >
          <span
            className={`hover:cursor-grab overflow-hidden duration-500 ${!show ? 'w-[16px]' : 'w-0'}`}
          >
            <GripVertical size={18} />
          </span>
          <span>Offer</span>
          <span className={`${show ? 'rotate-180' : ''} duration-300`}>
            <ChevronDown size={20} className="text-gray-500" />
          </span>
        </div>
        <span className="flex items-center gap-space6">
          <Switch
            checked={section.is_active === 1}
            onCheckedChange={(val) =>
              updateSection(index, { ...section, is_active: val ? 1 : 0 })
            }
          />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size={'sm'} variant={'transparent'}>
                <X className="text-gray-500 hover:text-red-500 hover:cursor-pointer" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <div className="h-[48px] w-[48px] rounded-full p-space6 bg-error-50 mb-space16">
                  <div className="h-full w-full rounded-full bg-error-100 flex justify-center items-center text-error-500">
                    <Trash2 />
                  </div>
                </div>

                <DialogTitle>Product</DialogTitle>
                <DialogDescription className="pb-space12">
                  {`Are you sure you want to delete this section? This action cannot be undone.`}
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="white" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    className="w-full"
                    variant={'danger'}
                    onClick={() => removeSection(index)}
                  >
                    Delete
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </span>
      </div>
      <motion.div
        layout
        initial={false}
        animate={{ height: show ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="border-t border-gray-200 py-space16 px-space4">
          <div className="space-y-space16">
            <div>
              <p className="pb-space6">Title</p>
              <Input
                value={section.title ?? ''}
                placeholder="Enter title"
                onChange={(evt) => {
                  const val = evt.target.value;
                  updateSection(index, {
                    ...section,
                    title: val,
                    slug: slugify(val),
                  });
                }}
              />
            </div>
            <div>
              <p className="pb-space6">Description</p>

              <Input
                value={section.description ?? ''}
                placeholder="Enter description"
                onChange={(evt) => {
                  const val = evt.target.value;
                  updateSection(index, {
                    ...section,
                    description: val,
                    slug: slugify(val),
                  });
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-space16 py-space16">
            <div>
              <Label>Category</Label>
              <MultiSelectCategory
                containerClass={
                  'sm:w-[calc(40vw)] lg:w-[calc(36vw)] xl:w-[calc(40vw)]'
                }
                categories={categories ?? []}
                value={section.category_ids}
                onChange={(val) =>
                  updateSection(index, { ...section, category_ids: val })
                }
              />
            </div>
            <div>
              <Label>Brand</Label>
              <SelectorWithSearch
                options={
                  brands?.map((brand) => ({
                    label: brand.name,
                    value: String(brand.id),
                  })) ?? []
                }
                onChange={(val) => {
                  updateSection(index, {
                    ...section,
                    brand_ids: val === '' ? [] : [val],
                  });
                }}
                value={section?.brand_ids?.at(0) ?? ''}
                Icon={ChevronDown}
                placeholder="Select Brand"
              />
            </div>
            <div>
              <Label>Tags</Label>
              <MultiSelect
                maxCount={3}
                animation={1}
                variant="secondary"
                options={
                  tags?.map((tag) => ({
                    label: tag.name,
                    value: String(tag.id),
                  })) ?? []
                }
                placeholder="Select Tags"
                selectedValues={section.tag_ids}
                onValueChange={(val) =>
                  updateSection(index, { ...section, tag_ids: val })
                }
              />
            </div>
            <div className="flex items-center justify-between w-full gap-space24">
              <div className="w-full">
                <Label>Number of Product</Label>
                <Input
                  value={section.number_of_product ?? '8'}
                  type="number"
                  onChange={(evt) => {
                    updateSection(index, {
                      ...section,
                      number_of_product: evt.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <Label>Offer Duration</Label>
          <Card>
            <RadioGroup
              className="flex gap-space12 py-space24 px-space12"
              value={section.offer_duration}
              onValueChange={(val) => {
                updateSection(index, {
                  ...section,
                  offer_duration: val === 'fixed' ? 'fixed' : 'loop',
                });
              }}
            >
              <Label
                htmlFor={'fixed' + index}
                className={`flex items-center space-x-2 border px-space16 py-space12 h-auto rounded-md hover:cursor-pointer ${section.offer_duration === 'fixed' ? 'border-blue-500 bg-blue-50 !text-blue-700' : 'bg-gray-100 border-gray-100'}`}
              >
                <RadioGroupItem value="fixed" id={'fixed' + index} />
                <span>Fixed Counter</span>
              </Label>

              <Label
                htmlFor={'loop' + index}
                className={`flex items-center space-x-2 border px-space16 py-space12 h-auto hover:cursor-pointer rounded-md ${section.offer_duration === 'loop' ? 'border-blue-500 bg-blue-50 !text-blue-700' : 'bg-gray-100 border-gray-100'}`}
              >
                <RadioGroupItem value="loop" id={'loop' + index} />
                <span>Loop Counter</span>
              </Label>
            </RadioGroup>

            <div className="px-space12 pb-space16">
              {section.offer_duration === 'fixed' && (
                <div className="flex gap-space12">
                  <div className="w-1/5">
                    <Label>From</Label>
                    <DatePicker
                      value={section.start_date ?? ''}
                      onChange={(val) => {
                        updateSection(index, {
                          ...section,
                          start_date: val,
                        });
                      }}
                      placeholder="Select offer date"
                    />
                  </div>
                  <div className="w-1/5">
                    <Label>To</Label>
                    <DatePicker
                      value={section.end_date ?? ''}
                      onChange={(val) => {
                        updateSection(index, {
                          ...section,
                          end_date: val,
                        });
                      }}
                      placeholder="Select offer date"
                    />
                  </div>
                </div>
              )}
              {section.offer_duration === 'loop' && (
                <div className="w-2/6 space-y-space6">
                  <Label>Set Counter</Label>
                  <div className="flex items-center">
                    <Input
                      placeholder="Enter offer time"
                      value={section.counter}
                      onChange={(evt) =>
                        updateSection(index, {
                          ...section,
                          counter: evt.target.value,
                        })
                      }
                    />
                    <RadioGroup
                      className="flex gap-space12 px-space12 w-1/12"
                      value={section.counter_type}
                      onValueChange={(val) => {
                        updateSection(index, {
                          ...section,
                          counter_type: val === 'days' ? 'days' : 'hour',
                        });
                      }}
                    >
                      <Label
                        htmlFor={'days' + index}
                        className={`flex items-center space-x-2 border px-space16 py-space12 h-auto rounded-md hover:cursor-pointer ${section.counter_type === 'days' ? 'border-blue-500 bg-blue-50 !text-blue-700' : 'bg-gray-100 border-gray-100'}`}
                      >
                        <RadioGroupItem value="days" id={'days' + index} />
                        <span>Days</span>
                      </Label>

                      <Label
                        htmlFor={'hour' + index}
                        className={`flex items-center space-x-2 border px-space16 py-space12 h-auto hover:cursor-pointer rounded-md ${section.counter_type === 'hour' ? 'border-blue-500 bg-blue-50 !text-blue-700' : 'bg-gray-100 border-gray-100'}`}
                      >
                        <RadioGroupItem value="hour" id={'hour' + index} />
                        <span>Hours</span>
                      </Label>
                    </RadioGroup>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default OfferSection;
