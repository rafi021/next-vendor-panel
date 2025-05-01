'use client';

import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/common/Image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/utils/date-format';
import AddDepositCategory from './AddDepositCategory';
import DeleteButton from '@/components/common/DeleteButton';
import StatusUpdate from '@/components/common/StatusUpdate';
import { DEPOSIT_CATEGORY } from '@/server/services/deposit-category';
import { IDepositCategory } from '@/types/deposit-category-interface';

const DepositCategoryTable = ({
  depositCategories,
  activePage,
  perPage,
}: {
  depositCategories: IDepositCategory[];
  activePage: number;
  perPage: number;
}) => {
  const depositCategorySerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Icon</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Deposit Amount</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {depositCategories?.map(
            ({
              id,
              name,
              icon,
              description,
              deposits_sum_amount,
              created_at,
              is_active,
            }, index: number) => (
              <TableRow key={id}>
                <TableCell>{depositCategorySerial(index)}</TableCell>
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
                <TableCell>{deposits_sum_amount}</TableCell>
                <TableCell>{formatDate(created_at)}</TableCell>
                <TableCell>
                  <StatusUpdate
                    isActive={is_active == 1 ? true : false}
                    url={`${DEPOSIT_CATEGORY.PUT.STATUS_UPDATE}/${id}`}
                    tags={DEPOSIT_CATEGORY.GET.TAGS}
                  />
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <AddDepositCategory
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
                  </AddDepositCategory>
                  <DeleteButton
                    url={`${DEPOSIT_CATEGORY.DELETE}/${id}`}
                    tags={DEPOSIT_CATEGORY.GET.TAGS}
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

export default DepositCategoryTable;
