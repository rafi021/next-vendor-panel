'use client';

import Link from 'next/link';
import { useQueryState } from 'nuqs';
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IProductData } from '@/types/product-interface';
import SearchInput from '@/components/common/forms/SearchInput';
import EmptyTableData from '@/components/common/EmptyTableData';
import {
  Box,
  CircleDollarSign,
  Download,
  Plus,
  Trash,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import ProductTable from './ProductTable';
import { Label } from '@/components/ui/label';
import { PRODUCT } from '@/server/services/product';
import DeleteButton from '@/components/common/DeleteButton';
import PaginateAction from '@/components/common/PaginateAction';

const productStatus = [
  { title: 'All', key: 'all', value: 'total_count' },
  { title: 'Active', key: 'true', value: 'active_count' },
  { title: 'Inactive', key: 'false', value: 'inactive_count' },
];

interface Metadata {
  active_count: number;
  inactive_count: number;
  total_count: number;
  stock_value: number;
}

const ProductPageWrapper = ({
  products,
  metadata,
}: {
  products: IProductData;
  metadata: Metadata;
}) => {
  const [activeIds, setActiveIds] = useState<number[]>([]);

  const [productStatusQuery, setProductStatusQuery] = useQueryState('status', {
    shallow: false,
    defaultValue: 'all',
  });

  return (
    <div className="space-y-space16 pb-space16">
      <Card className="py-space16 xl:px-space12 xl:py-space24 bg-gradient-primary grid grid-cols-2 lg:grid-cols-4">
        <div className="space-y-space8 border-r border-gray-300 px-space12">
          <div className="flex items-center gap-space8 text-gray-500 text-xs xl:text-sm font-medium">
            <Box className="text-[#FF920F] h-space16 w-space16" />
            TOTAL PRODUCTS
          </div>

          <article className="flex items-center gap-space6">
            <p className=" text-black text-md xl:text-xl font-semibold">
              {metadata.total_count}
            </p>
            {/* <span className="flex items-center text-green-500 text-xs xl:text-sm">
              <ArrowUpRight className="h-[18px] w-[18px]" /> 2%
            </span> */}
          </article>
        </div>

        <div className="space-y-space8 lg:border-r border-gray-300 px-space12">
          <div className="flex items-center gap-space8 text-gray-500 text-xs xl:text-sm font-medium">
            <CircleDollarSign className="text-[#FF920F] h-space16 w-space16" />
            TOTAL STOCK VALUE
          </div>

          <article className="flex items-center gap-space6">
            <p className=" text-black text-md xl:text-xl font-semibold">
              {metadata.stock_value}
            </p>
            {/* <span className="flex items-center text-error-500 text-xs xl:text-sm">
              <ArrowDownRight className="h-[18px] w-[18px]" /> 2%
            </span> */}
          </article>
        </div>

        <div className="space-y-space8 border-r border-gray-300 px-space12 pt-space16 lg:pt-0">
          <div className="flex items-center gap-space8 text-gray-500 text-xs xl:text-sm font-medium">
            <TrendingUp className="text-[#FF920F] h-space16 w-space16" />
            <span className="hidden sm:inline">TOTAL</span> ACTIVE PRODUCTS
          </div>

          <article className="flex items-center gap-space6">
            <p className=" text-black text-md xl:text-xl font-semibold">
              {metadata.active_count}
            </p>
            {/* <span className="flex items-center text-green-500 text-xs xl:text-sm">
              <ArrowUpRight className="h-[18px] w-[18px]" /> 2%
            </span> */}
          </article>
        </div>

        <div className="space-y-space8 px-space12 pt-space16 lg:pt-0">
          <div className="flex items-center gap-space8 text-gray-500 text-xs xl:text-sm font-medium">
            <TrendingDown className="text-[#FF920F] h-space16 w-space16" />
            <span className="hidden sm:inline">TOTAL</span> INACTIVE PRODUCTS
          </div>

          <article className="flex items-center gap-space6">
            <p className=" text-black text-md xl:text-xl font-semibold">
              {metadata.inactive_count}
            </p>
            {/* <span className="flex items-center text-error-500 text-xs xl:text-sm">
              <ArrowDownRight className="h-[18px] w-[18px]" /> 2%
            </span> */}
          </article>
        </div>
      </Card>

      <Card className="mb-space16 p-space16">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-black">Products</h2>
          <div className="flex gap-space12">
            {!!activeIds.length && (
              <DeleteButton
                tags={PRODUCT.GET.PRODUCTS.TAGS}
                handleReset={() => setActiveIds([])}
                url={`${PRODUCT.DELETE.PRODUCT_BULK_DELETE}?ids=[${activeIds}]`}
              >
                <Button variant="danger-outline">
                  <Trash className="w-4 h-4" /> Delete
                </Button>
              </DeleteButton>
            )}
            <SearchInput wrapperClasses="h-[40px]" />
            {/* <div className="flex">
              <SortAndFilterComponent
                label="Sort"
                triggerClassName="rounded-r-none"
                fields={SORT_OPTIONS}
                containerClassName="w-54"
              />
              <SortAndFilterComponent
                fields={FILTER_OPTIONS}
                label="Filter"
                triggerClassName="rounded-l-none"
                containerClassName="w-26"
                align="end"
              />
            </div>
            <DateSelect /> */}

            <Link href={`/product/add`}>
              <Button>
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-start border-b border-gray-200 my-space12">
          {productStatus.map((item) => (
            <Label
              key={item.title}
              htmlFor={item.title}
              className={`px-space16 py-space8 ${productStatusQuery == item.key ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 cursor-pointer'} ${metadata?.[item.value as keyof Metadata] === 0 && 'cursor-not-allowed'}`}
            >
              <span>{item.title}</span>
              <span
                className={`px-space8 rounded-lg text-xs ml-2 ${productStatusQuery == item.key ? 'bg-blue-500 text-white' : 'text-gray-500 border border-gray-300'}`}
              >
                {item.title == 'All'
                  ? metadata.total_count
                  : item.title == 'Active'
                    ? metadata.active_count
                    : metadata.inactive_count}
              </span>
              <input
                name="tab"
                type="radio"
                id={item.title}
                className="hidden"
                value={item.title}
                disabled={metadata?.[item.value as keyof Metadata] === 0}
                onChange={(evt) => setProductStatusQuery(item.key)}
              />
            </Label>
          ))}
        </div>
        {products.data?.length > 0 ? (
          <ProductTable
            products={products}
            activeIds={activeIds}
            setActiveIds={setActiveIds}
            activePage={products.current_page}
            perPage={products.per_page}
          />
        ) : (
          <EmptyTableData
            title="There is no product created here yet!"
            placeholder={<Box className="w-[90px] h-[90px] text-gray-500" />}
            description="Add products to your shop and adjust them as you wish. You will be able to export data, add, update and delete whenever you want, whenever you wish"
            action={
              <div className="flex gap-space16">
                <Button variant={'white'}>
                  <span className="rotate-180">
                    <Download className="w-4 h-4" />
                  </span>
                  Import
                </Button>

                <Link href={`/product/add`}>
                  <Button>
                    <Plus className="w-4 h-4" />
                    Add Product
                  </Button>
                </Link>
              </div>
            }
          />
        )}
        <PaginateAction
          activePage={products.current_page}
          total={products.total}
          perPage={products.per_page}
          // onChange={(data) => // console.log(data)}
        />
      </Card>
    </div>
  );
};

export default ProductPageWrapper;
