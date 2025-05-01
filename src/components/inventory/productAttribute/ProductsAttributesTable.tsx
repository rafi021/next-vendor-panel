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
import ProductAttributeForm from './ProductAttributeForm';
import { Badge } from '@/components/ui/badge';
import { IProductAttributeData } from '@/types/attributes-interface';
import { ATTRIBUTES } from '@/server/services/attributes';
import StatusUpdate from '@/components/common/StatusUpdate';

const ProductsAttributesTable = ({
  productsAttributes,
  activePage,
  perPage,
}: {
  productsAttributes: IProductAttributeData;
  activePage: number;
  perPage: number;
}) => {
  const productAttributeSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="max-w-1/2 text-center">Options</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productsAttributes?.data?.map(
            ({ id, name, attribute_options, is_active }, index) => (
              <TableRow key={id}>
                <TableCell>{productAttributeSerial(index)}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>
                  <div className="flex gap-1 items-center justify-center">
                    {attribute_options.map((att) => (
                      <Badge key={att.id}>{att.value}</Badge>
                    ))}
                  </div>
                </TableCell>

                <TableCell>
                  <StatusUpdate
                    tags={ATTRIBUTES.GET.ATTRIBUTES.TAGS}
                    isActive={is_active == 1 ? true : false}
                    url={`${ATTRIBUTES.PUT.ATTRIBUTES_STATUS_UPDATE}/${id}`}
                  />
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <ProductAttributeForm
                    title="Edit Tag"
                    data={{ id, name, attribute_options }}
                  >
                    <Button variant="white" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </ProductAttributeForm>

                  <DeleteButton
                    url={`${ATTRIBUTES.DELETE.ATTRIBUTES_DELETE}/${id}`}
                    tags={ATTRIBUTES.GET.ATTRIBUTES.TAGS}
                  />
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsAttributesTable;
