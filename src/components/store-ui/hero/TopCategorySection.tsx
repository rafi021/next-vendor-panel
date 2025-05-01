'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ICategory } from '@/types/category-interfaces';
import { Layers } from 'lucide-react';

import React from 'react';
import { useStoreUIState } from '@/stores/useStoreUI';

import { Reorder, motion } from 'framer-motion';
import CategoryItem from './CategoryItem';

type Category = Pick<ICategory, 'id' | 'name'>;

const TopCategorySection = ({ categories }: { categories: ICategory[] }) => {
  const {
    is_top_category_show,
    setTopCategoryShow,
    selectedTopCategories,
    setSelectedTopCategories,
  } = useStoreUIState();

  const toggleCategory = (category: Category) => {
    const exists = selectedTopCategories.find((c) => c.id === category.id);
    if (exists) {
      setSelectedTopCategories(
        selectedTopCategories.filter((c) => c.id !== category.id),
      );
    } else {
      setSelectedTopCategories([...selectedTopCategories, category]);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-space12">
        <Button size={'icon'} variant={'white'} className="border">
          <Layers size="20" />
        </Button>
        <div className="space-y-space4">
          <div className="flex items-center gap-space8">
            <span className="text-md font-semibold">Top Category</span>
            <Switch
              checked={is_top_category_show === 1}
              onCheckedChange={(checked: boolean) =>
                setTopCategoryShow(checked === true ? 1 : 0)
              }
            />
          </div>
          <p className="text-sm font-normal text-gray-500">
            Select Categories to show as top category
          </p>
        </div>
      </div>
      {!!is_top_category_show && (
        <div className="mt-4">
          {/* All categories list */}
          <div className="flex flex-wrap gap-2 border border-gray-200 p-4 rounded">
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                id={category.id}
                name={category.name}
                type="select"
                selected={
                  !!selectedTopCategories.find((c) => c.id === category.id)
                }
                onSelect={() =>
                  toggleCategory({ id: category.id, name: category.name })
                }
              />
            ))}
          </div>

          {/* Selected + Re-orderable list */}
          <div className="mt-4 border border-blue-200 p-4 rounded ">
            <p className="text-sm font-medium mb-2 text-blue-800">
              Selected Categories (Drag to reorder)
            </p>
            <Reorder.Group
              axis="x"
              values={selectedTopCategories}
              onReorder={setSelectedTopCategories}
              className="flex flex-wrap gap-2"
            >
              {selectedTopCategories.map((category) => (
                <Reorder.Item
                  key={category.id}
                  value={category}
                  as="div"
                  className="cursor-move"
                >
                  <motion.div layout>
                    <CategoryItem
                      id={category.id}
                      name={category.name}
                      selected={true}
                      onSelect={() => {}}
                      type="reorder"
                    />
                  </motion.div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopCategorySection;
