import { PERMISSIONS_LIST } from '@/config/PERMISSIONS';
import { PERMISSIONS_ENUMS } from '@/enum/permissions';
import { usePermissions } from '@/providers/PermissionsProvider';

/**
 * Check if a user has required permission(s)
 * @param required - one required permissions
 */
export function useHasPermission(required: string): boolean {
  const userPermissions: string[] = usePermissions().permissions;

  // console.log('user permissions list ', userPermissions);

  if (userPermissions.includes(PERMISSIONS_ENUMS.ALL)) return true;

  if (Array.isArray(required)) {
    return required.some((perm) => userPermissions.includes(perm));
  }

  return userPermissions.includes(required);
}

// permissions list type
//  {
//     id: 432,
//     name: 'employee_status',
//     module: 'employee',
//   },

export function getPermissionId(permission: string) {
  const permissionIndex = PERMISSIONS_LIST.findIndex(
    (perm) => perm.name === permission,
  );

  // console.log('permissionIndex', permissionIndex);
  if (permissionIndex !== -1) {
    return permissionIndex + 1;
  }
  return null;
}
export function getPermissionName(
  permissionId: number,
  permissionsList: string[],
): string | null {
  const permissionIndex = permissionId - 1;
  if (permissionIndex >= 0 && permissionIndex < permissionsList.length) {
    return permissionsList[permissionIndex];
  }
  return null;
}
