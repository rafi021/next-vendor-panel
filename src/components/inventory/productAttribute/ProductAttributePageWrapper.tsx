'use client';
import { DateSelect } from '@/components/common/DateSelect';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import SortAndFilterComponent from '@/components/common/SortAndFilterComponent';
import { Card } from '@/components/ui/card';
import CreateProductAttribute from './ProductAttributeForm';
import { IProductAttributeData } from '@/types/attributes-interface';
import ProductsAttributesTable from './ProductsAttributesTable';
import { FILTER_OPTIONS, SORT_OPTIONS } from '@/config/data';
import PaginateAction from '@/components/common/PaginateAction';

const ProductAttributePageWrapper = ({
  productAttributes,
}: {
  productAttributes: IProductAttributeData;
}) => {
  return (
    <Card className="p-space16">
      <div className="border-b border-gray-300 p-space12 flex justify-between items-center">
        <h2 className="text-lg font-medium text-black">Products Attributes</h2>
        <div className="flex gap-space12">
          <SearchInput
            wrapperClasses="h-[40px]"
            placeholder="Search by attribute name"
          />
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
          <CreateProductAttribute />
        </div>
      </div>

      {productAttributes?.data?.length > 0 ? (
        <ProductsAttributesTable
          productsAttributes={productAttributes}
          activePage={productAttributes?.current_page ?? 0}
          perPage={productAttributes?.per_page ?? 0}
        />
      ) : (
        <EmptyTableData
          title="There is no Tag created here yet!"
          description="Add Tags to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={<CreateProductAttribute />}
        />
      )}
      <PaginateAction
        total={productAttributes?.total ?? 0}
        perPage={productAttributes?.per_page ?? 0}
        activePage={productAttributes?.current_page ?? 0}
      />
    </Card>
  );
};

export default ProductAttributePageWrapper;
