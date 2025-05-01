import EmptyTableData from '@/components/common/EmptyTableData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Box, Plus } from 'lucide-react';
import Link from 'next/link';
import SmsTemplateCategoryTable from './SmsTemplateCategoryTable';
import SmsTemplateTable from './SmsTemplateTable';
import { SmsTemplate, Templates } from '@/types/sms';
import PaginateAction from '../common/PaginateAction';

type SmsTemplateProps = {
  smsCategories: SmsTemplate[];
  smsTemplates: PaginateType<Templates[]>;
};

const SmsTemplatePageWrapper = ({
  smsCategories,
  smsTemplates,
}: SmsTemplateProps) => {
  return (
    <div>
      <div className="py-space16 space-x-space12">
        <Link href={'/settings/sms'}>
          <Button
            className="text-sm font-medium border-none bg-transparent"
            type="button"
            variant={'white'}
          >
            SMS Templates
          </Button>
        </Link>
        <Button className="rounded-full text-sm font-medium" type="button">
          SMS Settings
        </Button>
      </div>
      <div className="space-y-space16 pb-space16">
        <SmsTemplateCategoryTable smsCategories={smsCategories} />

        <Card className=" mb-space16 p-space16">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-black">SMS Template</h2>
            <Link href={'/settings/sms/sms-templates/create-sms-template'}>
              <Button className="text-sm font-medium">
                <Plus size={15} />
                Create SMS Template
              </Button>
            </Link>
          </div>

          <div className="py-space12">
            {smsTemplates.data.length > 0 ? (
              <>
                <SmsTemplateTable smsTemplates={smsTemplates.data} />
                <PaginateAction
                  activePage={smsTemplates.current_page}
                  perPage={smsTemplates.per_page}
                  total={smsTemplates.total}
                  // onChange={() => {}}
                />
              </>
            ) : (
              <EmptyTableData
                title="There is no template created here yet!"
                placeholder={
                  <Box className="w-[90px] h-[90px] text-gray-500" />
                }
                description="Add template to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
                action={
                  <Link
                    href={'/settings/sms/sms-templates/create-sms-template'}
                  >
                    <Button className="text-sm font-medium" type="button">
                      <Plus size={16} />
                      <p>Create Template</p>
                    </Button>
                  </Link>
                }
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SmsTemplatePageWrapper;
