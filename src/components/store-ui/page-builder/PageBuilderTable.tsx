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
import DeleteButton from '@/components/common/DeleteButton';
import { Pencil } from 'lucide-react';
import { IPageBuilderData } from '@/types/page-builder-interface';
import { PAGE_BUILDER } from '@/server/services/page-builder';
import { Image } from '@/components/common/Image';
import Link from 'next/link';
import StatusUpdate from '@/components/common/StatusUpdate';

const PageBuilderTable = ({
  pageBuilderPages,
  activePage,
  perPage,
}: {
  pageBuilderPages: IPageBuilderData;
  activePage: number;
  perPage: number;
}) => {
  const pageBuilderSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (  
    <div className="px-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageBuilderPages?.data?.map((page, index) => (
            <TableRow key={page?.id}>
              <TableCell>{pageBuilderSerial(index)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-space8">
                  <Image
                    src={page?.image_url as string}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt={page?.footer_menu?.slug ?? page?.title}
                  />
                  {page?.title}
                </div>
              </TableCell>
              <TableCell>{page?.footer_menu?.slug}</TableCell>
              <TableCell>{page?.description.slice(0, 50)}</TableCell>
              <TableCell>
                <StatusUpdate
                  tags={PAGE_BUILDER.GET.PAGE_BUILDER.TAGS}
                  isActive={page?.is_active == 1 ? true : false}
                  url={`${PAGE_BUILDER.PUT.PAGE_BUILDER_UPDATE}/status/${page?.id}`}
                />
              </TableCell>
              <TableCell className="flex gap-2 justify-end">
                <Link
                  href={`/page-builder/update/${page?.footer_menu?.slug}`}
                >
                  <Button variant={'pagination'} size={'icon'}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>

                <DeleteButton
                  url={`${PAGE_BUILDER.DELETE.PAGE_BUILDER_DELETE}/${page?.id}`}
                  tags={PAGE_BUILDER.GET.PAGE_BUILDER.TAGS}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PageBuilderTable;
