'use client';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import { Card } from '@/components/ui/card';
import { IDamageData } from '@/types/damage-interface';
import DamageTable from './DamageTable';
import { Button } from '@/components/ui/button';
import PaginateAction from '@/components/common/PaginateAction';

const DamagePageWrapper = ({ damages }: { damages: IDamageData }) => {
  return (
    <Card className="mb-space16 p-space16">
      <div className="border-b border-gray-200 pb-space12 mb-space12 pt-0 flex justify-between items-center">
        <h2 className="text-lg font-medium text-black">Damages</h2>
        <div className="flex gap-space12">
          <SearchInput wrapperClasses="h-[40px]" placeholder="Search by damage name" />
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

          <Link href="/damage/create">
            <Button>
              <Plus className="w-4 h-4" />
              Add New Damage
            </Button>
          </Link>
        </div>
      </div>

      {damages.data?.length > 0 ? (
        <DamageTable
          damages={damages}
          activePage={damages?.current_page ?? 0}
          perPage={damages?.per_page ?? 0}
        />
      ) : (
        <EmptyTableData
          title="There is no Brand created here yet!"
          description="Add Brands to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={<Link href={'/damage/create'}>Add new Damage</Link>}
        />
      )}
      <PaginateAction
        total={damages?.total ?? 0}
        perPage={damages?.per_page ?? 0}
        activePage={damages?.current_page ?? 0}
      />
    </Card>
  );
};

export default DamagePageWrapper;
