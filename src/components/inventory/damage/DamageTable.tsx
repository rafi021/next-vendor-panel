'use client';

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
import DeleteButton from '@/components/common/DeleteButton';
import { IDamageData } from '@/types/damage-interface';
import { DAMAGES } from '@/server/services/damage';

const DamageTable = ({
  damages,
  activePage,
  perPage,
}: {
  damages: IDamageData;
  activePage: number;
  perPage: number;
}) => {
  const damageSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Lost Type</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Reference</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {damages?.data?.map(
          ({ id, image, product, type, quantity, date, ref, notes }, index) => (
            <TableRow key={id}>
              <TableCell>{damageSerial(index)}</TableCell>
              <TableCell>
                <Image
                  src={image}
                  alt={product?.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-full w-full object-contain"
                  wrapperClasses="h-[32px] max-w-max"
                />
              </TableCell>
              <TableCell>{product?.name}</TableCell>
              <TableCell>{type}</TableCell>
              <TableCell>{quantity}</TableCell>
              <TableCell>{formatDate(date)}</TableCell>
              <TableCell>{ref}</TableCell>
              <TableCell>{notes}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                <DeleteButton
                  url={`${DAMAGES.DELETE}/${id}`}
                  tags={DAMAGES.GET.TAGS}
                />
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};

export default DamageTable;
