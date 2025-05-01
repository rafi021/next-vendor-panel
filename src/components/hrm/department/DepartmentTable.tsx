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
import { Image } from '@/components/common/Image';
import { IDepartmentsData } from '@/types/department-interface';
import AddDepartment from './AddDepartment';
import { DEPARTMENT } from '@/server/services/department';

const DepartmentTable = ({
  departments,
  activePage,
  perPage,
}: {
  departments: IDepartmentsData;
  activePage: number;
  perPage: number;
}) => {
  const departmentSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Icon</TableHead>
            <TableHead>Department Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments?.data?.map(
            (
              { id, name, icon, description, created_at, is_active },
              index: number,
            ) => (
              <TableRow key={id}>
                <TableCell>{departmentSerial(index)}</TableCell>
                <TableCell>
                  <Image
                    src={icon}
                    alt={name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-full w-full object-contain"
                    wrapperClasses="h-[32px] max-w-max"
                  />
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{formatDate(created_at)}</TableCell>
                <TableCell>
                  <StatusUpdate
                    isActive={is_active == 1 ? true : false}
                    url={`${DEPARTMENT.PUT.STATUS_UPDATE}/${id}`}
                    tags={DEPARTMENT.GET.TAGS}
                  />
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <AddDepartment
                    title="Edit Deposits Category"
                    data={{
                      id,
                      name,
                      icon,
                      description,
                    }}
                  >
                    <Button variant="white" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </AddDepartment>
                  <DeleteButton
                    url={`${DEPARTMENT.DELETE}/${id}`}
                    tags={DEPARTMENT.GET.TAGS}
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

export default DepartmentTable;
