'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import DepositTable from './DepositTable';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IDepositData } from '@/types/deposit-interface';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import PaginateAction from '@/components/common/PaginateAction';
import SortAndFilterComponent, {
  Field,
} from '@/components/common/SortAndFilterComponent';
import { IDepositCategoryData } from '@/types/deposit-category-interface';

const DepositPageWrapper = ({
  deposits,
  depositCategories,
}: {
  deposits: IDepositData;
  depositCategories: IDepositCategoryData;
}) => {
  const filterOptions: Field[] = depositCategories?.data?.map(
    (depositCategory) => ({
      name: depositCategory.name,
      column: String(depositCategory.id),
    }),
  );

  return (
    <Card className="p-space16">
      <div className="flex justify-between items-center border-b border-gray-200 pb-space16">
        <div>
          {' '}
          <h1 className="text-md font-semibold">Deposits</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            <SearchInput wrapperClasses="h-[40px]" />
            <SortAndFilterComponent
              label="Filter"
              type="single"
              fields={filterOptions}
              queryKeys={{
                filterKey: 'deposit_category_id',
              }}
            />
            <Link href="/deposit/create">
              <Button>
                <Plus className="w-4 h-4" />
                Add New Deposit
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {deposits?.data?.length > 0 ? (
        <DepositTable
          deposits={deposits?.data}
          activePage={deposits?.current_page ?? 0}
          perPage={deposits?.per_page ?? 0}
        />
      ) : (
        <EmptyTableData
          title="There is no deposit category created here yet!"
          description="Add deposit category to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={''}
        />
      )}
      <PaginateAction
        total={deposits?.total ?? 0}
        perPage={deposits?.per_page ?? 0}
        activePage={deposits?.current_page ?? 0}
      />
    </Card>
  );
};

export default DepositPageWrapper;
