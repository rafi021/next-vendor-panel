'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useQueryState } from 'nuqs';
import CategoryTable from './CategoryTable';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ICategories } from '@/types/category-interfaces';
import SearchInput from '@/components/common/forms/SearchInput';
import EmptyTableData from '@/components/common/EmptyTableData';
import PaginateAction from '@/components/common/PaginateAction';

interface Metadata {
  active_count: number;
  inactive_count: number;
  total_count: number;
}

const CategoryPageWrapper = ({
  categoriesData,
  metadata,
}: {
  categoriesData: ICategories;
  metadata: Metadata | null;
}) => {
  // const categoryStatus = [
  //   { title: 'All', key: 'all', value: 'total_count' },
  //   { title: 'Active', key: 'true', value: 'active_count' },
  //   { title: 'Inactive', key: 'false', value: 'inactive_count' },
  // ];

  // const [categoryStatusQuery, setCategoryStatusQuery] = useQueryState(
  //   'status',
  //   {
  //     shallow: false,
  //     defaultValue: 'all',
  //   },
  // );
  return (
    <Card className="p-space16">
      <div className="flex justify-between items-center mb-4">
        <div>
          {' '}
          <h1 className="text-md font-semibold">Category</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            <SearchInput
              wrapperClasses="h-[40px]"
              placeholder="Search by category name"
            />
            <div>
              <Link href="/category/add">
                <Button>
                  <Plus className="w-4" /> Add Category
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex items-center justify-start border-b border-gray-200 my-space12">
        {categoryStatus.map((item) => (
          <Label
            key={item.title}
            htmlFor={item.title}
            className={`px-space16 py-space8 ${categoryStatusQuery == item.key ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 cursor-pointer'} ${metadata?.[item.value as keyof Metadata] === 0 && 'cursor-not-allowed'}`}
          >
            <span>{item.title}</span>
            <span
              aria-disabled={metadata?.[item.value as keyof Metadata] === 0}
              className={`px-space8 py-[2px] rounded-full text-xs ml-1 ${metadata?.[item.value as keyof Metadata] === 0 ? 'opacity-50' : ''} ${categoryStatusQuery == item.key ? 'bg-blue-500 text-white' : 'text-gray-500 border border-gray-300'}`}
            >
              {item.title == 'All'
                ? metadata?.total_count
                : item.title == 'Active'
                  ? metadata?.active_count
                  : item.title == 'Inactive'
                    ? metadata?.inactive_count
                    : ''}
            </span>
            <input
              name="tab"
              type="radio"
              id={item.title}
              className="hidden"
              value={item.title}
              disabled={metadata?.[item.value as keyof Metadata] === 0}
              onChange={(evt) => setCategoryStatusQuery(item.key)}
            />
          </Label>
        ))}
      </div> */}
      {categoriesData?.data?.length > 0 ? (
        <CategoryTable categories={categoriesData?.data} />
      ) : (
        <EmptyTableData
          title="There is no category created here yet!"
          description="Add category to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={
            <Link href="/category/add">
              <Button>
                <Plus className="w-5 h-5" />
                Add New Category
              </Button>
            </Link>
          }
        />
      )}
      <PaginateAction
        total={categoriesData?.total ?? 0}
        perPage={categoriesData?.per_page ?? 0}
        activePage={categoriesData?.current_page ?? 0}
      />
    </Card>
  );
};

export default CategoryPageWrapper;
