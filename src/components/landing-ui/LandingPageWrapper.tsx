'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import { ILandingPagesData } from '@/types/landing-ui-interface';
import LandingPageTable from './LandingPageTable';
import PaginateAction from '../common/PaginateAction';

const LandingPageWrapper = ({
  landingPages,
  store_domain_name,
}: {
  landingPages: ILandingPagesData;
  store_domain_name: string | null;
}) => {
  return (
    <Card className="p-space16">
      <div className="flex justify-between items-center border-b border-gray-200 pb-space16">
        <div>
          {' '}
          <h1 className="text-md font-semibold">Landing UI</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            <SearchInput wrapperClasses="h-[40px]" />

            <Link href="/landing-ui/create">
              <Button>
                <Plus className="w-4 h-4" />
                Add New Landing
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {landingPages?.data?.length > 0 ? (
        <LandingPageTable
          landingPages={landingPages}
          activePage={landingPages?.current_page ?? 0}
          perPage={landingPages?.per_page ?? 0}
          store_domain_url={store_domain_name}
        />
      ) : (
        <EmptyTableData
          title="There is no landing page created here yet!"
          description="Create landing page to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={
            <div className="flex gap-space16">
              <Link href={`/landing-ui/create`}>
                <Button>
                  <Plus className="w-4 h-4" />
                  Add Landing Page
                </Button>
              </Link>
            </div>
          }
        />
      )}
      <PaginateAction
        total={landingPages?.total ?? 0}
        perPage={landingPages?.per_page ?? 0}
        activePage={landingPages?.current_page ?? 0}
      />
    </Card>
  );
};

export default LandingPageWrapper;
