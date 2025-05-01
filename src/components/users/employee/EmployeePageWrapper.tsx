'use client';
import { DateSelect } from '@/components/common/DateSelect';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import SortAndFilterComponent from '@/components/common/SortAndFilterComponent';
import { Card } from '@/components/ui/card';
import { Employee } from '@/types/UserType';
import EmployeeTable from './EmployeeTable';
import EmployeeForm from './EmployeeForm';
import { Role } from '@/types/permission';
import { FILTER_OPTIONS, SORT_OPTIONS } from '@/config/data';
import PaginateAction from '@/components/common/PaginateAction';

const EmployeePageWrapper = ({
  employeeList,
  rolesList,
}: {
  employeeList: PaginateType<Employee[]>;
  rolesList: Role[];
}) => {
  return (
    <Card className="mb-space16 p-space16">
      <div className="border-b border-gray-200 pb-space12 mb-space12 pt-0 flex justify-between items-center">
        <h2 className="text-lg font-medium text-black">Employee</h2>
        <div className="flex gap-space12">
          <SearchInput
            wrapperClasses="h-[40px]"
            placeholder="Search by employee name"
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

          <EmployeeForm roles={rolesList ?? []} />
        </div>
      </div>

      {employeeList?.data?.length > 0 ? (
        <EmployeeTable
          employee={employeeList.data}
          roles={rolesList}
          activePage={employeeList?.current_page ?? 0}
          perPage={employeeList?.per_page ?? 0}
        />
      ) : (
        <EmptyTableData
          title="There is no employee created here yet!"
          description="Add employee to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={<EmployeeForm roles={rolesList ?? []} />}
        />
      )}
      <PaginateAction
        total={employeeList?.total ?? 0}
        perPage={employeeList?.per_page ?? 0}
        activePage={employeeList?.current_page ?? 0}
      />
    </Card>
  );
};

export default EmployeePageWrapper;
