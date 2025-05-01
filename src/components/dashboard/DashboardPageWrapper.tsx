import TopLists from './TopList';
import SummaryDataCard from './SummaryDataCard';
import ReportComparison from './ReportComparison';
import { IDashboardRoot } from '@/types/dashboard-interface';
import { cookies } from 'next/headers';

const DashboardPageWrapper = async ({
  dashboardData,
}: {
  dashboardData: IDashboardRoot;
}) => {
  const cookieStore = await cookies();
  const user = cookieStore.get('user');
  const parsedUser = JSON.parse(user?.value || '{}');
  const shopId = parsedUser?.shop_id;

  return (
    <div className="bg-gray-100 py-space16">
      <h1 className="font-semibold md:text-lg pb-space12">
        Welcome, #S-{shopId} / ({parsedUser?.name}: {parsedUser?.phone})
      </h1>
      <SummaryDataCard dashboardSummaryData={dashboardData?.metadata} />
      <TopLists topListData={dashboardData?.data} />
      <ReportComparison dashboardData={dashboardData} />
    </div>
  );
};

export default DashboardPageWrapper;
