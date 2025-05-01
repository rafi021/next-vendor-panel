'use client';

import { createContext, useMemo } from 'react';
import { UserDef } from '@/types/UserType';

export const UserContext = createContext<UserDef | null>(null);

export const UserProvider = ({
  value,
  children,
}: {
  value: UserDef;
  children: React.ReactNode;
}) => {
  const memoizedValue = useMemo(() => value, [value]);
  return (
    <UserContext.Provider value={memoizedValue}>
      {children}
    </UserContext.Provider>
  );
};
