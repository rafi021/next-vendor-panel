import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SiteSettingsFormValues } from '@/schemas/settings/settings-schema';
import { UseFormReturn } from 'react-hook-form';

const MarketingSettingsForm = ({
  form,
}: {
  form: UseFormReturn<SiteSettingsFormValues>;
}) => {
  return (
    <div className="overflow-auto max-h-[400px] bg-white px-space24">
      <div className="min-w-[800px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-space24">
        {[
          ['google_analytics', 'google_analytics'],
          ['google_domain_verification', 'google_domain_verification'],
          ['google_body_tag', 'google_body_tag'],
          ['google_merchant_code', 'google_merchant_code'],
          ['facebook_pixel_code', 'facebook_pixel_code'],
          ['facebook_domain_verification', 'facebook_domain_verification'],
          ['pinterest_pixel_code', 'pinterest_pixel_code'],
          ['tiktok_pixel_code', 'tiktok_pixel_code'],
        ].map(([key, label]) => (
          <div key={key}>
            <Label htmlFor={key} className="capitalize">
              {label.split('_').join(' ')}
            </Label>
            <Input
              id={key}
              {...form.register(key as keyof SiteSettingsFormValues)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketingSettingsForm;
