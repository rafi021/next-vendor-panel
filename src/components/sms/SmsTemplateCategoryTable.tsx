'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Box, SquarePen, Trash2 } from 'lucide-react';
import EmptyTableData from '../common/EmptyTableData';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import SmsCategoryForm from './SmsCategoryForm';
import { SmsTemplate } from '@/types/sms';
import DeleteButton from '../common/DeleteButton';
import { SMS_CATEGORIES } from '@/server/services/sms';
import StatusUpdate from '../common/StatusUpdate';
import { Switch } from '../ui/switch';

type SmsTemplateProps = {
  smsCategories: SmsTemplate[];
};

const SmsTemplateCategoryTable = ({ smsCategories }: SmsTemplateProps) => {
  return (
    <Card className="py-space8 px-space16 overflow-y-auto">
      <div className="flex items-center justify-between py-space8">
        <h2 className="text-md font-medium text-black">
          SMS Template Category
        </h2>
        <SmsCategoryForm />
      </div>

      {smsCategories.length > 0 ? (
        <Table className="min-w-[1100px]">
          <TableHeader className="bg-gray-100 !rounded-t-lg">
            <TableRow className="">
              <TableHead className="w-[100px]">
                <div className="flex items-center gap-space24">
                  <Checkbox /> <span># SL</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-space4">
                  Category Name
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-space4">Status</div>
              </TableHead>

              <TableHead>
                <div className="flex items-center gap-space4">Action</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {smsCategories.map((row, index) => (
              <TableRow key={row.id} className="!border-b !border-gray-200">
                <TableCell>
                  <div className="flex items-center gap-space24">
                    <Checkbox
                      disabled={
                        row.name.toLocaleLowerCase() ===
                        'Promotion'.toLocaleLowerCase()
                      }
                    />
                    <span>{index + 1}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-wrap gap-space8 items-center line-clamp-1">
                    {row.name}
                  </div>
                </TableCell>

                <TableCell>
                  {row.name.toLocaleLowerCase() === 'promotion' ? (
                    <Switch disabled checked />
                  ) : (
                    <StatusUpdate
                      isActive={row.is_active === 1}
                      url={`${SMS_CATEGORIES.PUT.SMS_CATEGORIES_STATUS_UPDATE}/${row.id}`}
                      tags={SMS_CATEGORIES.GET.SMS_CATEGORIES.TAGS}
                    />
                  )}
                </TableCell>
                <TableCell className="space-x-space12">
                  {row.name.toLocaleLowerCase() === 'promotion' ? (
                    <p>N/A</p>
                  ) : (
                    <>
                      <SmsCategoryForm data={row}>
                        <Button
                          variant={'transparent'}
                          className="!p-0"
                          type="button"
                        >
                          <SquarePen />
                        </Button>
                      </SmsCategoryForm>
                      <DeleteButton
                        url={`${SMS_CATEGORIES.DELETE.SMS_CATEGORIES_DELETE}/${row.id}`}
                        tags={SMS_CATEGORIES.GET.SMS_CATEGORIES.TAGS}
                      >
                        <Button
                          variant={'transparent'}
                          className="!p-0"
                          type="button"
                        >
                          <Trash2 />
                        </Button>
                      </DeleteButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <EmptyTableData
          title="There is no template category created here yet!"
          placeholder={<Box className="w-[90px] h-[90px] text-gray-500" />}
          description="Add template category to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={<SmsCategoryForm />}
        />
      )}
    </Card>
  );
};

export default SmsTemplateCategoryTable;
