'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { parseAsString, useQueryState } from 'nuqs';
import { formatDate } from '@/utils/date-format';

export function DateSelect() {
  const [date, setDate] = useQueryState(
    'date',
    parseAsString.withOptions({
      shallow: false,
    }),
  );

  const [openState, setOpenState] = React.useState(false);

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      setDate(null);
      setOpenState(false);
      return;
    }

    const formattedDate = formatDate(selectedDate, 'Y_M_D');

    if (formattedDate === date) {
      setDate(null);
    } else {
      setDate(formattedDate);
    }

    setOpenState(false);
  };

  return (
    <Popover open={openState} onOpenChange={setOpenState}>
      <PopoverTrigger asChild>
        <Button variant="white">
          <CalendarIcon size={16} />
          {date ? formatDate(date) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          mode="single"
          selected={date ? new Date(date) : undefined}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
