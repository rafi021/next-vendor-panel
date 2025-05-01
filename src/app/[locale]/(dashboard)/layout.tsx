import { DashboardLayout } from '@/components/layouts/dashboard';
import { PermissionsProvider } from '@/providers/PermissionsProvider';
import { UserProvider } from '@/providers/UserProvider';
import { api } from '@/server/api';
import { AUTH } from '@/server/services/auth';
import { RoleAndPermissionsList } from '@/types/permission';
import { cookies } from 'next/headers';
import { ReactElement } from 'react';

export default async function Dashboard({
  children,
}: {
  children: ReactElement;
}) {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user')?.value;
  const user = userCookie ? JSON.parse(userCookie) : undefined;

  const permissionsData = await api.get<ApiResponse<RoleAndPermissionsList>>(
    AUTH.GET.CHECK_PERMISSIONS.URL,
    AUTH.GET.CHECK_PERMISSIONS.TAGS,
  );

  return (
    <UserProvider value={user}>
      <PermissionsProvider value={permissionsData.data}>
        <DashboardLayout>{children}</DashboardLayout>
      </PermissionsProvider>
    </UserProvider>
  );
}
