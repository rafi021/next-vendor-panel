import { api } from '@/server/api';
import { DEPARTMENT } from '@/server/services/department';
import { IDepartmentsData } from '@/types/department-interface';
import DepartmentPageWrapper from '@/components/hrm/department/DepartmentPageWrapper';

const DepartmentPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page: string; search: string }>;
}) => {
  const queryParams = await searchParams;

  const departments = await api.get<ApiResponse<IDepartmentsData>>(
    `${DEPARTMENT.GET.URL}?per_page=${10}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}`,
    DEPARTMENT.GET.TAGS,
  );
  return <DepartmentPageWrapper departments={departments?.data} />;
};

export default DepartmentPage;
