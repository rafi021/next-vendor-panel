'use client';

import AddDepartment from './AddDepartment';
import { Card } from '@/components/ui/card';
import DepartmentTable from './DepartmentTable';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import { IDepartmentsData } from '@/types/department-interface';
import PaginateAction from '@/components/common/PaginateAction';

const DepartmentPageWrapper = ({
  departments,
}: {
  departments: IDepartmentsData;
}) => {
  return (
    <Card className="p-space16">
      <div className="flex justify-between items-center border-b border-gray-200 pb-space16">
        <div>
          {' '}
          <h1 className="text-md font-semibold">Departments</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            <SearchInput
              wrapperClasses="h-[40px]"
              placeholder="Search by department name"
            />
            <AddDepartment />
          </div>
        </div>
      </div>

      {departments?.data?.length > 0 ? (
        <DepartmentTable
          departments={departments}
          activePage={departments?.current_page ?? 0}
          perPage={departments?.per_page ?? 0}
        />
      ) : (
        <EmptyTableData
          title="There is no HR department created here yet!"
          description="Add HR department to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={<AddDepartment />}
        />
      )}
      <PaginateAction
        total={departments?.total ?? 0}
        perPage={departments?.per_page ?? 0}
        activePage={departments?.current_page ?? 0}
      />
    </Card>
  );
};

export default DepartmentPageWrapper;
