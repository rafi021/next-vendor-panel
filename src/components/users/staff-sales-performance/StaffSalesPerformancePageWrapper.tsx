'use client';

import { Card, CardTitle } from '@/components/ui/card';
import { IEmployeesData } from '@/types/employee-interface';
import SearchInput from '@/components/common/forms/SearchInput';
import EmptyTableData from '@/components/common/EmptyTableData';
import PaginateAction from '@/components/common/PaginateAction';
import StaffSalesPerformanceTable from './StaffSalesPerformanceTable';
import SortAndFilterComponent, {
  Field,
} from '@/components/common/SortAndFilterComponent';

const filterFormat = [
  {
    name: 'Today',
    column: 'today',
  },
  {
    name: 'Yesterday',
    column: 'yesterday',
  },
  {
    name: 'This Week',
    column: 'this_week',
  },
  {
    name: 'This Month',
    column: 'this_month',
  },
];

const StaffSalesPerformancePageWrapper = ({
  staffData,
}: {
  staffData: IEmployeesData;
}) => {
  const filterOptions: Field[] = filterFormat?.map((filter) => ({
    name: filter.name,
    column: filter.column,
  }));
  return (
    <Card className="mb-space16 p-space16">
      <div className="mb-space12 flex justify-between items-center">
        <CardTitle className="text-lg font-medium text-black">
          Staff Sales Performance
        </CardTitle>
        <div className="flex gap-space12">
          <SearchInput
            wrapperClasses="h-[40px]"
            placeholder="Search by staff name"
          />
          <SortAndFilterComponent
            label="Filter"
            type="single"
            fields={filterOptions}
            queryKeys={{
              filterKey: 'format',
            }}
          />
        </div>
      </div>

      {staffData?.data?.length > 0 ? (
        <StaffSalesPerformanceTable
          staffList={staffData?.data}
          activePage={staffData?.current_page ?? 0}
          perPage={staffData?.per_page ?? 0}
        />
      ) : (
        <EmptyTableData
          title="No staff found"
          description="Add staff to your shop and adjust them as you wish."
          action={''}
        />
      )}
      <PaginateAction
        total={staffData?.total ?? 0}
        perPage={staffData?.per_page ?? 0}
        activePage={staffData?.current_page ?? 0}
      />
    </Card>
  );
};

export default StaffSalesPerformancePageWrapper;
