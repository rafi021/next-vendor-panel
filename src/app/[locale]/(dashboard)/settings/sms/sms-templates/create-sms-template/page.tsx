import { api } from '@/server/api';
import { SmsTemplateData } from '@/types/sms';
import { SMS_CATEGORIES } from '@/server/services/sms';
import SmsTemplateForm from '@/components/sms/SmsTemplateForm';

const page = async () => {
  const smsCatData = await api.get<ApiResponse<SmsTemplateData>>(
    SMS_CATEGORIES.GET.SMS_CATEGORIES.URL,
    SMS_CATEGORIES.GET.SMS_CATEGORIES.TAGS,
  );
  return <SmsTemplateForm smsCatData={smsCatData?.data?.data} />;
};

export default page;
