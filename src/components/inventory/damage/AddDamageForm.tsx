'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import ImageDropify from '@/components/common/ImageDropify';
import { api } from '@/server/api';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { IProduct } from '@/types/product-interface';
import {
  DamageForm,
  DamageSchemaDef,
  damageTypes,
} from '@/schemas/inventory/damage';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DAMAGES } from '@/server/services/damage';

import SelectorWithSearch from '@/components/common/forms/SelectorWithSearch';
import { PackageMinus } from 'lucide-react';
import BackButton from '@/components/common/back-button';
import DatePicker from '@/components/common/forms/DatePicker';

const AddDamageForm = ({ products }: { products?: IProduct[] }) => {
  const [isLoading, startTransition] = useTransition();
  const { form, isActiveAction } = DamageForm();
  const router = useRouter();

  const onSubmit = async (formData: DamageSchemaDef) => {
    startTransition(async () => {
      const res = await api.post(DAMAGES.POST, formData, DAMAGES.GET.TAGS);

      // // console.log('response: ' + res);
      if (res.success) {
        toast.success('Damage was created successfully');
        form.reset();
        router.push('/damage');
      } else {
        toast.error(res.message || 'Category was not created!');
      }
    });
  };

  return (
    <div className="bg-gray-50">
      <Card>
        <CardHeader className="p-space16 lg:p-space24 border-b border-gray-300">
          <div className="flex items-center justify-between gap-space16">
            <div className="flex  items-start gap-space16">
              <div className="p-2 border-[1px] rounded-lg bg-primary/10">
                <PackageMinus className="w-6 h-6 text-gray-500" />
              </div>
              <div className="">
                <h1 className="text-2xl font-semibold">Add New Damage</h1>
                <p className=" text-gray-500">
                  Create your damage in less than 2 minutes.
                </p>
              </div>
            </div>
            <BackButton />
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-space16 p-3">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Damage image</FormLabel>
                      <FormControl>
                        <ImageDropify
                          image={field.value ?? ''}
                          setImage={(img) => {
                            field.onChange(img);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="product_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Select Product{' '}
                          <span className="text-error-500">*</span>
                        </FormLabel>
                        <SelectorWithSearch
                          options={
                            products?.map((product) => ({
                              label: product.name,
                              value: String(product.id),
                            })) || []
                          }
                          onChange={(val) => field.onChange(val)}
                          value={field.value}
                          //   Icon={ChevronDown}
                          placeholder="Select product"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Damage Quantity</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value ?? ''}
                            placeholder="Enter damage product quantity..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Damage Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select damage type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {damageTypes?.map((damageType, index) => (
                              <SelectItem key={index} value={damageType}>
                                {damageType}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block py-space4">
                          Damage Date
                        </FormLabel>
                        <FormControl>
                          <DatePicker
                            value={field.value ?? ''}
                            onChange={(value) => field.onChange(value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Damage Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value ?? ''}
                          placeholder="Write a few sentences about the damage..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="border-t border-gray-300 p-space12">
                <div className="flex gap-space12 sm:w-1/2">
                  <Button
                    type="submit"
                    loader={isLoading}
                    disabled={!isActiveAction || isLoading}
                  >
                    Add New Damage
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddDamageForm;
