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
import { Image } from '@/components/common/Image';
import { Pencil } from 'lucide-react';
import DeleteButton from '@/components/common/DeleteButton';
import StatusUpdate from '@/components/common/StatusUpdate';
import { Employee } from '@/types/UserType';
import { EMPLOYEES } from '@/server/services/employee';
import EmployeeForm from './EmployeeForm';
import { Role } from '@/types/permission';
import { Switch } from '@/components/ui/switch';
import PhoneComponent from '@/components/common/PhoneComponent';
import CopyComponent from '@/components/common/CopyComponent';
const EmployeeTable = ({
  employee,
  roles,
  activePage,
  perPage,
}: {
  employee: Employee[];
  roles: Role[];
  activePage: number;
  perPage: number;
}) => {
  const employeeSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead>SL</TableHead>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>NID</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employee.map(
          (
            {
              id,
              avatar,
              name,
              address,
              email,
              nid,
              phone,
              role,
              status,
              role_id,
              department_id,
              password,
            },
            index: number,
          ) => (
            <TableRow key={id}>
              <TableCell>{employeeSerial(index)}</TableCell>
              <TableCell className="w-[100px]">
                <Image
                  src={avatar === 'no_avatar.png' ? null : avatar || '/avatar.webp'}
                  alt={name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-full w-full object-contain"
                  wrapperClasses="h-[32px] max-w-max"
                />
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>
                {phone ? (
                  <PhoneComponent phoneNumber={phone} />
                ) : (
                  <span>-</span>
                )}
              </TableCell>
              <TableCell>{email ? (
                <CopyComponent value={email}>
                  <span>{email}</span>
                </CopyComponent>
              ) : (
                <span>-</span>
              )}</TableCell>
              <TableCell>{nid ?? 'N/A'}</TableCell>
              <TableCell>{address ?? 'N/A'}</TableCell>
           
              <TableCell className="capitalize">
                {role.name?.split('_').join(' ') ?? 'N/A'}
              </TableCell>
              <TableCell>
                {role.name === 'store_owner' ? (
                  <Switch checked={status === 1} disabled />
                ) : (
                  <StatusUpdate
                    tags={EMPLOYEES.GET.LIST.TAGS}
                    isActive={status == 1 ? true : false}
                    url={`${EMPLOYEES.STATUS_UPDATE}/${id}`}
                    // url=""
                  />
                )}
              </TableCell>
              {role.name === 'store_owner' ? (
                <TableCell className="flex items-center justify-center">
                  <p>N/A</p>
                </TableCell>
              ) : (
                <TableCell className="flex gap-2 justify-end">
                  <EmployeeForm
                    title="Edit Employee"
                    roles={roles}
                    data={{
                      id,
                      name,
                      avatar,
                      address,
                      email,
                      nid,
                      phone,
                      role,
                      role_id,
                      status,
                      department_id,
                      password,
                    }}
                  >
                    <Button variant="white" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </EmployeeForm>

                  <DeleteButton
                    url={`${EMPLOYEES.DELETE}/${id}`}
                    tags={EMPLOYEES.GET.LIST.TAGS}
                  />
                </TableCell>
              )}
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
