'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ListFilter, SlidersHorizontal, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { parseAsString, useQueryState, useQueryStates } from 'nuqs';
import { Checkbox } from '../ui/checkbox';

export type Field = {
  name: string;
  column: string;
  direction?: 'asc' | 'desc';
  icon?: LucideIcon;
};

type SortAndFilterComponentProps = {
  fields: Field[];
  label: 'Sort' | 'Filter';
  type?: 'single' | 'multi';
  queryKeys?: {
    sortColumnKey?: string;
    sortDirectionKey?: string;
    filterKey?: string;
  };
  triggerClassName?: string;
  containerClassName?: string;
  labelClassName?: string;
  align?: 'start' | 'center' | 'end';
};

const SortAndFilterComponent: React.FC<SortAndFilterComponentProps> = ({
  fields = [],
  label,
  queryKeys,
  type = 'multi',
  triggerClassName = '',
  containerClassName = '',
  labelClassName = '',
  align = 'start',
}) => {
  const [openState, setOpenState] = React.useState(false);

  // Dynamically set query keys with fallback defaults
  const {
    sortColumnKey = 'sort_column',
    sortDirectionKey = 'sort_direction',
    filterKey = 'filter',
  } = queryKeys || {};

  const [sort, setSort] = useQueryStates(
    {
      [sortColumnKey]: parseAsString.withDefault(''),
      [sortDirectionKey]: parseAsString.withDefault(''),
    },
    {
      history: 'push',
      shallow: false,
    },
  );

  const sort_column = sort[sortColumnKey];
  const sort_direction = sort[sortDirectionKey];

  const [filter, setFilter] = useQueryState(filterKey, {
    defaultValue: '',
    shallow: false,
  });

  const handleSortClick = (column: string, direction?: 'asc' | 'desc') => {
    const isSameSelection =
      column === sort_column && direction === sort_direction;

    setSort(
      isSameSelection
        ? null
        : {
            [sortColumnKey]: column,
            [sortDirectionKey]: direction || '',
          },
    );

    setOpenState(false);
  };

  const handleFilterToggle = (column: string) => {
    if (type === 'multi') {
      setFilter((prev = '') => {
        const prevArray = prev ? prev.split(',') : [];

        const updatedArray = prevArray.includes(column)
          ? prevArray.filter((item) => item !== column)
          : [...prevArray, column];

        return updatedArray.join(',');
      });
    }
    if (type === 'single') {
      // if()
      setFilter(filter === column ? null : column);
    }
  };

  const isFilterChecked = (name: string) => {
    const selectedFilters = filter ? filter.split(',') : [];
    return selectedFilters.includes(name);
  };

  const renderSortOptions = () => {
    if (fields.length === 0) {
      return <p className="text-gray-500 text-sm">No sort fields available</p>;
    }

    return fields.map(({ name, column, direction, icon: Icon }) => {
      const isActive = sort_column === column && sort_direction === direction;

      return (
        <Button
          key={`${column}_${direction}`}
          variant="select"
          className={cn(
            'flex items-center gap-2 py-2 px-3 rounded-md transition-all duration-300',
            isActive && 'bg-blue-950/10 text-gray-700',
            labelClassName,
          )}
          onClick={() => handleSortClick(column, direction)}
          aria-label={`Sort by ${name}`}
        >
          {Icon && <Icon size={16} />}
          {name}
        </Button>
      );
    });
  };

  const renderFilterOptions = () => {
    if (fields.length === 0) {
      return (
        <p className="text-gray-500 text-sm">No filter fields available</p>
      );
    }

    return (
      <div className="grid gap-2">
        <div>
          {fields.map(({ name, column, icon: Icon }) => (
            <div
              key={column}
              className="hover:bg-gray-100 flex items-center justify-start gap-3 rounded-md px-2 py-2 transition-colors"
            >
              <Checkbox
                id={name + column}
                checked={isFilterChecked(column)}
                onCheckedChange={() => handleFilterToggle(column)}
              />
              <label
                htmlFor={name + column}
                className="text-sm cursor-pointer flex items-center gap-2"
              >
                {Icon && <Icon size={16} />}
                {name}
              </label>
            </div>
          ))}
        </div>
        <div className="w-full flex gap-2 mt-2">
          <PopoverClose asChild>
            <Button variant={'white'} className="w-full h-[28px]">
              Close
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              variant={'transparent'}
              className="w-full h-[28px] bg-gray-200"
              onClick={() => setFilter(null)}
            >
              Reset
            </Button>
          </PopoverClose>
        </div>
      </div>
    );
  };

  return (
    <Popover open={openState} onOpenChange={setOpenState}>
      <PopoverTrigger asChild>
        <Button
          variant="white"
          className={cn('flex items-center gap-2', triggerClassName)}
          aria-label={`Open ${label} options`}
        >
          {label === 'Sort' ? (
            <SlidersHorizontal size={16} />
          ) : (
            <ListFilter size={16} />
          )}
          <span className="break-words">{label}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={cn('p-2 min-w-[200px]', containerClassName)}
        align={align}
        asChild
      >
        <div className="grid gap-1">
          {label === 'Sort' ? renderSortOptions() : renderFilterOptions()}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default React.memo(SortAndFilterComponent);
