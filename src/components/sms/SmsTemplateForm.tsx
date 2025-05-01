'use client';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Box, ChevronDown, Copy } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { api } from '@/server/api';
import { toast } from 'sonner';
import { SMS_CATEGORIES, SMS_TEMPLATES, TEST_SMS } from '@/server/services/sms';
import { SmsTemplate, Templates } from '@/types/sms';
import TextEditor from '../common/forms/TextEditor';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import SelectorWithSearch from '../common/forms/SelectorWithSearch';
import { Card } from '../ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Textarea } from '../ui/textarea';

const FormSchema = z.object({
  name: z
    .string({ required_error: 'Title is required' })
    .min(3, { message: 'Title must be at least 3 characters' }),
  description: z
    .string({ required_error: 'Description is required' })
    .min(10, { message: 'Description must be at least 10 characters' }),
  category_id: z.string({ required_error: 'Category is required' }),
  is_active: z.boolean().default(true),
});

interface SmsTemplateFormProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  smsCatData: SmsTemplate[];
  data?: Templates;
}

const variables = [
  {
    title: 'Customer Name',
    code: '{{$customer_name}}',
  },
  {
    title: 'Order ID',
    code: '{{$order_id}}',
  },
  {
    title: 'Due Amount',
    code: '{{$due_amount}}',
  },
  //   {
  //     title: 'Order Status',
  //     code: '{{$order_status}}',
  //   },
  {
    title: 'Delivery Status',
    code: '{{$delivery_status}}',
  },
];

const SmsTemplateForm = ({
  title = 'Create SMS Template',
  description = 'Create your SMS template in less than 5 minutes.',
  smsCatData,
  data,
}: SmsTemplateFormProps) => {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data?.name ? data.name : '',
      category_id: data ? String(data?.category_id ?? '') : '',
      description: data ? data.description : '',
      is_active: data?.is_active ? data.is_active === 1 : true,
    },
  });

  const [phone, setPhone] = useState<string>('');

  const [copied, setCopied] = useState('');

  const timerID = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text); // Show "Copied!" effect
      toast.success(`✅Copied ${text}`);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
      if (err instanceof Error) {
        toast.error(err.message ?? 'Something went wrong copying the variable');
      }
    }
  };

  const handleTestSms = async () => {
    startTransition(async () => {
      const payload = {
        phone: phone,
        message: form.getValues('description'),
      };
      const res = await api.post(TEST_SMS.POST.URL, payload);
      if (res.success) {
        toast.success('Test message sent successfully!');
      } else {
        toast.error('Something went wrong sending the message!');
      }
    });
  };

  const onSubmit = (formData: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      if (data?.id) {
        const res = await api.put(
          `${SMS_TEMPLATES.PUT.SMS_TEMPLATES_UPDATE}/${data.id}`,
          formData,
          [
            ...SMS_TEMPLATES.GET.SMS_TEMPLATES.TAGS,
            ...SMS_TEMPLATES.GET.SMS_TEMPLATES_DETAILS.TAGS,
            ...SMS_CATEGORIES.GET.SMS_CATEGORIES.TAGS,
          ],
        );

        if (res.success) {
          toast.success(res.message || 'SMS Template created successfully!');
          form.reset();
          router.push('/settings/sms/sms-templates');
        } else {
          toast.error(res.message || 'Failed to create SMS Template');
        }
      } else {
        const res = await api.post(
          SMS_TEMPLATES.POST.SMS_TEMPLATES_CREATE,
          formData,
          [
            ...SMS_TEMPLATES.GET.SMS_TEMPLATES.TAGS,
            ...SMS_TEMPLATES.GET.SMS_TEMPLATES_DETAILS.TAGS,
            ...SMS_CATEGORIES.GET.SMS_CATEGORIES.TAGS,
          ],
        );

        if (res.success) {
          toast.success(res.message || 'SMS Template created successfully!');
          form.reset();
          router.push('/settings/sms/sms-templates');
        } else {
          toast.error(res.message || 'Failed to create SMS Template');
        }
      }
    });
  };

  useEffect(() => {
    return () => {
      if (timerID.current) clearTimeout(timerID.current);
    };
  }, []);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-[0.5px]">
            <Card className="p-space16 flex justify-between items-center pb-space16 rounded-b-none">
              <div className="flex items-center gap-space12">
                <Button
                  size={'icon'}
                  type="button"
                  variant={'white'}
                  className="border"
                >
                  <Box size="20" />
                </Button>

                <div className="flex flex-col items-start justify-start">
                  <p className="text-md font-semibold">{title}</p>
                  <p className="text-sm font-normal text-gray-500">
                    {description}
                  </p>
                </div>
              </div>
            </Card>
          </div>
          <div className="bg-white">
            <Card className="rounded-none border-none">
              <div className="px-space12 py-space8">
                <div className="p-space6">
                  <div
                    className={`flex items-center justify-between py-space8 rounded-md border border-gray-200 ${show && 'rounded-b-none'}`}
                  >
                    <div
                      className="flex w-full items-center justify-between gap-space12 hover:cursor-pointer hover:text-black rounded-lg px-space8 mx-space6"
                      onClick={() => setShow((prev) => !prev)}
                    >
                      <div className="flex flex-col items-start">
                        <span className="text-md font-medium">Variables</span>
                        <span className="text-sm font-normal text-gray-500">
                          You can use variables to create your templates.
                        </span>
                      </div>
                      <span
                        className={`${show ? 'rotate-180' : ''} duration-300`}
                      >
                        <ChevronDown size={20} className="text-gray-500" />
                      </span>
                    </div>
                  </div>
                  <div
                    className={`grid duration-500  ${show ? 'grid-rows-[1fr] border border-t-0 border-gray-200 rounded-b-md' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-space12 rounded-sm">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-space16 py-space16 px-space4">
                          {variables.map((val) => (
                            <div
                              key={val.code}
                              className={`flex items-center justify-between p-space6 rounded-sm translate transform duration-500 border ${copied === val.code ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50 hover:cursor-pointer hover:scale-[102%]'} `}
                              onClick={() => handleCopy(val.code)}
                            >
                              <span className="flex flex-col px-space6 space-y-space8">
                                <span className="text-sm font-medium text-gray-500">
                                  {val.title}
                                </span>
                                <span className="text-sm font-normal text-black">
                                  {val.code}
                                </span>
                              </span>
                              <span>
                                <Copy
                                  size={16}
                                  className="text-gray-500 hover:cursor-pointer"
                                />
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-space24">
                <div className="grid md:grid-cols-2 gap-space16">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Title <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Summer Sales" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Category <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <SelectorWithSearch
                            value={field.value}
                            onChange={(val) => {
                              form.setValue('category_id', val);
                            }}
                            options={smsCatData.map((cat) => ({
                              label: cat.name,
                              value: String(cat.id),
                            }))}
                            placeholder="Select Category"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Description <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value ?? ''}
                          onChange={(evt) => {
                            form.setValue('description', evt.target.value);
                          }}
                          placeholder="Dear {{$customer_name}}, your order {{$order_id}} has be {{$delivery_status}}. MolyMart"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-space6 py-space12">
                  <Label>Send Test SMS</Label>
                  <div className="flex items-center gap-space12">
                    <Input
                      placeholder="e.g 01XXXXXXXX"
                      value={phone}
                      onChange={(evt) => setPhone(evt.target.value)}
                    />
                    <Button
                      type="button"
                      variant={'outline'}
                      onClick={handleTestSms}
                      disabled={isLoading}
                      loader={isLoading}
                    >
                      Send Test SMS
                    </Button>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex flex-col py-space16 space-y-space6">
                      <FormLabel>
                        Template Status <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value ?? true}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>
          </div>
          <div className="space-y-[0.5px] pb-space16">
            <Card className="p-space16 flex justify-between items-center pb-space16 rounded-t-none">
              <div className="flex items-center gap-space12">
                <Link href={``}>
                  <Button
                    size={'xxl'}
                    type="button"
                    variant={'white'}
                    className="border"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button size={'xxl'} className="border" type="submit">
                  Create Template
                </Button>
              </div>
            </Card>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SmsTemplateForm;
