import SelectorWithSearch from '@/components/common/forms/SelectorWithSearch';
import ImageDropify from '@/components/common/ImageDropify';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SiteSettingsFormValues } from '@/schemas/settings/settings-schema';
import { IAccountsData } from '@/types/accounts-interface';
import { UseFormReturn } from 'react-hook-form';

const AccountsForm = ({
  form,
  accounts,
}: {
  form: UseFormReturn<SiteSettingsFormValues>;
  accounts: IAccountsData;
}) => {
  return (
    <div className="overflow-auto max-h-[400px] bg-white px-space24">
      <div className="gap-space24 flex flex-col">
        <div className="space-y-space6">
          <Label htmlFor="default_account" className="capitalize">
            Default Account
          </Label>

          <SelectorWithSearch
            value={form.watch('default_account')}
            onChange={(val) => {
              // // console.log('val from selector => ', val);
              form.setValue('default_account', val);
            }}
            options={accounts.data.map((ac) => ({
              label: ac.name,
              value: String(ac.id),
            }))}
            placeholder="Select default account"
          />
        </div>
        <div className="space-y-space6">
          <Label htmlFor="payment_method" className="capitalize">
            Payment Method
          </Label>
          <Input disabled readOnly value={'CASH'} onChange={(val) => {}} />
        </div>
      </div>
    </div>
  );
};

export default AccountsForm;
