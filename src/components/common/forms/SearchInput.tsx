'use client';
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useDebouncedCallback } from 'use-debounce';

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  showIcon?: boolean;
  iconSize?: number;
  wrapperClasses?: string;
  hideFiled?: boolean;
  iconColor?: string;
  onValueChange?: (value: string) => void;
  id?: string;
  debounceDelay?: number;
};

const SearchInput: React.FC<SearchInputProps> = ({
  className = '',
  wrapperClasses = '',
  iconSize = 16,
  showIcon = true,
  hideFiled = true,
  placeholder = 'Search...',
  iconColor = 'gray',
  onValueChange,
  id = 'search',
  debounceDelay = 500,
  ...props
}) => {
  const [search, setSearch] = useQueryState(id, {
    shallow: false,
    defaultValue: '',
  });

  const [localValue, setLocalValue] = useState(search);

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, debounceDelay);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalValue(value);
    debouncedSetSearch(value);
    onValueChange?.(value);
  };

  useEffect(() => {
    setLocalValue(search);
  }, [search]);

  return (
    <div className={`relative ${wrapperClasses}`}>
      {hideFiled && (
        <input
          {...props}
          id={id}
          type="search"
          placeholder={placeholder}
          className={`border-gray-300 h-full  pr-space4 w-full rounded-md border py-[.4rem] text-sm placeholder:text-sm focus:border-primary-light focus:outline-none ${showIcon ? 'pl-space32' : 'pl-space8'} ${className}`}
          value={localValue}
          onChange={handleChange}
        />
      )}

      {showIcon && (
        <label
          htmlFor={id}
          className="absolute left-space8 top-0 flex h-full max-w-max items-center"
        >
          <Search color={iconColor} height={iconSize} width={iconSize} />
        </label>
      )}
    </div>
  );
};

export default SearchInput;
