import { api } from '@/server/api';
import { Role } from '@/types/permission';
import { ROLES } from '@/server/services/roles';
import RolesPageWrapper from '@/components/hrm/roles/RolesPageWrapper';

const RolesPage = async () => {
  const rolesList = await api.get<ApiResponse<PaginateType<Role[]>>>(
    ROLES.GET.LIST.URL,
    ROLES.GET.LIST.TAGS,
  );

  return <RolesPageWrapper rolesList={rolesList.data} />;
};

export default RolesPage;
