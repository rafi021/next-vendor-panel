'use client';

import Link from 'next/link';
import { Pencil } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/date-format';
import DeleteButton from '@/components/common/DeleteButton';
import StatusUpdate from '@/components/common/StatusUpdate';
import { LEAVE_REQUESTS } from '@/server/services/leave-request';
import { ILeaveRequestsData } from '@/types/leave-request-interface';

const LeaveRequestTable = ({
  leaveRequests,
  activePage,
  perPage,
}: {
  leaveRequests: ILeaveRequestsData;
  activePage: number;
  perPage: number;
}) => {
  const leaveRequestSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Employee Name</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Days</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Approval Status</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveRequests?.data?.map(
            (
              {
                id,
                employee,
                leave_type,
                notes,
                days,
                start_date,
                end_date,
                approval_status,
                is_active,
              },
              index: number,
            ) => (
              <TableRow key={id}>
                <TableCell>{leaveRequestSerial(index)}</TableCell>
                <TableCell>{employee?.name}</TableCell>
                <TableCell>{leave_type?.name}</TableCell>
                <TableCell>{days}</TableCell>
                <TableCell>{formatDate(start_date)}</TableCell>
                <TableCell>{formatDate(end_date)}</TableCell>
                <TableCell>{notes}</TableCell>
                <TableCell>{approval_status}</TableCell>
                <TableCell>
                  <StatusUpdate
                    isActive={is_active == 1 ? true : false}
                    url={`${LEAVE_REQUESTS.PUT.STATUS_UPDATE}/${id}`}
                    tags={LEAVE_REQUESTS.GET.TAGS}
                  />
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Link href={`/leave-request/update/${id}`}>
                    <Button variant="white" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DeleteButton
                    url={`${LEAVE_REQUESTS.DELETE}/${id}`}
                    tags={LEAVE_REQUESTS.GET.TAGS}
                  />
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default LeaveRequestTable;
