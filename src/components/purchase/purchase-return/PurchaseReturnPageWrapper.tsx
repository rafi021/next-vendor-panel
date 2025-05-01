'use client';
import { Card } from '@/components/ui/card';
import PurchaseReturnTable from './PurchaseReturnTable';
import PaginateAction from '@/components/common/PaginateAction';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import { IPurchaseReturnData } from '@/types/purchase-return-interface';

const PurchaseReturnPageWrapper = ({
  purchaseReturns,
}: {
  purchaseReturns: IPurchaseReturnData;
}) => {
  return (
    <Card className="mb-space16 p-space16">
      <div className="border-b border-gray-200 pb-space12 mb-space12 pt-0 flex justify-between items-center">
        <h2 className="text-lg font-medium text-black">Purchase Returns</h2>
        <div className="flex gap-space12">
          <SearchInput
            wrapperClasses="h-[40px]"
            placeholder="Search by supplier name"
          />
        </div>
      </div>

      {purchaseReturns?.data?.length > 0 ? (
        <PurchaseReturnTable
          purchaseReturns={purchaseReturns}
          activePage={purchaseReturns?.current_page ?? 0}
          perPage={purchaseReturns?.per_page ?? 0}
        />
      ) : (
        <EmptyTableData
          title="There is no purchase created here yet!"
          description="Add purchase to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action=""
        />
      )}

      <PaginateAction
        total={purchaseReturns?.total ?? 0}
        perPage={purchaseReturns?.per_page ?? 0}
        activePage={purchaseReturns?.current_page ?? 0}
      />
    </Card>
  );
};

export default PurchaseReturnPageWrapper;
