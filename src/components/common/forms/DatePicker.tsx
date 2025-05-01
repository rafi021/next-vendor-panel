'use client';
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/date-format';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';

type DatePickerProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'white'}
          className={cn(
            'w-full pl-3 text-left font-normal',
            !value && 'text-muted-foreground',
          )}
        >
          {value ? (
            formatDate(value)
          ) : (
            <span>{placeholder ? placeholder : 'Pick a date'}</span>
          )}
          <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={new Date(value)}
          onSelect={(date) => {
            let formatted_date = formatDate(date ?? '', 'Y_M_D');
            onChange(formatted_date);
          }}
          // disabled={(date) =>
          //   date > new Date() : date < new Date('1900-01-01')
          // }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
