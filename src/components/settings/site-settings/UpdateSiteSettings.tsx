'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { api } from '@/server/api';
import { toast } from 'sonner';
import { useMemo, useTransition } from 'react';
import { ISiteSettings } from '@/types/site-settings-interface';
import {
  createSiteSettingsSchema,
  SiteSettingsFormValues,
} from '@/schemas/settings/site-settings';
import { SITE_SETTINGS } from '@/server/services/site-settings';
import ImageDropify from '@/components/common/ImageDropify';
import { IAccountsData } from '@/types/accounts-interface';
import SelectorWithSearch from '@/components/common/forms/SelectorWithSearch';
import { Textarea } from '@/components/ui/textarea';

const UpdateSiteSettings = ({
  siteSettings,
  accountsList,
}: {
  siteSettings?: ISiteSettings[];
  accountsList: IAccountsData;
}) => {
  const [isLoading, startTransition] = useTransition();

  const initialValues =
    siteSettings?.reduce(
      (acc, { key, value }) => ({
        ...acc,
        [key]: value?.toString(),
      }),
      {},
    ) || {};

  const schema = createSiteSettingsSchema(siteSettings || []);

  const form = useForm<SiteSettingsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit = async (data: SiteSettingsFormValues) => {
    startTransition(async () => {
      try {
        const res = await api.post(
          SITE_SETTINGS.POST,
          data,
          SITE_SETTINGS.GET.TAGS,
        );

        if (res.success) {
          toast.success('Settings updated successfully');
        } else {
          toast.error(res.message || 'Failed to update settings');
        }
      } catch (error) {
        toast.error('An error occurred while updating settings');
      }
    });
  };

  const handleReset = () => {
    form.reset(initialValues);
  };

  const groupedSettings = useMemo(() => {
    if (!siteSettings) return [];

    const groups = [
      {
        key: 'general_settings',
        keys: [
          'site_name',
          'site_address',
          'site_phone',
          'site_email',
          'special_message',
          'site_slogan',
          'store_domain_name',
          'google_merchant_code',
          'tiktok_pixel_code',
          'pinterest_pixel_code',
          'shipping_costs',
        ],
      },
      {
        key: 'site_images',
        keys: ['site_bw_logo', 'site_color_logo', 'site_payment_logo'],
      },
      {
        key: 'social_links',
        keys: [
          'site_whatsapp',
          'site_facebook',
          'site_instagram',
          'site_twitter',
          'site_youtube',
          'site_tiktok',
        ],
      },
      {
        key: 'tax_and_delivery',
        keys: ['inside_dhaka_cost', 'outside_dhaka_cost'],
      },
      {
        key: 'accounts_and_payment',
        keys: ['default_account', 'payment_method'],
      },
      {
        key: 'pathao_settings',
        keys: [
          'pathao_username',
          'pathao_password',
          'pathao_store_id',
          'pathao_secret_id',
          'pathao_clinet_id',
          'pathao_grant_type',
          'pathao_base_url',
          'pathao_webhook_url',
          'pathao_webhook_secret',
        ],
      },
      {
        key: 'marketing_information',
        keys: [
          'facebook_pixel_code',
          'google_analytics',
          'facebook_domain_verification',
          'google_domain_verification',
          'google_body_tag',
        ],
      },
    ];

    return groups.map(({ key, keys }) => {
      const values = keys
        .map((k) => {
          const setting = siteSettings.find((s) => s.key === k);
          return setting ? { key: setting.key, value: setting.value } : null;
        })
        .filter(Boolean);
      return { key, values };
    });
  }, [siteSettings]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-space16 py-space12">
          {groupedSettings.map(({ key: groupKey, values }) => (
            <div
              key={groupKey}
              className="border p-space12 rounded-md space-y-space12"
            >
              <h3 className="text-lg font-medium capitalize mb-space8">
                {groupKey.replace(/_/g, ' ')}
              </h3>
              <div className="flex gap-space12 flex-wrap">
                {values.map((val, index) => {
                  if (val?.key === 'default_account') {
                    return (
                      <FormField
                        key={val.key}
                        control={form.control}
                        name={val.key}
                        render={({ field }) => (
                          <FormItem className="w-full sm:w-[48%]">
                            <FormLabel>
                              {val.key.replace(/_/g, ' ').toUpperCase()}
                            </FormLabel>
                            <FormControl>
                              <SelectorWithSearch
                                value={field.value}
                                onChange={(val) =>
                                  form.setValue('default_account', val)
                                }
                                options={accountsList.data.map((ac) => ({
                                  label: ac.name,
                                  value: String(ac.id),
                                }))}
                                placeholder="Select default account"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  }

                  if (
                    val?.key === 'facebook_pixel_code' ||
                    val?.key === 'google_analytics'
                  ) {
                    return (
                      <FormField
                        key={val.key}
                        control={form.control}
                        name={val.key}
                        render={({ field }) => (
                          <FormItem className="w-full sm:w-[48%]">
                            <FormLabel>
                              {val?.key.replace(/_/g, ' ').toUpperCase()}
                            </FormLabel>
                            <FormControl>
                              <Textarea {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  }

                  if (
                    val?.key &&
                    [
                      'site_bw_logo',
                      'site_color_logo',
                      'site_payment_logo',
                    ].includes(val?.key)
                  ) {
                    return (
                      <FormField
                        key={val?.key}
                        control={form.control}
                        name={val?.key ?? ''}
                        render={({ field }) => (
                          <FormItem className="sm:w-[30%] w-full">
                            <FormLabel>
                              {val?.key.replace(/_/g, ' ').toUpperCase()}
                            </FormLabel>
                            <FormControl>
                              <ImageDropify
                                image={field.value ?? ''}
                                setImage={(img) => field.onChange(img)}
                                remove
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  }

                  return (
                    <FormField
                      key={val?.key}
                      control={form.control}
                      name={val?.key ?? ''}
                      render={({ field }) => (
                        <FormItem className="w-full sm:w-[48%]">
                          <FormLabel>
                            {val?.key.replace(/_/g, ' ').toUpperCase()}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={
                                val?.key === 'payment_method'
                                  ? 'CASH'
                                  : (field.value ?? '')
                              }
                              disabled={val?.key === 'payment_method'}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 py-space12 mt-space12">
          <div className="flex gap-space12 sm:w-1/2">
            <Button
              variant="white"
              type="button"
              onClick={handleReset}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" loader={isLoading} disabled={isLoading}>
              Update Site Settings
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UpdateSiteSettings;
