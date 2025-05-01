'use client';

import { Card } from '@/components/ui/card';
import IncompleteOrderTable from './IncompleteOrderTable';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import PaginateAction from '@/components/common/PaginateAction';
import { IIncompleteOrderData } from '@/types/incomplete-order-interface';

const IncompleteOrderPageWrapper = ({
  incompleteOrders,
}: {
  incompleteOrders: IIncompleteOrderData;
}) => {
  return (
    <Card className="mb-space16 p-space16">
      <div className="border-b border-gray-200 pb-space12 mb-space12 pt-0 flex justify-between items-center">
        <h2 className="text-lg font-medium text-black">Incomplete Orders</h2>
        <div className="flex gap-space12">
          <SearchInput
            wrapperClasses="h-[40px]"
            placeholder="Search by customer name"
          />
        </div>
      </div>

      {incompleteOrders?.data?.length > 0 ? (
        <IncompleteOrderTable
          incompleteOrders={incompleteOrders?.data}
          activePage={incompleteOrders?.current_page ?? 0}
          perPage={incompleteOrders?.per_page ?? 0}
        />
      ) : (
        <EmptyTableData
          title="There is no incomplete order placed yet!"
          description=""
          action={''}
        />
      )}
      <PaginateAction
        total={incompleteOrders?.total ?? 0}
        perPage={incompleteOrders?.per_page ?? 0}
        activePage={incompleteOrders?.current_page ?? 0}
      />
    </Card>
  );
};

export default IncompleteOrderPageWrapper;
