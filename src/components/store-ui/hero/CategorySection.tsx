'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ICategory } from '@/types/category-interfaces';
import { Layers } from 'lucide-react';

import { MAX_CATEGORY_SELECT_FOR_STORE_UI } from '@/config/data';
import { useStoreUIState } from '@/stores/useStoreUI';

import { Reorder, motion } from 'framer-motion';
import CategoryItem from './CategoryItem';

type Category = Pick<ICategory, 'id' | 'name'>;

const CategorySection = ({ categories }: { categories: ICategory[] }) => {
  const {
    selectedCategories,
    setSelectedCategories,
    is_category_show,
    setCategoryShow,
  } = useStoreUIState();

  const toggleCategory = (category: Category) => {
    const exists = selectedCategories.find((c) => c.id === category.id);
    if (exists) {
      setSelectedCategories(
        selectedCategories.filter((c) => c.id !== category.id),
      );
    } else if (selectedCategories.length < MAX_CATEGORY_SELECT_FOR_STORE_UI) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <Button size="icon" variant="white" className="border">
          <Layers size={20} />
        </Button>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-md font-semibold">Category</span>
            <Switch
              checked={is_category_show === 1}
              onCheckedChange={(checked: boolean) =>
                setCategoryShow(checked ? 1 : 0)
              }
            />
          </div>
          <p className="text-sm text-gray-500">
            Maximum {MAX_CATEGORY_SELECT_FOR_STORE_UI} categories can be
            selected.
          </p>
        </div>
      </div>

      {!!is_category_show && (
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
                  !!selectedCategories.find((c) => c.id === category.id)
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
              values={selectedCategories}
              onReorder={setSelectedCategories}
              className="flex flex-wrap gap-2"
            >
              {selectedCategories.map((category) => (
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

export default CategorySection;
