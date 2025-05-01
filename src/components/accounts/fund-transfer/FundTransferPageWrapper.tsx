'use client';

import { Card } from '@/components/ui/card';
import { DateSelect } from '@/components/common/DateSelect';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import SortAndFilterComponent from '@/components/common/SortAndFilterComponent';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { IFundTransferData } from '@/types/fund-transfer-interface';
import FundTransferTable from './FundTransferTable';
import AddFundTransferForm from './AddFundTransferForm';
import { FILTER_OPTIONS, SORT_OPTIONS } from '@/config/data';
import PaginateAction from '@/components/common/PaginateAction';

const FundTransferPageWrapper = ({
  fundTransfers,
}: {
  fundTransfers: IFundTransferData;
}) => {
  return (
    <Card className="p-space16">
      <div className="flex justify-between items-center border-b border-gray-200 pb-space16">
        <div>
          {' '}
          <h1 className="text-md font-semibold">Fund Transfer</h1>
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
            <Link href="/fund-transfer/create">
              <Button>
                <Plus className="w-4 h-4" />
                Add New Fund Transfer
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {fundTransfers?.data?.length > 0 ? (
        <FundTransferTable fundTransfers={fundTransfers?.data}
          activePage={fundTransfers?.current_page ?? 0}
          perPage={fundTransfers?.per_page ?? 0}
        />
      ) : (
        <EmptyTableData
          title="There is no fund transfer created here yet!"
          description="Add fund transfer to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={""}
        />
      )}
      <PaginateAction
        total={fundTransfers?.total ?? 0}
        perPage={fundTransfers?.per_page ?? 0}
        activePage={fundTransfers?.current_page ?? 0}
      />
    </Card>
  );
};

export default FundTransferPageWrapper;
