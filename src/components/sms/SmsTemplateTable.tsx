'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { SquarePen, Trash2 } from 'lucide-react';
import { Templates } from '@/types/sms';
import StatusUpdate from '../common/StatusUpdate';
import { SMS_TEMPLATES } from '@/server/services/sms';
import DeleteButton from '../common/DeleteButton';
import Link from 'next/link';

const SmsTemplateTable = ({ smsTemplates }: { smsTemplates: Templates[] }) => {
  return (
    <Table className="min-w-[1100px]">
      <TableHeader className="bg-gray-100 !rounded-t-lg">
        <TableRow className="">
          <TableHead className="w-[100px]">
            <div className="flex items-center gap-space24">
              <span># SL</span>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">Title</div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">Category</div>
          </TableHead>

          <TableHead>
            <div className="flex items-center gap-space4">Description</div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">Status</div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">Actions</div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {smsTemplates.map((row, index) => (
          <TableRow key={row.id} className="!border-b !border-gray-200">
            <TableCell>
              <div className="flex items-center gap-space24">
                <span>{index + 1}</span>
              </div>
            </TableCell>

            <TableCell>
              <div className="flex flex-wrap gap-space8 items-center line-clamp-1">
                {row.name}
              </div>
            </TableCell>

            <TableCell>{row?.category?.name}</TableCell>
            <TableCell>{row.description}</TableCell>
            <TableCell>
              <StatusUpdate
                isActive={row.is_active === 1}
                url={`${SMS_TEMPLATES.PUT.SMS_TEMPLATES_STATUS_UPDATE}/${row.id}`}
                tags={SMS_TEMPLATES.GET.SMS_TEMPLATES.TAGS}
              />
            </TableCell>
            <TableCell className="space-x-space12">
              <Link href={`/settings/sms/sms-templates/update/${row.id}`}>
                <Button variant={'transparent'} className="!p-0" type="button">
                  <SquarePen />
                </Button>
              </Link>
              <DeleteButton
                url={`${SMS_TEMPLATES.DELETE.SMS_TEMPLATES_DELETE}/${row.id}`}
                tags={SMS_TEMPLATES.GET.SMS_TEMPLATES.TAGS}
                title={`Delete ${row.name}`}
                description="Are you sure you want to delete this template? This action cannot be undone."
              >
                <Button variant={'transparent'} className="!p-0" type="button">
                  <Trash2 />
                </Button>
              </DeleteButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SmsTemplateTable;
