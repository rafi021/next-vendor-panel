import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';
import { Label } from '../ui/label';
import SelectorWithSearch from '../common/forms/SelectorWithSearch';

import { SmsTemplate, Templates, TemplatesData } from '@/types/sms';
import { api } from '@/server/api';
import { CUSTOMER_PROMOTIONAL_SMS, SMS_TEMPLATES } from '@/server/services/sms';
import { useEffect, useState, useCallback, useTransition } from 'react';
import { toast } from 'sonner';

type SmsSendProps = {
  smsCatData: SmsTemplate[];
  selectedOrder: number[];
};

const SmsSendComponent = ({ smsCatData, selectedOrder }: SmsSendProps) => {
  const [smsTemplatesList, setSmsTemplatesList] = useState<Templates[]>();
  const [selectedSmsCat, setSelectedSmsCat] = useState<SmsTemplate>();
  const [selectedSmsTemplate, setSelectedSmsTemplate] = useState<Templates>();
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const fetchSmsTemplates = useCallback(async (categoryId: string) => {
    try {
      const res = await api.get<ApiResponse<TemplatesData>>(
        `${SMS_TEMPLATES.GET.SMS_TEMPLATES.URL}?category_id=${categoryId}`,
        SMS_TEMPLATES.GET.SMS_TEMPLATES.TAGS,
      );

      startTransition(() => {
        if (res.success) {
          setSmsTemplatesList(res.data.data);
        } else {
          setSmsTemplatesList([]);
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message ?? 'Something went wrong');
      } else {
        toast.error('Something went wrong');
      }
    }
  }, []);

  useEffect(() => {
    if (selectedSmsCat?.id) {
      fetchSmsTemplates(String(selectedSmsCat.id));
      setSelectedSmsTemplate(undefined);
    }
  }, [selectedSmsCat, fetchSmsTemplates]);

  const handleCategoryChange = (val: string) => {
    startTransition(() => {
      const foundItem = smsCatData.find((item) => String(item.id) === val);
      setSelectedSmsCat(foundItem);
    });
  };

  const handleTemplateChange = (val: string) => {
    startTransition(() => {
      const foundTemplate = smsTemplatesList?.find(
        (item) => String(item.id) === val,
      );
      setSelectedSmsTemplate(foundTemplate);
    });
  };

  const handleSmsSendSubmit = async () => {
    startTransition(async () => {
      if (!selectedSmsCat || !selectedSmsTemplate) {
        toast.error('❌Cannot send SMS');
      }
      const payload = {
        customer_ids: [...selectedOrder],
        message: selectedSmsTemplate?.description,
      };
      const res = await api.post(CUSTOMER_PROMOTIONAL_SMS.POST.URL, payload);
      if (res.success) {
        toast.success(
          '✅SMS is in queue for sending to the selected customers.',
        );
        setOpen(false);
      } else {
        toast.error(res.message ?? 'Something went wrong');
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-sm font-medium" variant={'outline'}>
          <Send size={16} /> Send Message
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Message</DialogTitle>
        </DialogHeader>

        <DialogDescription className="border-y border-gray-200 py-space16 space-y-space12">
          <span className="space-y-space6">
            <Label>Category</Label>
            <SelectorWithSearch
              value={String(selectedSmsCat?.id ?? '')}
              onChange={handleCategoryChange}
              options={smsCatData.map((cat) => ({
                label: cat.name,
                value: String(cat.id),
              }))}
              placeholder="Select Category"
              disable={isPending}
            />
          </span>

          <div className="space-y-space6">
            <Label>Select Template</Label>
            <SelectorWithSearch
              value={String(selectedSmsTemplate?.id ?? '')}
              onChange={handleTemplateChange}
              options={
                smsTemplatesList?.map((template) => ({
                  label: template.name,
                  value: String(template.id),
                })) ?? []
              }
              placeholder="Select Template"
              disable={!smsTemplatesList || isPending}
              loading={isPending}
            />
          </div>

          {selectedSmsTemplate && (
            <div className="border rounded bg-gray-200 p-2 text-black">
              {selectedSmsTemplate.description}
            </div>
          )}
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="white" className="w-full">
              Cancel
            </Button>
          </DialogClose>

          <Button
            className="w-full"
            onClick={handleSmsSendSubmit}
            disabled={!selectedSmsTemplate || isPending}
            loader={isPending}
          >
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SmsSendComponent;
