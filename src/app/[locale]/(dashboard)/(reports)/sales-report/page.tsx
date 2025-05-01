import { api } from '@/server/api';
import { SALES_REPORT } from '@/server/services/sales';
import { ISalesReportRoot } from '@/types/sales-report-interface';
import SalesReportPageWrapper from '@/components/reports/sales/SalesReportPageWrapper';

const SalesReportPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ format: string }>;
}) => {
  const queryParams = await searchParams;

  const salesReportUrl = `${SALES_REPORT.GET.URL}?format=${queryParams?.format ?? ''}`;

  const salesReport = await api.get<ISalesReportRoot>(
    salesReportUrl,
    SALES_REPORT.GET.TAGS,
  );
  return <SalesReportPageWrapper salesReport={salesReport} />;
};

export default SalesReportPage;
