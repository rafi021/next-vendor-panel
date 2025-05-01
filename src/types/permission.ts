export type Permission = {
  id: number;
  name: string;
  module: string;
};

export type GroupedPermissions = {
  [module: string]: Permission[];
};

export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
};

export type RoleAndPermissionsList = {
  roles: string[] | [];
  permissions: string[] | [];
};
