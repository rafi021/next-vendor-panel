import { api } from '@/server/api';
import { LEAVE_REQUESTS } from '@/server/services/leave-request';
import { ILeaveRequestsData } from '@/types/leave-request-interface';
import LeaveRequestPageWrapper from '@/components/hrm/leave-request/LeaveRequestPageWrapper';

const LeaveRequestPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ sort: string }>;
}) => {
  const queryParams = await searchParams;
 
  const leaveRequests = await api.get<ApiResponse<ILeaveRequestsData>>(
    LEAVE_REQUESTS.GET.URL,
    LEAVE_REQUESTS.GET.TAGS,
  );
  return <LeaveRequestPageWrapper leaveRequests={leaveRequests?.data} />;
};

export default LeaveRequestPage;
