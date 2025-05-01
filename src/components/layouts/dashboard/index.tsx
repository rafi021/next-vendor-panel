'use client';

import { useGlobalStore } from '@/stores/useGlobalStore';
import AsideBarMenu from './AsideBarMenu';
import Header from './Header';
import AsideDrawer from './AsideDrawer';
import BreadcrumbWithCurrentPath from './BreadcrumbWithCurrentPath';

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const showAsideMenu = useGlobalStore((state) => state.showAsideMenu);
  return (
    <div className="flex w-full h-full bg-gray-100">
      <div
        className={`duration-300 hidden lg:block h-screen sticky z-20 top-0 ${showAsideMenu ? 'lg:w-[200px]' : 'lg:w-[80px]'} `}
      >
        <AsideBarMenu />
      </div>
      <main
        className={`h-screen overflow-y-scroll ${showAsideMenu ? 'w-full lg:w-[calc(100vw-200px)]' : 'w-full lg:w-[calc(100vw-80px)]'} duration-300`}
      >
        <Header />
        <BreadcrumbWithCurrentPath />
        <div className="p-space8 sm:p-space16 lg:pt-0 relative h-full w-full">
          {children}
        </div>
      </main>
      <AsideDrawer />
    </div>
  );
};
