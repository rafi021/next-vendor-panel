'use client';

import { Button } from '@/components/ui/button';
import { BrandData } from '@/types/brands-interface';
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
import { Pencil } from 'lucide-react';
import DeleteButton from '@/components/common/DeleteButton';
import { BRANDS } from '@/server/services/brand';
import StoreBrand from './StoreBrand';
import StatusUpdate from '@/components/common/StatusUpdate';

const BrandTable = ({ brands, activePage, perPage }: { brands: BrandData;
  activePage: number;
  perPage: number;
}) => {
  const brandSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Total Products</TableHead>
          <TableHead>Created Date</TableHead>

          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brands.data.map(
          ({ id, image, name, products_count, created_at, is_active }, index) => (
            <TableRow key={id}>
              <TableCell>{brandSerial(index)}</TableCell>
              <TableCell>
                <Image
                  src={image}
                  alt={name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-full w-full object-contain"
                  wrapperClasses="h-[32px] max-w-max"
                />
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{products_count}</TableCell>
              <TableCell>{formatDate(created_at)}</TableCell>

              <TableCell>
                <StatusUpdate
                  tags={BRANDS.GET.BRANDS.TAGS}
                  isActive={is_active == 1 ? true : false}
                  url={`${BRANDS.PUT.BRAND_STATUS_UPDATE}/${id}`}
                />
              </TableCell>
              <TableCell className="flex gap-2 justify-end">
                <StoreBrand title="Edit Brand" data={{ id, name, image }}>
                  <Button variant="white" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </StoreBrand>

                <DeleteButton
                  url={`${BRANDS.DELETE.BRAND_DELETE}/${id}`}
                  tags={BRANDS.GET.BRANDS.TAGS}
                />
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};

export default BrandTable;
