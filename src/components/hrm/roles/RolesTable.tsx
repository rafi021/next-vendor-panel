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
import { Pencil } from 'lucide-react';
import DeleteButton from '@/components/common/DeleteButton';
import Link from 'next/link';
import { Role } from '@/types/permission';
import { ROLES } from '@/server/services/roles';
import { Badge } from '@/components/ui/badge';

const ExpenseTable = ({
  roles,
  activePage,
  perPage,
}: {
  roles: Role[];
  activePage: number;
  perPage: number;
}) => {
  const roleSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SL</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Total permissions</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles?.map((role, index) => (
            <TableRow key={role.id}>
              <TableCell>{roleSerial(index)}</TableCell>
              <TableCell>{role.name}</TableCell>
              <TableCell className="space-x-[2px]">
                {role.permissions.map((permission) => (
                  <Badge key={permission.id} variant={'outline'}>
                    {permission.name.split('_').join(' ')}
                  </Badge>
                ))}
              </TableCell>
              <TableCell className="flex gap-2 justify-end">
                <Link href={`/roles/update/${role.id}`}>
                  <Button variant="white" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
                <DeleteButton
                  url={`${ROLES.DELETE}/${role.id}`}
                  tags={ROLES.GET.LIST.TAGS}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ExpenseTable;
