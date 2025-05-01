'use client';

import { RoleAndPermissionsList } from '@/types/permission';
import { createContext, useContext, ReactNode } from 'react';

// 1. Define context type
interface PermissionsContextType {
  value: RoleAndPermissionsList;
}

// 2. Create context
const PermissionsContext = createContext<PermissionsContextType | null>(null);

// 3. Provider component
export const PermissionsProvider = ({
  value,
  children,
}: {
  value: RoleAndPermissionsList;
  children: ReactNode;
}) => {
  return (
    <PermissionsContext.Provider value={{ value }}>
      {children}
    </PermissionsContext.Provider>
  );
};

// 4. Optional helper hook
export const usePermissions = () => {
  const context = useContext(PermissionsContext)?.value;
  if (!context)
    throw new Error('usePermissions must be used within a PermissionsProvider');
  return context;
};
