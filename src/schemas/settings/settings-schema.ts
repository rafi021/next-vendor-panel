import { z } from 'zod';

// Statuses and notificationSchema assumed to be defined earlier
export const statuses = [
  'pending',
  'on_hold',
  'approved',
  'shipped',
  'delivered',
  'returned',
  'paid_returned',
  'cancelled',
] as const;

export type StatusKey = (typeof statuses)[number];

const notificationSchema = z.object({
  is_notify: z.boolean(),
  sms_category_id: z.string().optional().nullable(),
  sms_template_id: z.string().optional().nullable(),
});

const KeyValueSchema = z.object({
  key: z.string().min(1, 'Name of the shipping type is required'),
  value: z.coerce
    .number()
    .nonnegative({ message: 'Must be a positive number' }),
});

export const siteSettingsSchema = z
  .object({
    // Shop Settings
    site_name: z.string().optional(),
    store_domain_name: z.string().optional(),
    site_email: z.string().email().optional(),
    site_phone: z.string().optional(),
    site_address: z.string().optional(),
    site_slogan: z.string().optional(),
    special_message: z.string().optional(),
    site_facebook: z.string().optional(),
    site_twitter: z.string().optional(),
    site_instagram: z.string().optional(),
    site_youtube: z.string().optional(),
    site_tiktok: z.string().optional(),
    site_whatsapp: z.string().optional(),

    // images
    site_color_logo: z.string().optional(),
    site_payment_logo: z.string().optional(),
    site_bw_logo: z.string().optional(),

    // accounts and payments
    default_account: z.string(),

    // Marketing
    google_analytics: z.string().optional(),
    google_domain_verification: z.string().optional(),
    google_body_tag: z.string().optional(),
    google_merchant_code: z.string().optional(),
    facebook_pixel_code: z.string().optional(),
    facebook_domain_verification: z.string().optional(),
    pinterest_pixel_code: z.string().optional(),
    tiktok_pixel_code: z.string().optional(),

    // Courier (Pathao)
    pathao_username: z.string().optional(),
    pathao_password: z.string().optional(),
    pathao_store_id: z.string().optional(),
    pathao_secret_id: z.string().optional(),
    pathao_clinet_id: z.string().optional(),
    pathao_grant_type: z.string().optional(),
    pathao_base_url: z.string().optional(),
    pathao_webhook_url: z.string().optional(),
    pathao_webhook_secret: z.string().optional(),

    // Key-Value Entry (e.g. delivery area pricing)
    // shipping_costs: z.array(KeyValueSchema).optional().default([]),
    shipping_costs: z
      .array(KeyValueSchema)
      .optional()
      .default([])
      .superRefine((costs, ctx) => {
        costs.forEach((cost, index) => {
          if (!cost.key.trim()) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Shipping type name is required.',
              path: [index, 'key'], // points to shipping_costs[index].key
            });
          }
        });
      }),

    // Customer SMS Notification
    customer_sms_notification: z
      .object(
        Object.fromEntries(
          statuses.map((key) => [key, notificationSchema]),
        ) as Record<StatusKey, typeof notificationSchema>,
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.customer_sms_notification) return;

    for (const key of statuses) {
      const item = data.customer_sms_notification[key];

      if (
        item?.is_notify &&
        (item.sms_template_id === null || item.sms_template_id === '')
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'SMS Template is required when notify is ON.',
          path: ['customer_sms_notification', key, 'sms_template_id'],
        });
      }
    }
  });

export type SiteSettingsFormValues = z.infer<typeof siteSettingsSchema>;

function fillMissingStatuses(
  existing: unknown,
): SiteSettingsFormValues['customer_sms_notification'] {
  const safe =
    typeof existing === 'object' && existing !== null ? existing : {};

  const result = {} as Record<
    StatusKey,
    {
      is_notify: boolean;
      sms_template_id: string | null;
      sms_category_id: string | null;
    }
  >;

  for (const status of statuses) {
    const statusValue = (safe as Record<string, any>)[status];
    result[status] = {
      is_notify: !!statusValue?.is_notify,
      sms_category_id: statusValue?.sms_category_id ?? null,
      sms_template_id: statusValue?.sms_template_id ?? null,
    };
  }

  return result;
}

export function mapApiDataToDefaultValues(
  apiData: { key: keyof SiteSettingsFormValues; value: any }[],
): SiteSettingsFormValues {
  const defaultValues: Partial<SiteSettingsFormValues> = {};

  const schemaShape = (siteSettingsSchema._def.schema as z.ZodObject<any>)
    .shape;
  const schemaKeys = Object.keys(
    schemaShape,
  ) as (keyof SiteSettingsFormValues)[];

  for (const { key, value } of apiData) {
    if (key === 'customer_sms_notification') {
      defaultValues.customer_sms_notification = fillMissingStatuses(value);
    } else if (key === 'shipping_costs' && Array.isArray(value)) {
      defaultValues.shipping_costs = value.reduce<
        { key: string; value: number }[]
      >((acc, item) => {
        if (typeof item.key === 'string' && typeof item.value === 'number') {
          acc.push({ key: item.key, value: item.value });
        }
        return acc;
      }, []);
    } else if (schemaKeys.includes(key)) {
      defaultValues[key] = value ?? getDefaultForKey(key);
    }
  }

  // Ensure important defaults are filled if missing
  if (!defaultValues.customer_sms_notification) {
    defaultValues.customer_sms_notification = fillMissingStatuses(null);
  }
  if (!defaultValues.shipping_costs) {
    defaultValues.shipping_costs = [];
  }

  return defaultValues as SiteSettingsFormValues;
}

function getDefaultForKey<Key extends keyof SiteSettingsFormValues>(
  key: Key,
): SiteSettingsFormValues[Key] {
  const defaults: Partial<SiteSettingsFormValues> = {
    site_name: '',
    // Add more defaults per key if needed
  };

  return (defaults[key] ?? '') as SiteSettingsFormValues[Key];
}
