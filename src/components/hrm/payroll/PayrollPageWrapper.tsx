'use client';

import { Card } from '@/components/ui/card';
import { DateSelect } from '@/components/common/DateSelect';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import SortAndFilterComponent from '@/components/common/SortAndFilterComponent';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import PayrollTable from './PayrollTable';
import AddPayrollForm from './AddPayrollForm';
import { IPayrollsData } from '@/types/payroll-interface';
import { FILTER_OPTIONS, SORT_OPTIONS } from '@/config/data';

const PayrollPageWrapper = ({ payrolls }: { payrolls: IPayrollsData }) => {
  return (
    <Card className="p-space16">
      <div className="flex justify-between items-center border-b border-gray-200 pb-space16">
        <div>
          {' '}
          <h1 className="text-md font-semibold">Payrolls</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            <SearchInput wrapperClasses="h-[40px]" />
            <div className="relative flex">
              <SortAndFilterComponent
                label="Sort"
                triggerClassName="rounded-r-none"
                fields={SORT_OPTIONS}
                containerClassName="w-54 border-r-none"
              />
              <SortAndFilterComponent
                fields={FILTER_OPTIONS}
                triggerClassName="rounded-l-none"
                label="Filter"
              />
            </div>
            <DateSelect />
            <Link href="/payroll/create">
              <Button>
                <Plus className="w-4 h-4" />
                Add New Payroll
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {payrolls?.data?.length > 0 ? (
        <PayrollTable payrolls={payrolls}
          activePage={payrolls?.current_page ?? 0}
          perPage={payrolls?.per_page ?? 0}

        />
      ) : (
        <EmptyTableData
          title="There is no payroll created here yet!"
          description="Add payroll to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={<div className="flex gap-space16">
            <Link href={`/hrm/payroll/create`}>
              <Button>
                <Plus className="w-4 h-4" />
                Add Payroll
              </Button>
            </Link>
          </div>}
        />
      )}
    </Card>
  );
};

export default PayrollPageWrapper;
