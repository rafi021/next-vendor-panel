'use client';
import { formatDate } from '@/utils/date-format';
import { NewsLetterData } from '@/types/store-settings-interface';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const NewsLetterTable = ({
  data,
  activePage,
  perPage,
}: {
  data: NewsLetterData;
  activePage: number;
  perPage: number;
}) => {
  const newsLetterSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[100px]">#</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Created Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.map(({ id, created_at, email, shop_id }, index: number) => (
          <TableRow key={id}>
            <TableCell>{newsLetterSerial(index)}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell className="flex gap-2 justify-end">
              {formatDate(created_at ?? '')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default NewsLetterTable;
