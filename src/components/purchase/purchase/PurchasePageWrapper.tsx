'use client';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { IPurchaseData } from '@/types/purchase-interface';
import PurchaseTable from './PurchaseTable';
import { IAccount } from '@/types/accounts-interface';
import PaginateAction from '@/components/common/PaginateAction';

const PurchasePageWrapper = ({
  purchases,
  accounts,
  activePage,
  perPage,
}: {
  purchases: IPurchaseData;
  accounts?: IAccount[];
  activePage: number;
  perPage: number;
}) => {
  return (
    <Card className="mb-space16 p-space16">
      <div className="border-b border-gray-200 pb-space12 mb-space12 pt-0 flex justify-between items-center">
        <h2 className="text-lg font-medium text-black">Purchases</h2>
        <div className="flex gap-space12">
          <SearchInput
            wrapperClasses="h-[40px]"
            placeholder="Search by supplier name"
          />
          <Link href="/purchase/create">
            <Button>
              <Plus className="w-4 h-4" />
              Add New Purchase
            </Button>
          </Link>
        </div>
      </div>

      {purchases?.data?.length > 0 ? (
        <PurchaseTable purchases={purchases} accounts={accounts} activePage={purchases?.current_page ?? 0} perPage={purchases?.per_page ?? 0} />
      ) : (
        <EmptyTableData
          title="There is no purchase created here yet!"
          description="Add purchase to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={''}
        />
      )}
      <PaginateAction
        total={purchases?.total ?? 0}
        perPage={purchases?.per_page ?? 0}
        activePage={purchases?.current_page ?? 0}
      />
    </Card>
  );
};

export default PurchasePageWrapper;
