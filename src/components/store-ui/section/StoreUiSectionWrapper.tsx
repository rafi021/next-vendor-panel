'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Box, Plus } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover';

import ProductSection from './ProductSection';
import BannerSection from './BannerSection';
import OfferSection from './OfferSection';
import { useStoreUISectionState } from '@/stores/useStoreUiSection';
import { ICategory } from '@/types/category-interfaces';
import { Brand } from '@/types/brands-interface';
import { Tag } from '@/types/product-interface';
import { api } from '@/server/api';
import { SECTION } from '@/server/services/store-ui';
import { toast } from 'sonner';
import { useEffect, useTransition } from 'react';
import { Section } from '@/types/store-ui';

import { Reorder } from 'framer-motion';
import { motion } from 'framer-motion';

type StoreUiSectionProps = {
  categories?: ICategory[];
  brands?: Brand[];
  tags?: Tag[];
  sectionsData?: Section[] | [];
};

const StoreUiSectionWrapper = ({
  categories,
  brands,
  tags,
  sectionsData = [],
}: StoreUiSectionProps) => {
  const { addSection, sectionList, storeSection } = useStoreUISectionState();
  const [isLoading, startTransition] = useTransition();

  const handleSubmit = async () => {
    startTransition(async () => {
      const payload = {
        section: sectionList.length > 0 ? sectionList : [''],
      };
      // // console.log('payload ', payload);

      const res = await api.post(SECTION.POST, payload, SECTION.GET.TAGS);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message ?? 'Something went wrong!');
      }
    });
  };

  useEffect(() => {
    if (sectionsData?.length > 0) {
      storeSection(sectionsData);
    }
  }, []);

  return (
    <div className="space-y-[0.5px]">
      <Card className="p-space16 flex justify-between items-center pb-space16 rounded-b-none">
        <div className="flex items-center gap-space12">
          <Button
            size={'icon'}
            type="button"
            variant={'white'}
            className="border"
          >
            <Box size="20" />
          </Button>
          <p className="text-md font-semibold">Section</p>
        </div>
      </Card>
      <Card className="p-space16 gap-space8 items-center pb-space16 rounded-none">
        <Reorder.Group
          axis="y"
          values={sectionList}
          onReorder={(newItems) => storeSection(newItems)}
          className="space-y-2"
        >
          {sectionList.map((section, index) => {
            const activeSection =
              section.section_type === 'product' ? (
                <ProductSection
                  index={index}
                  section={section}
                  categories={categories}
                  brands={brands}
                  tags={tags}
                />
              ) : section.section_type === 'banner' ? (
                <BannerSection index={index} section={section} />
              ) : section.section_type === 'offer' ? (
                <OfferSection
                  index={index}
                  section={section}
                  categories={categories}
                  brands={brands}
                  tags={tags}
                />
              ) : null;

            return (
              <Reorder.Item
                key={section.id}
                value={section}
                layout
                className="cursor-move shadow-sm"
              >
                <motion.div layout>
                  <div>{activeSection}</div>
                </motion.div>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
        {(sectionsData.length > 0 || sectionList.length > 0) && (
          <div className="flex gap-space12 pt-space16">
            <Button variant={'white'} className="md:w-[250px]">
              Cancel
            </Button>
            <Button
              size={'default'}
              className="md:w-[250px]"
              onClick={handleSubmit}
              disabled={isLoading}
              loader={isLoading}
            >
              Save
            </Button>
          </div>
        )}
      </Card>
      <Card className="p-space16 rounded-t-none space-y-space24 ">
        <div className="flex items-center gap-space12 ">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={'pagination'}>
                <Plus size={16} />
                <p className="text-sm font-medium">Add new section</p>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              side="right"
              className="!p-0 !m-0 w-full"
            >
              <div className="flex flex-col px-space6 text-sm font-medium py-space4">
                <div className="hover:bg-gray-50">
                  <PopoverClose asChild>
                    <Button
                      variant={'select'}
                      className="text-sm font-medium mx-auto hover:bg-gray-50"
                      onClick={() => addSection('product')}
                    >
                      Add Product
                    </Button>
                  </PopoverClose>
                </div>
                <div className="hover:bg-gray-50 border-y">
                  <PopoverClose asChild>
                    <Button
                      variant={'select'}
                      className="text-sm font-medium mx-auto hover:bg-gray-50"
                      onClick={() => addSection('banner')}
                    >
                      Add Banner
                    </Button>
                  </PopoverClose>
                </div>
                <div className="hover:bg-gray-50 ">
                  <PopoverClose asChild>
                    <Button
                      variant={'select'}
                      className="text-sm font-medium mx-auto hover:bg-gray-50"
                      onClick={() => addSection('offer')}
                    >
                      Add Offer
                    </Button>
                  </PopoverClose>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Card>
    </div>
  );
};

export default StoreUiSectionWrapper;
