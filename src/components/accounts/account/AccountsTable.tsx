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
import AddAccount from './AddAccount';
import { IAccount } from '@/types/accounts-interface';
import { ACCOUNTS } from '@/server/services/accounts';

const AccountsTable = ({ accounts, activePage, perPage }: { accounts: IAccount[], activePage: number, perPage: number }) => {
  const accountSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts?.map(
            ({ id, name, number, balance, notes, created_at, is_active }, index: number) => (
              <TableRow key={id}>
                <TableCell>{accountSerial(index)}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{number}</TableCell>
                <TableCell>{balance}</TableCell>
                <TableCell>{notes}</TableCell>
                <TableCell>{formatDate(created_at)}</TableCell>
                <TableCell>
                  <StatusUpdate
                    isActive={is_active == 1 ? true : false}
                    url={`${ACCOUNTS.PUT.STATUS_UPDATE}/${id}`}
                    tags={ACCOUNTS.GET.TAGS}
                  />
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <AddAccount
                    title="Edit Account"
                    data={{
                      id,
                      name,
                      number,
                      balance,
                      notes,
                    }}
                  >
                    <Button variant="white" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </AddAccount>
                  {/* <DeleteButton
                    url={`${ACCOUNTS.DELETE}/${id}`}
                    tags={ACCOUNTS.GET.TAGS}
                  /> */}
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default AccountsTable;
