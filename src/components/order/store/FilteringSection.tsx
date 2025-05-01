import React, { useState } from 'react';
import { ListFilter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ICategories } from '@/types/category-interfaces';
import { MultiSelect } from '@/components/ui/multi-select';
import SearchInput from '@/components/common/forms/SearchInput';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { useDebouncedCallback } from 'use-debounce';

const FilteringSection = ({ categories }: { categories: ICategories }) => {
  const [open, setOpen] = useState<boolean>(false);

  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withOptions({ shallow: false }),
  );
  const [minPrice, setMinPrice] = useQueryState(
    'min_price',
    parseAsString.withOptions({ shallow: false }),
  );
  const [maxPrice, setMaxPrice] = useQueryState(
    'max_price',
    parseAsString.withOptions({ shallow: false }),
  );
  const [categoryIds, setCategoryIds] = useQueryState<string[]>(
    'categories',
    parseAsArrayOf(parseAsString).withOptions({ shallow: false }),
  );

  const [price, setPrice] = useState<{ minPrice: string; maxPrice: string }>({
    minPrice: minPrice ?? '',
    maxPrice: maxPrice ?? '',
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryIds ?? [],
  );

  const handleSubmitSearch = () => {
    setCategoryIds(selectedCategories);
    setMinPrice(price.minPrice);
    setMaxPrice(price.maxPrice);
  };
  const handleReset = () => {
    setCategoryIds([]);
    setMinPrice('');
    setMaxPrice('');
  };

  // const handleSearch = useDebouncedCallback(async (value) => {
  //   setSearch(value);
  // }, 100);

  return (
    <div className="py-space12 border-b border-gray-200">
      <div className="flex gap-space8 items-center justify-between">
        <SearchInput
          value={search ?? ''}
          wrapperClasses="w-full h-[40px]"
          onChange={(e) => setSearch(typeof e === 'string' ? e : e.target.value)}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button type="button" variant={'white'}>
              <ListFilter />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[100vw] max-w-[360px] p-0" align="end">
            <div className="flex justify-between gap-space12 items-center border-b px-space12 py-space6 border-gray-200">
              <p className="text-md font-semibold">Product Search</p>

              <Button
                size={'icon'}
                variant={'transparent'}
                onClick={() => setOpen(false)}
              >
                <X />
              </Button>
            </div>

            <div className="p-space12 space-y-space16">
              <div className="space-y-space6">
                <Label>Categories</Label>

                <MultiSelect
                  maxCount={1}
                  animation={1}
                  variant="secondary"
                  options={categories.data.map((cat) => ({
                    label: cat.name,
                    value: String(cat.id),
                  }))}
                  placeholder="Select categories"
                  selectedValues={selectedCategories}
                  onValueChange={(val) => setSelectedCategories(val)}
                  className="w-[100vw] max-w-[332px]"
                />
              </div>

              <div className="space-y-space6">
                <Label>Price Range</Label>
                <div className="grid grid-cols-2 gap-space12">
                  <Input
                    type="number"
                    value={price.minPrice}
                    placeholder="Price Min"
                    onChange={({ target }) =>
                      setPrice((prv) => ({ ...prv, minPrice: target.value }))
                    }
                  />
                  <Input
                    type="number"
                    value={price.maxPrice}
                    placeholder="Price Max"
                    onChange={({ target }) =>
                      setPrice((prv) => ({ ...prv, maxPrice: target.value }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-space12 items-center border-t p-space12 border-gray-200">
              <Button variant={'white'} type="button" onClick={handleReset}>
                Reset
              </Button>
              <Button type="button" onClick={handleSubmitSearch}>
                Search
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default FilteringSection;
