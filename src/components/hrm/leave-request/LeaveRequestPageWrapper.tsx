'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LeaveRequestTable from './LeaveRequestTable';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import { ILeaveRequestsData } from '@/types/leave-request-interface';

const LeaveRequestPageWrapper = ({
  leaveRequests,
}: {
  leaveRequests: ILeaveRequestsData;
}) => {
  return (
    <Card className="p-space16">
      <div className="flex justify-between items-center border-b border-gray-200 pb-space16">
        <div>
          {' '}
          <h1 className="text-md font-semibold">Leave Requests</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            <SearchInput wrapperClasses="h-[40px]" />
            <Link href="/leave-request/create">
              <Button>
                <Plus className="w-4 h-4" />
                Add Leave Request
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {leaveRequests?.data?.length > 0 ? (
        <LeaveRequestTable
          leaveRequests={leaveRequests}
          activePage={leaveRequests?.current_page ?? 0}
          perPage={leaveRequests?.per_page ?? 0}
        />
      ) : (
        <EmptyTableData
          title="There is no leave request created here yet!"
          description="Add leave request to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={
            <div className="flex gap-space16">
              <Link href={`/leave-request/create`}>
                <Button>
                  <Plus className="w-4 h-4" />
                  Add Leave Request
                </Button>
              </Link>
            </div>
          }
        />
      )}
    </Card>
  );
};

export default LeaveRequestPageWrapper;
