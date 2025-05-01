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
import { ITagsData, ITag } from '@/types/tag-interface';
import { TAGS } from '@/server/services/tags';
import CreateProductTag from './CreateProductTag';
import { Badge } from '@/components/ui/badge';
import StatusUpdate from '@/components/common/StatusUpdate';

const TagsTable = ({
  tags,
  activePage,
  perPage,
}: {
  tags: ITagsData;
  activePage: number;
  perPage: number;
}) => {
  const tagSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Preview</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tags?.data?.map(
            (item: ITag, index: number) => {
              const { id, name, slug, text_color, bg_color, created_at, is_active } = item;
              return (
              <TableRow key={id}>
                <TableCell>{tagSerial(index)}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{slug}</TableCell>
                <TableCell>
                  <Badge
                    style={{
                      backgroundColor: bg_color,
                      color: text_color,
                    }}
                  >
                    {name}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(created_at ?? '')}</TableCell>
                <TableCell>
                  <StatusUpdate
                    tags={TAGS.GET.TAGS.TAGS}
                    isActive={is_active == 1 ? true : false}
                    url={`${TAGS.PUT.TAGS_UPDATE}/status/${id}`}
                  />
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <CreateProductTag
                    title="Edit Tag"
                    data={{ id, name, text_color, bg_color, is_active }}
                  >
                    <Button variant="white" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </CreateProductTag>

                  <DeleteButton
                    url={`${TAGS.DELETE.TAGS_DELETE}/${id}`}
                    tags={TAGS.GET.TAGS.TAGS}
                    />
                </TableCell>
                </TableRow>
                );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TagsTable;
