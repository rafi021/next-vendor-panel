import { api } from '@/server/api';
import { SmsTemplateData, TemplatesData } from '@/types/sms';
import { SMS_CATEGORIES, SMS_TEMPLATES } from '@/server/services/sms';
import SmsTemplatePageWrapper from '@/components/sms/SmsTemplatePageWrapper';

const SmsTemplatesPage = async () => {
  const smsCatData = await api.get<ApiResponse<SmsTemplateData>>(
    SMS_CATEGORIES.GET.SMS_CATEGORIES.URL,
    [
      ...SMS_CATEGORIES.GET.SMS_CATEGORIES.TAGS,
      ...SMS_TEMPLATES.GET.SMS_TEMPLATES.TAGS,
    ],
  );

  const smsTemplatesData = await api.get<ApiResponse<TemplatesData>>(
    SMS_TEMPLATES.GET.SMS_TEMPLATES.URL,
    [
      ...SMS_CATEGORIES.GET.SMS_CATEGORIES.TAGS,
      ...SMS_TEMPLATES.GET.SMS_TEMPLATES.TAGS,
    ],
  );

  return (
    <SmsTemplatePageWrapper
      smsCategories={smsCatData?.data?.data}
      smsTemplates={smsTemplatesData?.data}
    />
  );
};

export default SmsTemplatesPage;
