'use client';
import { DateSelect } from '@/components/common/DateSelect';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import SortAndFilterComponent from '@/components/common/SortAndFilterComponent';
import { Card } from '@/components/ui/card';
import { BrandData } from '@/types/brands-interface';
import BrandTable from './BrandTable';
import StoreBrand from './StoreBrand';
import FilterActions from '@/components/common/FinterActions';
import { FILTER_OPTIONS, SORT_OPTIONS } from '@/config/data';
import PaginateAction from '@/components/common/PaginateAction';

const BrandPageWrapper = ({ brands }: { brands: BrandData }) => {
  return (
    <Card className="mb-space16 p-space16">
      <div className="border-b border-gray-200 pb-space12 mb-space12 pt-0 flex justify-between items-center">
        <h2 className="text-lg font-medium text-black">Brands</h2>
        <div className="flex gap-space12">
          <SearchInput wrapperClasses="h-[40px]" placeholder="Search by brand name" />
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

          <StoreBrand />
        </div>
      </div>

      {brands.data?.length > 0 ? (
        <BrandTable
          brands={brands}
          activePage={brands?.current_page ?? 0}
          perPage={brands?.per_page ?? 0}
        />
      ) : (
        <EmptyTableData
          title="There is no Brand created here yet!"
          description="Add Brands to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={<StoreBrand />}
        />
      )}
      <PaginateAction
        total={brands?.total ?? 0}
        perPage={brands?.per_page ?? 0}
        activePage={brands?.current_page ?? 0}
      />
    </Card>
  );
};

export default BrandPageWrapper;
