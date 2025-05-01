'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/utils/date-format';
import { Pencil } from 'lucide-react';
import DeleteButton from '@/components/common/DeleteButton';
import StatusUpdate from '@/components/common/StatusUpdate';
import { ILeaveTypesData } from '@/types/leave-type-interface';
import { LEAVE_TYPES } from '@/server/services/leave-types';
import AddLeaveType from './AddLeaveType';

const LeaveTypeTable = ({ leaveTypes, activePage, perPage }: { leaveTypes: ILeaveTypesData, activePage: number, perPage: number }) => {
  const leaveTypeSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Leave Type Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveTypes?.data?.map(
            ({ id, name, description, created_at, is_active }, index: number) => (
              <TableRow key={id}>
                <TableCell>{leaveTypeSerial(index)}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{formatDate(created_at)}</TableCell>
                <TableCell>
                  <StatusUpdate
                    isActive={is_active == 1 ? true : false}
                    url={`${LEAVE_TYPES.PUT.STATUS_UPDATE}/${id}`}
                    tags={LEAVE_TYPES.GET.TAGS}
                  />
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <AddLeaveType
                    title="Edit Deposits Category"
                    data={{
                      id,
                      name,
                      description,
                    }}
                  >
                    <Button variant="white" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </AddLeaveType>
                  <DeleteButton
                    url={`${LEAVE_TYPES.DELETE}/${id}`}
                    tags={LEAVE_TYPES.GET.TAGS}
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

export default LeaveTypeTable;
