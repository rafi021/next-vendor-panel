'use client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { SiteSettingsFormValues } from '@/schemas/settings/settings-schema';
export function ShopSettingsForm({
  form,
}: {
  form: UseFormReturn<SiteSettingsFormValues>;
}) {
  return (
    <div className="overflow-auto max-h-[400px] bg-white px-space24">
      <div className="min-w-[800px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-space24">
        {[
          ['site_name', 'Site Name'],
          ['store_domain_name', 'Store Domain Name'],
          ['site_email', 'Support Email'],
          ['site_phone', 'Support Phone'],
          ['site_address', 'Address'],
        ].map(([key, label]) => (
          <div key={key}>
            <Label htmlFor={key}>{label}</Label>
            <Input
              id={key}
              {...form.register(key as keyof SiteSettingsFormValues)}
            />
          </div>
        ))}

        <div className="sm:col-span-2 md:col-span-3">
          <Label htmlFor="site_slogan">Slogan</Label>
          <Textarea id="site_slogan" {...form.register('site_slogan')} />
        </div>

        <div className="sm:col-span-2 md:col-span-3">
          <Label htmlFor="special_message">Special Message</Label>
          <Textarea
            id="special_message"
            {...form.register('special_message')}
          />
        </div>

        {[
          ['site_facebook', 'Facebook'],
          ['site_twitter', 'Twitter'],
          ['site_instagram', 'Instagram'],
          ['site_youtube', 'YouTube'],
          ['site_tiktok', 'TikTok'],
          ['site_whatsapp', 'WhatsApp'],
        ].map(([key, label]) => (
          <div key={key}>
            <Label htmlFor={key}>{label}</Label>
            <Input
              id={key}
              {...form.register(key as keyof SiteSettingsFormValues)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
