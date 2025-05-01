'use client';

import React, { useMemo, useState } from 'react';
import { ICategories, ICategory } from '@/types/category-interfaces';
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
import {
  CheckSquare,
  Square,
  ChevronDown,
  ChevronsUpDown,
  X,
} from 'lucide-react';

function flattenCategories(category: ICategory): ICategory[] {
  const result: ICategory[] = [];
  const recurse = (cat: ICategory) => {
    result.push(cat);
    cat.children_recursive?.forEach((child) =>
      recurse(child as unknown as ICategory),
    );
  };
  recurse(category);
  return result;
}

interface MultiSelectCategoryProps {
  categories: ICategory[];
  onChange: (value: string[]) => void;
  value: string[];
  containerClass?: string;
  align?: 'center' | 'start' | 'end';
}

const MultiSelectCategory = ({
  categories,
  onChange,
  value,
  containerClass,
  align = 'start',
}: MultiSelectCategoryProps) => {
  const [open, setOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const flatArray = useMemo(
    () =>
      categories.length > 0
        ? categories.flatMap((category) => flattenCategories(category))
        : [],
    [categories],
  );

  const toggleExpand = (id: number) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id],
    );
  };

  const isSelected = (id: string) => value.includes(id);

  const toggleSelect = (id: string) => {
    if (isSelected(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const clearAll = () => onChange([]);

  const removeFromSelected = (id: string) => {
    onChange(value.filter((v) => v !== id));
  };

  const renderCategory = (
    category: ICategory,
    level: number = 0,
    isLast: boolean = false,
    parentLineStack: boolean[] = [],
  ): React.ReactNode => {
    const isExpanded = expandedCategories.includes(category.id);
    const hasChildren = category.children_recursive.length > 0;
    const idStr = category.id.toString();

    return (
      <React.Fragment key={category.id}>
        <CommandItem
          value={idStr}
          onSelect={() => toggleSelect(idStr)}
          className="!p-0"
        >
          <div className="relative w-full">
            {/* Tree lines */}
            <div className="absolute top-0 left-0 h-full flex">
              {parentLineStack.map((showLine, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'w-4',
                    idx > 0 && {
                      'border-l border-gray-300': showLine,
                    },
                  )}
                />
              ))}

              {/* Connector for current node */}
              <div className="relative w-4">
                {/* Vertical line above (if not top-level) */}
                {level > 0 && (
                  <div
                    className={cn(
                      'absolute left-0 w-px bg-gray-300',
                      isLast ? 'top-0 h-1/2' : 'top-0 h-full',
                    )}
                  />
                )}
                {/* Horizontal line */}
                {level > 0 && (
                  <div className="absolute top-1/2 left-0 w-4 border-t border-gray-300 transform -translate-y-1/2" />
                )}
              </div>
            </div>

            <div
              className={cn(
                'flex items-center justify-between w-full px-3 py-1 z-10 relative',
              )}
              style={{ paddingLeft: `${level * 16 + 12}px` }}
            >
              <div className="flex items-center gap-space6">
                {isSelected(idStr) ? (
                  <CheckSquare className="text-green-600 w-4 h-4 shrink-0" />
                ) : (
                  <Square className="text-muted-foreground w-4 h-4 shrink-0" />
                )}

                <span className="text-sm">{category.name}</span>
              </div>

              {hasChildren && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(category.id);
                  }}
                  className="cursor-pointer ml-auto"
                >
                  <ChevronDown
                    className={cn('transition-transform', {
                      'rotate-180': isExpanded,
                    })}
                  />
                </span>
              )}
            </div>
          </div>
        </CommandItem>
        {isExpanded &&
          category.children_recursive.map((child, idx, arr) =>
            renderCategory(
              child as unknown as ICategory,
              level + 1,
              idx === arr.length - 1,
              [...parentLineStack, !isLast],
            ),
          )}
      </React.Fragment>
    );
  };

  const selectedOptions = flatArray.filter((item) =>
    value.includes(item.id.toString()),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="white"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'justify-between items-center min-h-[40px] pt-1.5 !w-full flex-wrap overflow-hidden',
          )}
        >
          <div className="overflow-x-auto">
            <div className="pb-[3px] flex gap-1 items-center text-left">
              {selectedOptions.length > 0
                ? selectedOptions.map((opt) => (
                    <span
                      key={opt.id}
                      className="bg-gray-100 px-2 py-1 rounded text-xs flex items-center gap-0.5"
                    >
                      {opt.name}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromSelected(opt.id.toString());
                        }}
                      >
                        <X className="w-3 h-3 opacity-70 hover:opacity-100" />
                      </span>
                    </span>
                  ))
                : 'Select Categories'}
            </div>
          </div>
          <ChevronsUpDown className="opacity-50 ml-auto" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align={align}
        className={cn(
          'w-[calc(100vw-90px)] lg:w-[calc(100vw-270px)] p-0',
          containerClass,
        )}
      >
        <Command
          filter={(optionValue, search) => {
            const option = flatArray.find(
              (opt) => opt.id.toString() === optionValue,
            );
            if (!option) return 0;

            const searchLower = search.toLowerCase();
            return option.name.toLowerCase().includes(searchLower) ||
              option.id.toString().includes(searchLower)
              ? 1
              : 0;
          }}
        >
          <CommandInput placeholder="Search..." className="h-9" />

          <CommandList className="overflow-x-auto">
            <CommandEmpty>No results found.</CommandEmpty>

            {selectedOptions.length > 0 && (
              <div className="px-4 py-2 flex justify-between items-center border-b">
                <span className="text-sm font-medium text-muted-foreground">
                  {selectedOptions.length} selected
                </span>
                <button
                  onClick={clearAll}
                  className="text-sm text-red-500 flex items-center gap-1 hover:underline"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              </div>
            )}

            <CommandGroup className="max-h-[280px] min-w-max">
              {categories.map((category) => renderCategory(category))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelectCategory;
