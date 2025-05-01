'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Home, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';

import {
  mapApiDataToDefaultValues,
  SiteSettingsFormValues,
  siteSettingsSchema,
} from '@/schemas/settings/settings-schema';
import { ISiteSettings } from '@/types/site-settings-interface';
import { IAccountsData } from '@/types/accounts-interface';

import MarketingSettingsForm from './MarketingSettingsForm';
import CourierSettingsForm from './CourierSettingsForm';
import CustomerSMSNotificationForm from './CustomerSMSNotificationForm';
import ShippingCostSettingsForm from './ShippingCostSettingsForm';
import ImagesForm from './ImagesForm';
import AccountsForm from './AccountsForm';
import { ShopSettingsForm } from './ShopSettingsForm';
import { SmsTemplate } from '@/types/sms';
import { FieldErrors } from 'react-hook-form';
import { api } from '@/server/api';
import { SITE_SETTINGS } from '@/server/services/site-settings';

const tabs = [
  { name: 'General Settings', value: 'general-settings', icon: Home },
  { name: 'Site Images', value: 'site-images', icon: User },
  { name: 'Accounts and Payment', value: 'accounts-and-payment', icon: User },
  { name: 'Marketing', value: 'marketing', icon: User },
  { name: 'Courier', value: 'courier', icon: Bot },
  { name: 'Delivery charge', value: 'delivery-charge', icon: Settings },
  {
    name: 'Customer SMS Notifications',
    value: 'customer-sms-notifications',
    icon: Settings,
  },
];

const SiteSettingsPageWrapper = ({
  siteSettings,
  accounts,
  smsCatData,
}: {
  siteSettings: ISiteSettings[];
  accounts: IAccountsData;
  smsCatData: SmsTemplate[];
}) => {
  const defaultValues = useMemo(
    () =>
      mapApiDataToDefaultValues(
        siteSettings.map((setting) => ({
          key: setting.key as keyof SiteSettingsFormValues,
          value: setting.value,
        })),
      ),
    [siteSettings],
  );

  const form = useForm<SiteSettingsFormValues>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues,
  });

  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [isLoading, startTransition] = useTransition();
  const activeTabData = useMemo(
    () => tabs.find((t) => t.value === activeTab),
    [activeTab],
  );
  const ActiveIcon = activeTabData?.icon;

  // const onSubmit = (formData: SiteSettingsFormValues) => {
  //   // console.log('🚀 Final Submitted Settings:', formData);
  //   // console.log('errors:', form.formState.errors);
  //   toast.success('Settings saved successfully!');
  // };

  const onSubmit = async (data: SiteSettingsFormValues) => {
    startTransition(async () => {
      try {
        // // console.log('🚀 Final Submitted Settings:', data);
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

  function useFormErrorToast<T extends Record<string, any>>(form: {
    formState: { errors: FieldErrors<T> };
  }) {
    // // console.log('errors => ', form.formState.errors);
    useEffect(() => {
      const errors = form.formState.errors;
      if (!errors || Object.keys(errors).length === 0) return;

      const getMessages = (errs: FieldErrors<any>): string[] => {
        let msgs: string[] = [];

        if (!errs || typeof errs !== 'object') {
          return msgs;
        }

        for (const val of Object.values(errs)) {
          if (val && typeof val === 'object') {
            const maybeError = val as {
              message?: string;
              types?: Record<string, string>;
            };

            if (maybeError.message) {
              msgs.push(maybeError.message);
            } else {
              msgs = msgs.concat(getMessages(val as FieldErrors<any>));
            }

            if (maybeError.types) {
              msgs = msgs.concat(Object.values(maybeError.types));
            }
          }
        }

        return msgs;
      };

      const messages = Array.from(new Set(getMessages(errors)));

      messages.forEach((msg) => {
        toast.error(msg);
      });
    }, [form.formState.errors]);
  }

  useFormErrorToast(form);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="w-full mx-auto shadow-md mt-space12 overflow-hidden relative">
          {/* Header */}
          <div className="border-b p-4 md:p-6 sticky top-0 bg-white z-20">
            <h1 className="text-xl font-semibold">Update Site Settings</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your site configuration and preferences
            </p>
          </div>

          {/* Tabs */}
          <div className="p-4 md:p-6 pb-[80px]">
            <Tabs
              orientation="vertical"
              defaultValue={tabs[0].value}
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex flex-col md:flex-row gap-6"
            >
              {/* Mobile */}
              <div className="md:hidden w-full">
                <TabsList className="grid grid-cols-4 w-full p-1 gap-1">
                  {tabs.map((tab, indx) => (
                    <TabsTrigger
                      key={`mobile-${tab.value}-${indx}`}
                      value={tab.value}
                      className="flex flex-col items-center justify-center px-2 rounded-lg"
                    >
                      <tab.icon className="h-4 w-4 mb-1.5" />
                      <span className="text-xs hidden sm:block">
                        {tab.name}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Desktop */}
              <div className="hidden md:block">
                <TabsList className="flex flex-col h-auto bg-white p-2 space-y-space8">
                  {tabs.map((tab, indx) => (
                    <TabsTrigger
                      key={`desktop-${tab.value}-${indx}`}
                      value={tab.value}
                      className={cn(
                        'justify-start gap-3 px-4 py-space12 text-left rounded-lg w-full',
                        'hover:bg-gray-100',
                        'data-[state=active]:bg-blue-600 data-[state=active]:text-white',
                      )}
                    >
                      <tab.icon className="h-5 w-5" />
                      <span>{tab.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Content */}
              <div className="flex-1 border w-full h-full rounded-md relative">
                <div className="h-[500px] pr-4">
                  <div className="px-space12 py-space24 border-b">
                    <div className="flex items-center gap-space6">
                      {ActiveIcon && (
                        <ActiveIcon className="h-5 w-5 text-blue-600" />
                      )}
                      <h2 className="text-md font-medium">
                        {activeTabData?.name}
                      </h2>
                    </div>
                    <p className="text-gray-500 text-xs">
                      {activeTabData?.value ?? 'Configure settings'}
                    </p>
                  </div>

                  {tabs.map((tab) => (
                    <TabsContent
                      key={tab.value}
                      value={tab.value}
                      className="overflow-auto"
                    >
                      {tab.value === 'general-settings' && (
                        <ShopSettingsForm form={form} />
                      )}
                      {tab.value === 'site-images' && (
                        <ImagesForm form={form} />
                      )}
                      {tab.value === 'accounts-and-payment' && (
                        <AccountsForm form={form} accounts={accounts} />
                      )}
                      {tab.value === 'marketing' && (
                        <MarketingSettingsForm form={form} />
                      )}
                      {tab.value === 'courier' && (
                        <CourierSettingsForm form={form} />
                      )}
                      {tab.value === 'delivery-charge' && (
                        <ShippingCostSettingsForm form={form} />
                      )}
                      {tab.value === 'customer-sms-notifications' && (
                        <CustomerSMSNotificationForm
                          form={form}
                          smsCatData={smsCatData}
                        />
                      )}
                    </TabsContent>
                  ))}
                </div>
              </div>
            </Tabs>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end z-30">
            <Button type="submit" disabled={isLoading} loader={isLoading}>
              Save All Settings
            </Button>
          </div>
        </Card>
      </form>
    </Form>
  );
};

export default SiteSettingsPageWrapper;
