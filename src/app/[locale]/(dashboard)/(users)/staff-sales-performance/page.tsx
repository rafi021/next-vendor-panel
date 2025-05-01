import { api } from '@/server/api';
import { EMPLOYEES } from '@/server/services/employee';
import { IEmployeesData } from '@/types/employee-interface';
import StaffSalesPerformancePageWrapper from '@/components/users/staff-sales-performance/StaffSalesPerformancePageWrapper';

const StaffSalesPerformancePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; search: string; format: string }>;
}) => {
  const queryParams = await searchParams;
  const staffData = await api.get<ApiResponse<IEmployeesData>>(
    `${EMPLOYEES.GET.LIST.URL}?per_page=${5}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}&format=${queryParams?.format ?? ''}`,
    EMPLOYEES.GET.LIST.TAGS,
  );
  return <StaffSalesPerformancePageWrapper staffData={staffData?.data} />;
};

export default StaffSalesPerformancePage;
