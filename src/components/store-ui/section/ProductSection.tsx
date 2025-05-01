'use state';
import SelectorWithSearch from '@/components/common/forms/SelectorWithSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Product, useStoreUISectionState } from '@/stores/useStoreUiSection';
import {
  ChevronDown,
  GalleryThumbnails,
  Grid2x2Check,
  GripVertical,
  Trash2,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { ICategory } from '@/types/category-interfaces';
import { MultiSelect } from '@/components/ui/multi-select';
import { Brand } from '@/types/brands-interface';
import { Tag } from '@/types/product-interface';
import { slugify } from '@/utils/string';
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

import { motion } from 'framer-motion';

type SectionProps = {
  section: Product;
  index: number;
  categories?: ICategory[];
  brands?: Brand[];
  tags?: Tag[];
};

const ProductSection = ({
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
          <span>Product</span>
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
        <div className="border-t border-gray-200 pt-space16 mt-space16">
          <div>
            <p className="pb-space6">Title</p>

            <Input
              value={section.title}
              placeholder="Enter description"
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
          <div className="grid sm:grid-cols-2 gap-space16 py-space16 px-space4">
            <div>
              <Label>Button Text</Label>
              <Input
                value={section.btn_text}
                placeholder="Enter product video link here..."
                onChange={(evt) =>
                  updateSection(index, {
                    ...section,
                    btn_text: evt.target.value,
                  })
                }
              />
            </div>
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
                  type="number"
                  value={section.number_of_product}
                  onChange={(evt) => {
                    updateSection(index, {
                      ...section,
                      number_of_product: evt.target.value,
                    });
                  }}
                />
              </div>
              <div className="w-1/3">
                <Label>View Type</Label>
                <RadioGroup
                  value={section.view_type}
                  onValueChange={(val) => {
                    updateSection(index, {
                      ...section,
                      view_type: val === 'grid' ? 'grid' : 'carousel',
                    });
                  }}
                  className="flex py-space6 gap-space12"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grid" id={'grid' + index} />
                    <Label
                      htmlFor={'grid' + index}
                      className="flex items-center gap-space4 pr-space8"
                    >
                      Grid
                      <Grid2x2Check size={16} className="text-gray-600" />
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="carousel" id={'carousel' + index} />
                    <Label
                      htmlFor={'carousel' + index}
                      className="flex items-center gap-space4 pr-space8"
                    >
                      Carousel
                      <span className="flex items-center text-gray-600">
                        <GalleryThumbnails size={16} />
                        <GalleryThumbnails size={16} />
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductSection;
