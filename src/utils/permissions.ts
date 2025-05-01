type Permission = {
  id: number;
  name: string;
  module: string;
};

type GroupedPermissions = {
  [module: string]: Permission[];
};

type PermissionsData = Permission[] | GroupedPermissions;

type ApiUserPermissions = Array<number | string>;

// Check if local permission data is grouped
function isGroupedPermissions(
  data: PermissionsData,
): data is GroupedPermissions {
  return !Array.isArray(data);
}

// Normalize grouped or flat permissions into a flat array
function normalizePermissions(data: PermissionsData): Permission[] {
  if (isGroupedPermissions(data)) {
    return Object.values(data).flat();
  }
  return data;
}

// ---------- Main Utility Class ----------

export class PermissionsUtil {
  private localPermissions: Permission[] = [];

  constructor(localPermissionsData: PermissionsData) {
    this.localPermissions = normalizePermissions(localPermissionsData);
  }

  // Get all local permission names
  getAllPermissionNames(): string[] {
    return this.localPermissions.map((perm) => perm.name);
  }

  // Get all local permission IDs
  getAllPermissionIds(): number[] {
    return this.localPermissions.map((perm) => perm.id);
  }

  // Cross match API permissions with local permission list
  crossMatch(apiPermissions: ApiUserPermissions): Permission[] {
    return this.localPermissions.filter(
      (perm) =>
        apiPermissions.includes(perm.id) || apiPermissions.includes(perm.name),
    );
  }

  // Get permissions that are missing from the user compared to the local list
  getMissingPermissions(apiPermissions: ApiUserPermissions): Permission[] {
    return this.localPermissions.filter(
      (perm) =>
        !apiPermissions.includes(perm.id) &&
        !apiPermissions.includes(perm.name),
    );
  }

  // Check if the user has a specific permission by name or id
  hasPermission(
    apiPermissions: ApiUserPermissions,
    permission: string | number,
  ): boolean {
    return apiPermissions.includes(permission);
  }

  // Check if the user has all required permissions (by names or ids)
  hasPermissions(
    apiPermissions: ApiUserPermissions,
    requiredPermissions: Array<string | number>,
  ): boolean {
    return requiredPermissions.every((perm) => apiPermissions.includes(perm));
  }

  // Check if the user has at least one of the required permissions
  hasAnyPermission(
    apiPermissions: ApiUserPermissions,
    requiredPermissions: Array<string | number>,
  ): boolean {
    return requiredPermissions.some((perm) => apiPermissions.includes(perm));
  }

  // Get all permissions from a specific module
  getPermissionsByModule(moduleName: string): Permission[] {
    return this.localPermissions.filter((perm) => perm.module === moduleName);
  }

  // Get user permissions by module (from the API user permissions)
  getUserPermissionsByModule(
    apiPermissions: ApiUserPermissions,
    moduleName: string,
  ): Permission[] {
    return this.localPermissions.filter(
      (perm) =>
        perm.module === moduleName &&
        (apiPermissions.includes(perm.id) ||
          apiPermissions.includes(perm.name)),
    );
  }

  // Debug: Print all local permissions
  printLocalPermissions(): void {
    // console.log('Local Permissions:', this.localPermissions);
  }
}
