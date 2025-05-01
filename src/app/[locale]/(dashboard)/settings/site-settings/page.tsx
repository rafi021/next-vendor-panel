import { api } from '@/server/api';
import { SmsTemplateData } from '@/types/sms';
import { ACCOUNTS } from '@/server/services/accounts';
import { SMS_CATEGORIES } from '@/server/services/sms';
import { IAccountsData } from '@/types/accounts-interface';
import { SITE_SETTINGS } from '@/server/services/site-settings';
import { ISiteSettingsData } from '@/types/site-settings-interface';
import SiteSettingsPageWrapper from '@/components/settings/site-settings/SiteSettingsPageWrapper';

const SiteSettingsPage = async () => {
  const siteSettingsResponse = await api.get<ApiResponse<ISiteSettingsData>>(
    SITE_SETTINGS.GET.URL,
    SITE_SETTINGS.GET.TAGS,
  );

  const accounts = await api.get<ApiResponse<IAccountsData>>(
    ACCOUNTS.GET.URL,
    ACCOUNTS.GET.TAGS,
  );

  const siteSettingsData = siteSettingsResponse?.data?.data ?? [];

  const filteredSettings = siteSettingsData.filter(
    (item) => item.key !== 'product_card_type' && item.key !== 'style',
  );

  const smsCatData = await api.get<ApiResponse<SmsTemplateData>>(
    SMS_CATEGORIES.GET.SMS_CATEGORIES.URL,
    SMS_CATEGORIES.GET.SMS_CATEGORIES.TAGS,
  );

  return (
    <SiteSettingsPageWrapper
      siteSettings={filteredSettings}
      accounts={accounts?.data}
      smsCatData={smsCatData?.data?.data}
    />
  );
};

export default SiteSettingsPage;
