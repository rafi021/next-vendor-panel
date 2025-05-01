import { api } from '@/server/api';
import { Role } from '@/types/permission';
import { ROLES } from '@/server/services/roles';
import RolesForm from '@/components/hrm/roles/RolesForm';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const role = await api.get<ApiResponse<Role>>(
    `${ROLES.GET.SINGLE.URL}/${id}`,
    ROLES.GET.SINGLE.TAGS,
  );
  return (
    <RolesForm
      data={{
        id: role.data.id,
        name: role.data.name,
        permissions: role.data.permissions.map((per) => per.name),
      }}
    />
  );
};

export default page;
