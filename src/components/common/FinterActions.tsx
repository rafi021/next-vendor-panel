'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ListFilter, SlidersHorizontal, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { parseAsString, useQueryState } from 'nuqs';

type Field = {
  name: string;
  value: string;
  icon?: LucideIcon;
};

type SortComponentProps = {
  fields: Field[];
  label: string;
  triggerClassName?: string;
  containerClassName?: string;
  labelClassName?: string;
  align?: 'start' | 'center' | 'end';
};

/**
 * Filter Component
 *
 * @fields - Array of fields to select from
 * @label - Label for the component (e.g., Anything)
 */
const FilterActions: React.FC<SortComponentProps> = ({
  fields = [],
  label,
  triggerClassName = '',
  containerClassName = '',
  labelClassName = '',
  align = 'start',
}) => {
  const [openState, setOpenState] = React.useState(false);

  const [selectedField, setSelectedField] = useQueryState(
    label.toLowerCase(),
    parseAsString.withOptions({
      shallow: false, // opt-in to notify the server (Next.js only)
    }),
  );

  // // console.log('selectedField', selectedField);

  const handleReset = () => {
    setOpenState(false);
  };

  return (
    <Popover open={openState} onOpenChange={setOpenState}>
      <PopoverTrigger asChild>
        <Button
          variant="white"
          className={cn('flex items-center gap-2', triggerClassName)}
          aria-label={`Open ${label} options`}
        >
          <ListFilter size={16} />
          <span className="break-words">{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('p-2 min-w-[200px]', containerClassName)}
        align={align}
        asChild
      >
        <div className="grid gap-1">
          <div className="h-[260px] bg-red-100 overflow-y-scroll">
            {fields.length > 0 ? (
              fields.map(({ name, value, icon: Icon }) => (
                <Button
                  variant="select"
                  key={value}
                  className={cn(
                    'flex items-center gap-2 py-2 px-3 rounded-md transition-all duration-300',
                    selectedField === value
                      ? 'bg-blue-950/10 text-gray-700'
                      : '',
                    labelClassName,
                  )}
                  onClick={() => {
                    setSelectedField((prev) => (prev === value ? null : value));
                    // setOpenState(false);
                  }}
                  aria-label={`${label} by ${name}`}
                >
                  {Icon && <Icon size={16} />}
                  {name}
                </Button>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No {label.toLowerCase()} fields available
              </p>
            )}
          </div>

          <div className="flex gap-space12">
            <Button
              type="button"
              variant="white"
              className="w-full"
              size={'sm'}
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="w-full"
              size={'sm'}
              // loader={isLoading}
              // disabled={!isActiveAction || isLoading}
            >
              Submit
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterActions;
