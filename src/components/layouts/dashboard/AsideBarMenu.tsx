'use client';
import Icon from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { asideBarMenuList } from '@/config/asideMenuList';
import { useUser } from '@/hooks/useUser';
import { useGlobalStore } from '@/stores/useGlobalStore';
import { ChevronDown, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const itemStyle = `flex items-center gap-3 py-2 px-3 rounded-md duration-150`;

const NavigationItem = ({ menu }: any) => {
  const pathname = usePathname();
  const showAsideMenu = useGlobalStore((state) => state.showAsideMenu);

  const isActive =
    menu.link === pathname ||
    (menu.child && menu.child.some((child: any) => child.link === pathname));
  return (
    <Link
      href={menu.link}
      className={`${itemStyle} ${isActive ? 'bg-blue-950 text-white' : 'text-gray-800 hover:bg-blue-950/10'}`}
    >
      <Icon
        icon={menu.icon}
        className={`${showAsideMenu ? 'w-space16 h-space16' : 'w-space24 h-space24'}`}
      />
      {showAsideMenu && <span className="text-sm">{menu.title}</span>}
    </Link>
  );
};

const AsideBarMenu = () => {
  const user = useUser();

  const [collapsable, setCollapsable] = useState('');

  const showAsideMenu = useGlobalStore((state) => state.showAsideMenu);
  const toggleAsideMenu = useGlobalStore((state) => state.toggleAsideMenu);

  const openCollapsableMenu = (title: string) => collapsable === title;

  return (
    <aside
      className={`${showAsideMenu ? 'lg:w-[200px]' : 'lg:w-[80px]'} duration-300 bg-white shadow h-screen`}
    >
      <div
        className={`h-[72px] flex items-center ${showAsideMenu ? 'px-4' : 'px-3 justify-center'}`}
      >
        <Link href={'/'}>
          {showAsideMenu ? (
            <Image src={'/brand.svg'} alt="" width={120} height={24} />
          ) : (
            <Image src={'/favicon.svg'} alt="" width={40} height={40} />
          )}
        </Link>
      </div>

      <ScrollArea
        className={`h-[calc(100vh-144px)] ${showAsideMenu ? 'px-3' : 'px-4'}`}
      >
        <div className="py-2 space-y-1">
          {showAsideMenu && (
            <p className="text-gray-500 font-bold text-xs pl-space12">
              Main Menu
            </p>
          )}
          {asideBarMenuList.map((menu) => {
            if (menu.child.length > 0) {
              return (
                <div key={menu.title} className="hover:cursor-pointer">
                  <div
                    onClick={() => {
                      setCollapsable(
                        openCollapsableMenu(menu.title) ? '' : menu.title,
                      );
                      if (!showAsideMenu) toggleAsideMenu();
                    }}
                    className={`${itemStyle} relative text-gray-800 bg- ${openCollapsableMenu(menu.title) ? 'bg-blue-950/20' : ' hover:bg-blue-950/10'}`}
                  >
                    <Icon
                      icon={menu.icon}
                      className={`${showAsideMenu ? 'w-space16 h-space16' : 'w-space24 h-space24'}`}
                    />

                    {showAsideMenu && (
                      <>
                        <span className="text-sm">{menu.title}</span>

                        <span
                          className={`absolute right-0 ${openCollapsableMenu(menu.title) ? 'rotate-180' : 'rotate-0'}`}
                        >
                          <ChevronDown className={`h-space16`} />
                        </span>
                      </>
                    )}
                  </div>

                  {showAsideMenu && (
                    <div
                      className={`grid ${openCollapsableMenu(menu.title) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} duration-300`}
                    >
                      <div className="w-full overflow-hidden">
                        <div className="pl-space8 py-1 space-y-1">
                          {menu.child.map((subMenu, index) => (
                            <NavigationItem key={index} menu={subMenu} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            } else {
              return <NavigationItem key={menu.title} menu={menu} />;
            }
          })}
        </div>
      </ScrollArea>

      <div className="h-[72px] px-4 bg-gray-100">
        <div className="flex items-center gap-3 h-full"></div>
      </div>
    </aside>
  );
};

export default AsideBarMenu;
