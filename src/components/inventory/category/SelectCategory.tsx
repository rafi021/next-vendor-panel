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
import { ChevronDown, ChevronsUpDown } from 'lucide-react';

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

interface SelectCategoryProps {
  categories: ICategories;
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
}

const SelectCategory = ({
  categories,
  onChange,
  placeholder = 'Parent Category',
  value,
}: SelectCategoryProps) => {
  const [open, setOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const flatArray = useMemo(
    () => categories.data.flatMap((category) => flattenCategories(category)),
    [categories],
  );

  // find selected option
  const selectedOption = useMemo(
    () => flatArray.find((item) => String(item.id) == value),
    [value, flatArray],
  );

  const toggleExpand = (id: number) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id],
    );
  };

  const renderCategory = (
    category: ICategory,
    level: number = 0,
    isLast: boolean = false,
    parentLineStack: boolean[] = [],
  ): React.ReactNode => {
    const isExpanded = expandedCategories.includes(category.id);
    const hasChildren = category.children_recursive.length > 0;

    return (
      <React.Fragment key={category.id}>
        <CommandItem
          value={category.id.toString()}
          onSelect={() => {
            onChange(
              value === category.id.toString()
                ? category.id.toString()
                : category.id.toString(),
            );
            setOpen(false);
          }}
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
              <span className="text-sm">{category.name}</span>

              {hasChildren && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(category.id);
                  }}
                  className="cursor-pointer ml-2"
                >
                  <ChevronDown
                    className={cn('transition-transform', {
                      'rotate-180': isExpanded,
                    })}
                    size={16}
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

  // const renderCategory = (
  //   category: ICategory,
  //   level: number = 0,
  // ): React.ReactNode => {
  //   const isExpanded = expandedCategories.includes(category.id);
  //   const hasChildren = category.children_recursive.length > 0;

  //   return (
  //     <React.Fragment key={category.id}>
  //       <CommandItem
  //         value={category.id.toString()}
  //         onSelect={() => {
  //           onChange(
  //             value === category.id.toString() ? '' : category.id.toString(),
  //           );
  //           setOpen(false);
  //         }}
  //         className="!p-0"
  //       >
  //         <div
  //           className={cn(
  //             'flex items-center justify-between w-full relative px-3 py-1 hover:bg-slate-50 cursor-pointer transition-colors',
  //             {
  //               'bg-slate-100': value === category.id.toString(),
  //             },
  //           )}
  //           style={{ paddingLeft: `${level * 16 + 12}px` }}
  //         >
  //           {/* ───── Tree lines start here ───── */}
  //           {level > 0 && (
  //             <>
  //               {/* Vertical line */}
  //               <div
  //                 className="absolute top-0 left-0 h-full border-l border-gray-400"
  //                 style={{
  //                   marginLeft: `${(level - 1) * 16 + 20}px`,
  //                 }}
  //               />
  //               {/* Horizontal line */}
  //               <div
  //                 className="absolute top-1/2 left-0 border-t border-gray-400 w-[10px]"
  //                 style={{
  //                   marginLeft: `${(level - 1) * 16 + 20}px`,
  //                   transform: 'translateY(-50%)',
  //                 }}
  //               />
  //             </>
  //           )}
  //           {/* ───── Tree lines end here ───── */}

  //           <span className="text-sm relative z-10">{category.name}</span>

  //           {hasChildren && (
  //             <span
  //               onClick={(e) => {
  //                 e.stopPropagation();
  //                 toggleExpand(category.id);
  //               }}
  //               className="cursor-pointer ml-2"
  //             >
  //               <ChevronDown
  //                 className={cn('transition-transform', {
  //                   'rotate-180': isExpanded,
  //                 })}
  //                 size={16}
  //               />
  //             </span>
  //           )}
  //         </div>
  //       </CommandItem>

  //       {isExpanded &&
  //         category.children_recursive.map((child) =>
  //           renderCategory(child as unknown as ICategory, level + 1),
  //         )}
  //     </React.Fragment>
  //   );
  // };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="white"
          role="combobox"
          aria-expanded={open}
          className={cn('justify-between h-[40px] !w-full')}
        >
          {selectedOption?.name || placeholder}
          <ChevronsUpDown className="opacity-50 ml-2" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className={cn('p-0')}
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
            <CommandGroup className="max-h-[280px] min-w-max">
              {categories.data.map((category) => renderCategory(category))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectCategory;
