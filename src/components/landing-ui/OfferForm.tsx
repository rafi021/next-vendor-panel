'use client';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
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
import DatePicker from '../common/forms/DatePicker';
import { z } from 'zod';
import { LandingPageSchemaDef } from '@/schemas/landing-ui';
import { Input } from '../ui/input';

const timeFormats = ['Days', 'Hours', 'Months'];
const offerType = ['loop', 'fixed'];
interface IProps {
  form: UseFormReturn<LandingPageSchemaDef>;
}

const OfferForm = ({ form }: IProps) => {
  // // console.log("format", form.watch('landing_page.offer_section.type'));
  return (
    <div className="space-y-space12 border border-gray-200 rounded-md p-space16">
      <div className="border-b border-gray-200 text-black font-semibold text-md pb-space8">
        Offer
      </div>

      <FormField
        control={form.control}
        name="landing_page.offer_section.offer_type"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                // value={field.value}
                defaultValue={
                  field.value ??
                  form.watch('landing_page.offer_section.offer_type')
                }
              >
                <div className="flex gap-space12">
                  {offerType.map((type) => (
                    <FormItem key={type}>
                      <FormLabel
                        className={`flex capitalize border items-center gap-space6 text-xs sm:text-sm font-medium py-space12 px-space16 rounded-md
                        ${field.value === type ? 'bg-blue-50 border-blue-500 text-blue-500' : 'border-transparent bg-gray-100 text-black'} `}
                      >
                        <FormControl>
                          <RadioGroupItem key={type} value={type} />
                        </FormControl>

                        <span>{type} Counter</span>
                      </FormLabel>
                    </FormItem>
                  ))}
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch('landing_page.offer_section.offer_type') === 'fixed' ? (
        <div className="space-y-space12 border border-gray-200 rounded-md p-space12">
          <div className="grid md:grid-cols-2 gap-space16">
            <div className="flex gap-space12 items-end">
              <FormField
                control={form.control}
                name="landing_page.offer_section.start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block py-space4">From</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value ?? ''}
                        onChange={(value) => field.onChange(value)}
                        placeholder="Select offer start date & time"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="landing_page.offer_section.end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block py-space4">To</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value ?? ''}
                        onChange={(value) => field.onChange(value)}
                        placeholder="Select offer end date & time"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-space12 border border-gray-200 rounded-md p-space12">
          <div className="grid md:grid-cols-2 gap-space16">
            <div className="flex gap-space12 items-end">
              <FormField
                control={form.control}
                name="landing_page.offer_section.duration"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Set Counter</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter offer time"
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="landing_page.offer_section.type"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Days" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeFormats.map((format) => (
                          <SelectItem key={format} value={format}>
                            {format}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferForm;
