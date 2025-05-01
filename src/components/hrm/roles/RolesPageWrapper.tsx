'use client';

import { Card } from '@/components/ui/card';
import EmptyTableData from '@/components/common/EmptyTableData';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import RolesTable from './RolesTable';
import { Role } from '@/types/permission';

const RolesPageWrapper = ({
  rolesList,
}: {
  rolesList: PaginateType<Role[]>;
}) => {
  return (
    <Card className="p-space16">
      <div className="flex justify-between items-center border-b border-gray-200 pb-space16">
        <div>
          {' '}
          <h1 className="text-md font-semibold">Roles</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            <Link href="/roles/create">
              <Button>
                <Plus className="w-4 h-4" />
                Add New Role
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {rolesList?.data?.length > 0 ? (
        <RolesTable
          roles={rolesList.data}
          activePage={rolesList?.current_page ?? 0}
          perPage={rolesList?.per_page ?? 0}
        />
      ) : (
        <EmptyTableData
          title="There is no roles created here yet!"
          description="Add roles to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={
            <Link href="/roles/create">
              <Button>
                <Plus className="w-4 h-4" />
                Add New Role
              </Button>
            </Link>
          }
        />
      )}
    </Card>
  );
};

export default RolesPageWrapper;
