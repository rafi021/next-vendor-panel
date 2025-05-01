'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bell, Eye, Menu } from 'lucide-react';
import { ProfileMenu } from './ProfileMenu';
import { useGlobalStore } from '@/stores/useGlobalStore';
import { GlobalSearch } from './GlobalSearch';
import { useUser } from '@/hooks/useUser';

const Header = () => {
  const user = useUser();

  const toggleAsideMenu = useGlobalStore((state) => state.toggleAsideMenu);
  const setDrawerState = useGlobalStore((state) => state.setDrawerState);

  return (
    <header
      className={`h-[72px] shadow bg-white/80 backdrop-blur sticky top-0 right-0 z-20 duration-300`}
    >
      <div className="h-full flex items-center justify-between gap-4 px-space16">
        <div className="flex items-center gap-3 w-full">
          <Button
            size={'icon'}
            variant={'transparent'}
            className="hidden lg:flex hover:bg-blue-950/5"
            onClick={() => toggleAsideMenu()}
          >
            <Menu />
          </Button>

          {/* For Mobile view */}
          <Button
            size={'icon'}
            variant={'transparent'}
            className="flex lg:hidden"
            onClick={() => setDrawerState({ open: true, header: 'ASIDE_MENU' })}
          >
            <Menu />
          </Button>

          <GlobalSearch />
        </div>

        <div className="flex items-center h-full gap-3">
          <Link href={user.store_domain} target="_blank">
            <Button variant="white" className="flex items-center gap-2 !px-2">
              <Eye /> Visit Store
            </Button>
          </Link>
          <Button
            size={'icon'}
            variant={'transparent'}
            className="rounded-full hover:bg-blue-950/5"
          >
            <Bell />
          </Button>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
