'use client';
import Link from 'next/link';
import { useState } from 'react';
import Icon from '@/components/common/Icon';
import { Search, ShieldQuestion } from 'lucide-react';
import { asideBarMenuList } from '@/config/asideMenuList';

export const GlobalSearch: React.FC = () => {
  const [value, setValue] = useState<string>('');

  return (
    <div className={`w-full max-w-[420px] relative`}>
      <div className={`relative rounded-md w-full h-full`}>
        <input
          type="search"
          value={value}
          id="global-search"
          placeholder="Search pages"
          onChange={(e) => setValue(e.target.value)}
          className={`border-gray-300 h-full  pr-space4 w-full rounded-md border py-[.4rem] text-sm placeholder:text-sm focus:border-primary-light focus:outline-none sm:pl-space32 sm:pr-space12 sm:py-space8 bg-gray-50`}
        />

        <label
          htmlFor={'global-search'}
          className="absolute left-space8 top-0 flex h-full max-w-max items-center"
        >
          <Search size={16} color="gray" />
        </label>
      </div>

      <Suggestions value={value} setValue={() => setValue('')} />
    </div>
  );
};

const Suggestions = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (val: string) => void;
}) => {
  if (!value) return null;

  const listingItems = asideBarMenuList
    .flatMap((item) => [item, ...item.child])
    .filter((menu) => {
      if (!value) return null;
      if (
        menu.title.toLocaleLowerCase().includes(value) ||
        menu.title.includes(value) ||
        menu.link.includes(value)
      ) {
        if (menu.link) {
          return menu;
        }
        return null;
      }
    });
  return (
    <div className="max-h-[70vh] md:max-h-[50vh] overflow-y-scroll absolute top-[105%] bg-white left-0 w-full border border-gray-200 shadow-xl rounded-t-md rounded-b-lg">
      <ul className=" ">
        {listingItems.map((menu, index) => (
          <li
            key={menu.title + index}
            onClick={() => setValue('')}
            className={`px-space16 hover:bg-gray-100 duration-300 border-gray-100 ${index === listingItems.length - 1 ? '' : 'border-b'}`}
          >
            <Link
              href={menu.link}
              className={`flex items-center gap-space8 text-gray-500 py-space8 hover:text-gray-800 duration-300`}
            >
              {menu.icon ? (
                <Icon icon={menu.icon} className={`w-space24 h-space24`} />
              ) : (
                <ShieldQuestion className={`w-space24 h-space24`} />
              )}
              <article>
                <span className="text-sm">{menu.title}</span>
                <span className="text-xs block text-blue-500">{menu.link}</span>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
