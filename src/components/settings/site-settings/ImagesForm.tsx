import ImageDropify from '@/components/common/ImageDropify';
import { Label } from '@/components/ui/label';
import { SiteSettingsFormValues } from '@/schemas/settings/settings-schema';
import { UseFormReturn } from 'react-hook-form';

const logoKeys = [
  'site_color_logo',
  'site_bw_logo',
  'site_payment_logo',
] as const;

const ImagesForm = ({
  form,
}: {
  form: UseFormReturn<SiteSettingsFormValues>;
}) => {
  return (
    <div className="overflow-auto max-h-[400px] bg-white px-space24">
      <div className="gap-space24 flex flex-col">
        {logoKeys.map((key) => (
          <div key={key} className="space-y-space6">
            <Label htmlFor={key} className="capitalize">
              {key.replace(/_/g, ' ')}
            </Label>
            <ImageDropify
              image={form.watch(key) ?? ''}
              setImage={(img) => form.setValue(key, img)}
              id={key}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesForm;
