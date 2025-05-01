import { create } from 'zustand';

type GlobalState = {
  showAsideMenu: boolean;
  drawerState: {
    open: boolean;
    header?: string;
    side?: 'left' | 'right';
  };
  dialogState: {
    open: boolean;
    header?: string;
  };
};

type GlobalActions = {
  toggleAsideMenu: () => void;
  setDrawerState: (params: {
    open: boolean;
    header?: string | undefined;
    side?: 'left' | 'right';
  }) => void;
  setDialogState: (params: {
    open: boolean;
    header?: string | undefined;
  }) => void;
};

export const useGlobalStore = create<GlobalState & GlobalActions>()((set) => ({
  // Initial state-------------------------------------
  showAsideMenu: true,
  drawerState: { open: false, header: undefined, side: 'left' },
  dialogState: { open: false, header: undefined },

  // Update state-------------------------------------
  toggleAsideMenu: () =>
    set((data) => ({ showAsideMenu: !data.showAsideMenu })),
  setDrawerState: (params) => set({ drawerState: params }),
  setDialogState: (params) => set({ dialogState: params }),
}));
