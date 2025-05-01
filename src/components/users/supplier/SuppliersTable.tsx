'use client';

import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/utils/date-format';
import { Image } from '@/components/common/Image';
import {
  Banknote,
  CalendarDays,
  Codesandbox,
  Pencil,
  Phone,
  User,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getStatusColor } from '@/utils/status-color';
import { SUPPLIERS } from '@/server/services/suppliers';
import { ISupplierData } from '@/types/supplier-interface';
import DeleteButton from '@/components/common/DeleteButton';
import PhoneComponent from '@/components/common/PhoneComponent';

const SupplierTable = ({
  suppliers,
  activePage,
  perPage,
}: {
  suppliers: ISupplierData;
  activePage: number;
  perPage: number;
}) => {
  const supplierSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };

  return (
    <Table className="min-w-[1100px]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            <div className="flex items-center gap-space24">
              <span>#</span>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">
              <User className="h-space16 w-space16" />
              Supplier Name
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">
              <Phone className="h-space16 w-space16" />
              Contact
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">
              <Codesandbox className="h-space16 w-space16" />
              Supplier Type
            </div>
          </TableHead>

          <TableHead>
            <div className="flex items-center gap-space4">
              <Banknote className="h-space16 w-space16" />
              Due Amount
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">
              <Banknote className="h-space16 w-space16" />
              Paid Amount
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">
              <CalendarDays className="h-space16 w-space16" />
              Due Date
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center justify-end gap-space4">
              <Zap className="h-space16 w-space16" />
              Action
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {suppliers?.data?.map((supplier, index: number) => (
          <TableRow key={supplier?.id}>
            <TableCell>
              <div className="flex flex-wrap gap-space8 items-center line-clamp-1">
                {supplierSerial(index)}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-space12">
                <Image
                  src={supplier?.avatar || '/avatar.webp'}
                  alt={supplier?.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-full w-full object-contain rounded-full"
                  wrapperClasses="h-[36px] max-w-max"
                />
                <div className="line-clamp-1">{supplier?.name}</div>
              </div>
            </TableCell>
            <TableCell>
              {supplier?.phone ? (
                <PhoneComponent phoneNumber={supplier?.phone} />
              ) : (
                <span>-</span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-space8 items-center">
                <Badge className={getStatusColor(supplier?.party_type)}>
                  {supplier?.party_type}
                </Badge>
              </div>
            </TableCell>
            <TableCell>{supplier?.due_amount}</TableCell>
            <TableCell>{supplier?.advance_amount}</TableCell>
            <TableCell>{formatDate(supplier?.due_date)}</TableCell>
            <TableCell>
              <div className="flex gap-2 justify-end">
                <Link href={`/suppliers/update/${supplier.id}`}>
                  <Button variant="white" size={'icon'}>
                    <Pencil className="h-4 w-4" />
                    {/* <Icon icon="mage:edit" width="24" height="24" /> */}
                  </Button>
                </Link>
                <DeleteButton
                  url={`${SUPPLIERS.DELETE}/${supplier.id}`}
                  tags={SUPPLIERS.GET.TAGS}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SupplierTable;
