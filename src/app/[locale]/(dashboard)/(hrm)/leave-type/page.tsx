import { api } from '@/server/api';
import { LEAVE_TYPES } from '@/server/services/leave-types';
import { ILeaveTypesData } from '@/types/leave-type-interface';
import LeaveTypePageWrapper from '@/components/hrm/leave-type/LeaveTypePageWrapper';

const LeaveTypePage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ sort: string }>;
}) => {
  const queryParams = await searchParams;
  
  const leaveTypes = await api.get<ApiResponse<ILeaveTypesData>>(
    LEAVE_TYPES.GET.URL,
    LEAVE_TYPES.GET.TAGS,
  );
  return <LeaveTypePageWrapper leaveTypes={leaveTypes?.data} />;
};

export default LeaveTypePage;
