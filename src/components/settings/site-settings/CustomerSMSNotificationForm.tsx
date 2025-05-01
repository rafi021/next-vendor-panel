'use client';

import { Controller, UseFormReturn } from 'react-hook-form';
import clsx from 'clsx';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import SelectorWithSearch from '@/components/common/forms/SelectorWithSearch';

import { SiteSettingsFormValues } from '@/schemas/settings/settings-schema';

import { SmsTemplate, Templates, TemplatesData } from '@/types/sms';
import { api } from '@/server/api';
import { SMS_TEMPLATES } from '@/server/services/sms';
import { useEffect, useState, useCallback, useTransition } from 'react';

const statuses = [
  'pending',
  'on_hold',
  'approved',
  'shipped',
  'delivered',
  'returned',
  'paid_returned',
  'cancelled',
] as const;

type StatusKey = (typeof statuses)[number];

type Props = {
  form: UseFormReturn<SiteSettingsFormValues>;
  smsCatData: SmsTemplate[];
};

const SmsSelectForm = ({
  status,
  form,
  smsCatData,
}: {
  status: StatusKey;
  form: UseFormReturn<SiteSettingsFormValues>;
  smsCatData: SmsTemplate[];
}) => {
  const [smsTemplatesList, setSmsTemplatesList] = useState<Templates[]>([]);
  const [selectedSmsCat, setSelectedSmsCat] = useState<SmsTemplate | null>(
    null,
  );
  const [selectedSmsTemplate, setSelectedSmsTemplate] =
    useState<Templates | null>(null);

  const [isPending, startTransition] = useTransition();

  const fetchSmsTemplates = useCallback(async (categoryId: string) => {
    try {
      const res = await api.get<ApiResponse<TemplatesData>>(
        `${SMS_TEMPLATES.GET.SMS_TEMPLATES.URL}?category_id=${categoryId}`,
        SMS_TEMPLATES.GET.SMS_TEMPLATES.TAGS,
      );

      if (res.success) {
        setSmsTemplatesList(res.data.data);
      } else {
        setSmsTemplatesList([]);
      }
    } catch {
      setSmsTemplatesList([]);
    }
  }, []);

  // Memoize watch calls outside render to avoid unnecessary re-renders
  const notifyValue = form.watch(
    `customer_sms_notification.${status}.is_notify`,
  );
  const smsCategoryId = form.watch(
    `customer_sms_notification.${status}.sms_category_id`,
  );
  const smsTemplateId = form.watch(
    `customer_sms_notification.${status}.sms_template_id`,
  );

  // Typed error for sms_template_id
  const error =
    form.formState.errors.customer_sms_notification?.[status]?.sms_template_id;

  // Sync selectedSmsCat with form state on mount & smsCategoryId change
  useEffect(() => {
    if (smsCategoryId) {
      const found =
        smsCatData.find((cat) => String(cat.id) === String(smsCategoryId)) ??
        null;
      setSelectedSmsCat(found);
    } else {
      setSelectedSmsCat(null);
      setSmsTemplatesList([]);
    }
  }, [smsCategoryId, smsCatData]);

  // Fetch templates when selectedSmsCat changes
  useEffect(() => {
    if (selectedSmsCat?.id) {
      startTransition(() => {
        fetchSmsTemplates(String(selectedSmsCat.id));
      });
      setSelectedSmsTemplate(null);
    } else {
      setSmsTemplatesList([]);
      setSelectedSmsTemplate(null);
    }
  }, [selectedSmsCat, fetchSmsTemplates]);

  // Sync selectedSmsTemplate with form state on smsTemplateId change
  useEffect(() => {
    if (smsTemplateId) {
      const foundTemplate =
        smsTemplatesList.find((t) => String(t.id) === String(smsTemplateId)) ??
        null;
      setSelectedSmsTemplate(foundTemplate);
    } else {
      setSelectedSmsTemplate(null);
    }
  }, [smsTemplateId, smsTemplatesList]);

  return (
    <div
      key={status}
      className={clsx(
        'rounded-2xl p-4 flex flex-col gap-4 transition-shadow hover:shadow-sm h-auto',
        error
          ? 'bg-red-100 border border-red-200'
          : notifyValue
            ? 'bg-green-50 border border-green-100'
            : 'bg-slate-50/50 border border-slate-100/50',
      )}
    >
      <div className="flex items-center justify-between">
        <Label
          htmlFor={`${status}_notify`}
          className="capitalize font-medium text-base text-slate-700"
        >
          {status.replace(/_/g, ' ')}
        </Label>

        <Controller
          control={form.control}
          name={`customer_sms_notification.${status}.is_notify`}
          render={({ field }) => (
            <Switch
              id={`${status}_notify`}
              checked={!!field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="space-y-space6">
          <Label>Select SMS Category</Label>
          <SelectorWithSearch
            value={String(selectedSmsCat?.id ?? '')}
            onChange={(val) => {
              startTransition(() => {
                const foundItem =
                  smsCatData.find((item) => String(item.id) === val) ?? null;
                setSelectedSmsCat(foundItem);
              });
              form.setValue(
                `customer_sms_notification.${status}.sms_category_id`,
                val,
              );
            }}
            options={smsCatData.map((cat) => ({
              label: cat.name,
              value: String(cat.id),
            }))}
            placeholder="Select Category"
            disable={isPending || notifyValue === false}
          />
        </div>

        <div>
          <Label
            htmlFor={`${status}_template`}
            className="text-sm text-slate-600"
          >
            Select SMS Template
          </Label>

          <Controller
            control={form.control}
            name={`customer_sms_notification.${status}.sms_template_id`}
            render={({ field }) => (
              <SelectorWithSearch
                options={
                  smsTemplatesList.map((template) => ({
                    label: template.name,
                    value: String(template.id),
                  })) ?? []
                }
                value={String(selectedSmsTemplate?.id ?? '')}
                onChange={(val) => {
                  form.setValue(
                    `customer_sms_notification.${status}.sms_template_id`,
                    val,
                  );
                  startTransition(() => {
                    const foundTemplate =
                      smsTemplatesList.find(
                        (item) => String(item.id) === val,
                      ) ?? null;
                    setSelectedSmsTemplate(foundTemplate);
                  });
                }}
                disable={
                  !smsTemplatesList.length || isPending || notifyValue === false
                }
                loading={isPending}
                placeholder="Select Template"
              />
            )}
          />
        </div>

        {selectedSmsTemplate && (
          <div className="border rounded bg-gray-200 p-2 text-black">
            {selectedSmsTemplate.description}
          </div>
        )}

        {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
      </div>
    </div>
  );
};

const CustomerSMSNotificationForm = ({ form, smsCatData }: Props) => {
  return (
    <div className="max-h-[400px] overflow-auto bg-white px-6 py-4 rounded-xl shadow-md">
      <div className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statuses.map((status) => (
          <SmsSelectForm
            key={status}
            status={status}
            form={form}
            smsCatData={smsCatData ?? []}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerSMSNotificationForm;
