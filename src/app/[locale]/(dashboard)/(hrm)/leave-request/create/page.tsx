import { api } from '@/server/api';
import { EMPLOYEES } from '@/server/services/employee';
import { DEPARTMENT } from '@/server/services/department';
import { IEmployeesData } from '@/types/employee-interface';
import { LEAVE_TYPES } from '@/server/services/leave-types';
import { ILeaveTypesData } from '@/types/leave-type-interface';
import { IDepartmentsData } from '@/types/department-interface';
import AddLeaveRequestForm from '@/components/hrm/leave-request/AddLeaveRequestForm';

const LeaveRequestCreatePage = async () => {
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
      title="Add Leave Request"
    />
  );
};

export default LeaveRequestCreatePage;
