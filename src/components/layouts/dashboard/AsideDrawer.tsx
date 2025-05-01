'use client';
import { useGlobalStore } from '@/stores/useGlobalStore';
import { Drawer } from '@/components/common/Drawer';
import AsideBarMenu from './AsideBarMenu';

const AsideDrawer = () => {
  const openDrawer = useGlobalStore((state) => state.drawerState);
  const handleDrawer = useGlobalStore((state) => state.setDrawerState);

  return (
    <Drawer
      side="left"
      open={openDrawer.open}
      containerClassName={`w-[220px]`}
      onClose={(open) => handleDrawer({ open })}
    >
      <AsideBarMenu />
    </Drawer>
  );
};

export default AsideDrawer;
