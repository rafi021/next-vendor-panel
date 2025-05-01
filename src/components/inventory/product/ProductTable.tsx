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
import StatusUpdate from '@/components/common/StatusUpdate';
import { IProductData } from '@/types/product-interface';
import {
  Box,
  CalendarDays,
  Circle,
  Codesandbox,
  Layers,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/common/Icon';
import { PRODUCT } from '@/server/services/product';
import Link from 'next/link';
import VariantsModal from './VariantsModal';

const ProductTable = ({
  products,
  activeIds,
  setActiveIds,
  activePage,
  perPage,
}: {
  products: IProductData;
  activeIds: number[];
  setActiveIds: (ids: number[]) => void;
  activePage: number;
  perPage: number;
}) => {
  const productSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <Table className="min-w-[1100px]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            <div className="flex items-center gap-space24">
              {/* <Checkbox
                id="all"
                checked={activeIds.length === products.data.length}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setActiveIds(products.data.map((row) => row.id));
                  } else {
                    setActiveIds([]);
                  }
                }}
              /> */}

              <span>#</span>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">
              <Box className="h-space16 w-space16" />
              Product Name
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">
              <Layers className="h-space16 w-space16" />
              Category
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">
              <Codesandbox className="h-space16 w-space16" />
              Variants
            </div>
          </TableHead>

          <TableHead>৳ Purchase</TableHead>
          <TableHead>৳ Selling</TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">
              <CalendarDays className="h-space16 w-space16" />
              Date
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">
              <Circle className="h-space16 w-space16" />
              Status
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
        {products.data.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>
              <div className="flex items-center gap-space24">
                {/* <Checkbox
                  id={String(row.id)}
                  checked={activeIds.includes(row.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setActiveIds([...activeIds, row.id]);
                    } else {
                      setActiveIds(activeIds.filter((id) => id !== row.id));
                    }
                  }}
                /> */}
                <span>{productSerial(index)}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-space12">
                <Image
                  src={row.thump_image}
                  alt={row.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-full w-full object-contain"
                  wrapperClasses="h-[36px] max-w-max"
                />
                <div className="line-clamp-1">{row.name}</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-space8 items-center line-clamp-1">
                {row.categories.map((category, idx) => (
                  <span key={category.id}>
                    {category.name} {row.categories.length - 1 !== idx && ','}
                  </span>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-space8 items-center">
                {row.product_type === 'simple' ? (
                  'Simple Product'
                ) : (
                  <VariantsModal variations={row.variation_options} />
                )}
              </div>
            </TableCell>

            <TableCell>
              {row.product_type === 'simple'
                ? `৳ ${row.purchase_price ?? ''}`
                : '---'}
            </TableCell>
            <TableCell>
              {row.product_type === 'simple'
                ? `৳ ${row.sell_price ?? ''}`
                : '---'}
            </TableCell>
            <TableCell>{formatDate(row.created_at)}</TableCell>

            <TableCell>
              <StatusUpdate
                tags={PRODUCT.GET.PRODUCTS.TAGS}
                isActive={row.is_active == 1 ? true : false}
                url={`${PRODUCT.PUT.PRODUCT_STATUS_UPDATE}/${row.id}`}
              />
            </TableCell>
            <TableCell>
              <div className="flex justify-end">
                <Link href={`/product/edit/${row.id}`}>
                  <Button variant="transparent" size={'icon'}>
                    <Icon icon="mage:edit" width="24" height="24" />
                  </Button>
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
