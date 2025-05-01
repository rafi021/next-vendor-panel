import { api } from '@/server/api';
import { Role } from '@/types/permission';
import { Employee } from '@/types/UserType';
import { ROLES } from '@/server/services/roles';
import { EMPLOYEES } from '@/server/services/employee';
import EmployeePageWrapper from '@/components/users/employee/EmployeePageWrapper';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; search: string }>;
}) => {
  const queryParams = await searchParams;
  const employeeList = await api.get<ApiResponse<PaginateType<Employee[]>>>(
    `${EMPLOYEES.GET.LIST.URL}?per_page=${10}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}`,
    EMPLOYEES.GET.LIST.TAGS,
  );

  const rolesList = await api.get<ApiResponse<PaginateType<Role[]>>>(
    ROLES.GET.LIST.URL,
    ROLES.GET.LIST.TAGS,
  );

  return (
    <EmployeePageWrapper
      employeeList={employeeList.data}
      rolesList={rolesList.data.data}
    />
  );
};

export default page;
