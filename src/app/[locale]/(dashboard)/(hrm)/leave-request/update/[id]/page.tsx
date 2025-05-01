import { api } from '@/server/api';
import { ILeaveRequest } from '@/types/leave-request-interface';
import { LEAVE_REQUESTS } from '@/server/services/leave-request';
import { IEmployeesData } from '@/types/employee-interface';
import { EMPLOYEES } from '@/server/services/employee';
import { IDepartmentsData } from '@/types/department-interface';
import { DEPARTMENT } from '@/server/services/department';
import { ILeaveTypesData } from '@/types/leave-type-interface';
import { LEAVE_TYPES } from '@/server/services/leave-types';
import AddLeaveRequestForm from '@/components/hrm/leave-request/AddLeaveRequestForm';

const LeaveRequestUpdatePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const LeaveRequestData = await api.get<ApiResponse<ILeaveRequest>>(
    `${LEAVE_REQUESTS.GET.URL}/${id}`,
    LEAVE_REQUESTS.GET.TAGS,
  );

  const employees = await api.get<ApiResponse<IEmployeesData, null>>(
    EMPLOYEES.GET.LIST.URL,
    EMPLOYEES.GET.LIST.TAGS,
  );
  const departments = await api.get<ApiResponse<IDepartmentsData, null>>(
    DEPARTMENT.GET.URL,
    DEPARTMENT.GET.TAGS,
  );

  const leaveTypes = await api.get<ApiResponse<ILeaveTypesData, null>>(
    LEAVE_TYPES.GET.URL,
    LEAVE_TYPES.GET.TAGS,
  );

  return (
    <AddLeaveRequestForm
      employees={employees?.data?.data}
      departments={departments?.data?.data}
      leaveTypes={leaveTypes?.data?.data}
      data={LeaveRequestData?.data}
      title="Add Leave Request"
    />
  );
};

export default LeaveRequestUpdatePage;
