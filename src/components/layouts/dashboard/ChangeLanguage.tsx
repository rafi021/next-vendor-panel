import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useChangeLocale } from '@/locales/client';
import { ChevronDown } from 'lucide-react';
import { Suspense, useState } from 'react';

export function ChangeLanguage() {
  const changeLocale = useChangeLocale({ preserveSearchParams: true });

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'capitalize py-2 px-3 text-md text-gray-700  flex items-center justify-between gap-2 hover:bg-blue-950/10 rounded-sm duration-300',
          )}
        >
          Language
          <span className={`${open ? 'rotate-180' : 'rotate-0'}`}>
            <ChevronDown className={`h-space16`} />
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="min-w-min p-0" align="end">
        <Suspense>
          <div className="flex flex-col gap-space4">
            <button
              className={cn(
                'capitalize py-2 px-3 text-md text-gray-700  flex items-center justify-between gap-2 hover:bg-blue-950/10 rounded-sm duration-300',
              )}
              onClick={() => changeLocale('en')}
            >
              English
            </button>
            <button
              className={cn(
                'capitalize py-2 px-3 text-md text-gray-700  flex items-center justify-between gap-2 hover:bg-blue-950/10 rounded-sm duration-300',
              )}
              onClick={() => changeLocale('bn')}
            >
              Bangla
            </button>
          </div>
        </Suspense>
      </PopoverContent>
    </Popover>
  );
}
