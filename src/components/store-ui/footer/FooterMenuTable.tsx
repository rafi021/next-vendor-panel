'use client';

import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StoreFooterMenu from './StoreFooterMenu';
import DeleteButton from '@/components/common/DeleteButton';
import { FOOTER_MENUS } from '@/server/services/footer-menu';
import { FooterMenuItem } from '@/types/store-settings-interface';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PAGE_BUILDER } from '@/server/services/page-builder';

const FooterMenuTable = ({ data }: { data: FooterMenuItem[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ id, head, sub_head, url, priority }) => (
          <TableRow key={id}>
            <TableCell>{sub_head}</TableCell>
            <TableCell>{url}</TableCell>
            <TableCell>{priority}</TableCell>
            <TableCell className="flex gap-2 justify-end">
              <StoreFooterMenu
                title="Edit Footer Menu"
                data={{ id, head, sub_head, priority, url }}
              >
                <Button variant="white" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
              </StoreFooterMenu>

              <DeleteButton
                url={`${FOOTER_MENUS.DELETE.FOOTER_MENU_DELETE}/${id}`}
                tags={[
                  ...FOOTER_MENUS.GET.FOOTER_MENUS.TAGS,
                  ...FOOTER_MENUS.GET.FOOTER_MENU_SLUG_LIST.TAGS,
                  ...PAGE_BUILDER.GET.PAGE_BUILDER.TAGS,
                ]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FooterMenuTable;
