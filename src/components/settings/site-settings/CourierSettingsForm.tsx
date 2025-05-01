import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SiteSettingsFormValues } from '@/schemas/settings/settings-schema';
import { UseFormReturn } from 'react-hook-form';

const CourierSettingsForm = ({
  form,
}: {
  form: UseFormReturn<SiteSettingsFormValues>;
}) => {
  return (
    <div className="overflow-auto max-h-[400px] bg-white px-space24">
      <div className="min-w-[800px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-space24">
        {[
          ['pathao_username', 'pathao_username'],
          ['pathao_password', 'pathao_password'],
          ['pathao_store_id', 'pathao_store_id'],
          ['pathao_secret_id', 'pathao_secret_id'],
          ['pathao_clinet_id', 'pathao_client_id'],
          ['pathao_grant_type', 'pathao_grant_type'],
          ['pathao_base_url', 'pathao_base_url'],
          ['pathao_webhook_url', 'pathao_webhook_url'],
          ['pathao_webhook_secret', 'pathao_webhook_secret'],
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

export default CourierSettingsForm;
