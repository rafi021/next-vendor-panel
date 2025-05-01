'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Loader2, LucideIcon } from 'lucide-react';

interface IOption {
  label: string;
  value: string;
  icon?: string;
}

interface IProps {
  options: IOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
  disable?: boolean;
  className?: string;
  containerClass?: string;
  Icon?: LucideIcon;
}

const SelectorWithSearch = ({
  options,
  value,
  onChange,
  placeholder = 'Select',
  loading = false,
  disable = false,
  className = '',
  containerClass = '',
  Icon,
}: IProps) => {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((item) => item.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="white"
          role="combobox"
          aria-expanded={open}
          disabled={disable}
          className={cn('justify-between !w-full', className)}
        >
          {loading ? (
            <div className="flex items-center justify-center w-full gap-2">
              <Loader2 className="animate-spin" />
              Processing…
            </div>
          ) : (
            selectedOption?.label || placeholder
          )}
          {Icon ? <Icon /> : <ChevronsUpDown className="opacity-50 ml-2" />}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className={cn('min-w-full p-0', className, containerClass)}
      >
        <Command
          filter={(optionValue, search) => {
            const option = options.find((opt) => opt.value === optionValue);

            if (!option) return 0;

            const searchLower = search.toLowerCase();
            const matchesLabel = option.label
              .toLowerCase()
              .includes(searchLower);
            const matchesValue = option.value
              .toLowerCase()
              .includes(searchLower);

            return matchesLabel || matchesValue ? 1 : 0;
          }}
        >
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = value === option.value;

                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      onChange(value === option.value ? '' : option.value);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        'ml-auto',
                        isSelected ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectorWithSearch;
