import * as z from 'zod';

// Dynamic schema generation based on settings
export const createSiteSettingsSchema = (siteSettings: { key: string }[]) => {
  let schemaObj: Record<string, z.ZodTypeAny> = {};

  siteSettings.forEach(({ key }) => {
    schemaObj[key] = z.string().optional();
  });

  return z.object(schemaObj);
};

export type SiteSettingsFormValues = z.infer<
  ReturnType<typeof createSiteSettingsSchema>
>;
