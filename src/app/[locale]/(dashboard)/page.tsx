import { api } from '@/server/api';
import { DASHBOARD } from '@/server/services/dashboard';
import { IDashboardRoot } from '@/types/dashboard-interface';
import DashboardPageWrapper from '@/components/dashboard/DashboardPageWrapper';

const DashboardPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ format: string }>;
}) => {
  const queryParams = await searchParams;
  const dashboardUrl = `${DASHBOARD.GET.URL}?format=${queryParams?.format ?? ''}`;

  const dashboardData = await api.get<IDashboardRoot>(
    dashboardUrl,
    DASHBOARD.GET.TAGS,
  );
  return <DashboardPageWrapper dashboardData={dashboardData} />;
};

export default DashboardPage;
