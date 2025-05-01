import { api } from '@/server/api';
import { SmsTemplateData, Templates } from '@/types/sms';
import SmsTemplateForm from '@/components/sms/SmsTemplateForm';
import { SMS_CATEGORIES, SMS_TEMPLATES } from '@/server/services/sms';

const UpdateSmsTemplate = async ({
  params,
}: {
  params: Promise<{ smsTemplateId: number }>;
}) => {
  const { smsTemplateId } = await params;

  const smsData = await api.get<ApiResponse<Templates>>(
    `${SMS_TEMPLATES.GET.SMS_TEMPLATES_DETAILS.URL}/${smsTemplateId}`,
    SMS_TEMPLATES.GET.SMS_TEMPLATES_DETAILS.TAGS,
  );
  const smsCatData = await api.get<ApiResponse<SmsTemplateData>>(
    SMS_CATEGORIES.GET.SMS_CATEGORIES.URL,
    SMS_CATEGORIES.GET.SMS_CATEGORIES.TAGS,
  );
  return (
    <SmsTemplateForm
      smsCatData={smsCatData?.data?.data}
      data={smsData?.data}
      title="Update SMS Template"
    />
  );
};

export default UpdateSmsTemplate;
