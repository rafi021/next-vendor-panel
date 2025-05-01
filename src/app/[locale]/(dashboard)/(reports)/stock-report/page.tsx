import { api } from '@/server/api';
import {
  STOCK_REPORT,
  STOCK_REPORT_EXPORT,
} from '@/server/services/stock-report';
import { IStockReportRoot } from '@/types/stock-report-interface';
import StockReportPageWrapper from '@/components/reports/stock/StockReportPageWrapper';

const StockReportPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ sort: string }>;
}) => {
  const queryParams = await searchParams;
  const stockReport = await api.get<IStockReportRoot>(
    STOCK_REPORT.GET.URL,
    STOCK_REPORT.GET.TAGS,
  );

  const stockReportExport = await api.get<IStockReportRoot>(
    STOCK_REPORT_EXPORT.GET.URL,
    STOCK_REPORT_EXPORT.GET.TAGS,
  );

  return <StockReportPageWrapper stockReport={stockReport} />;
};

export default StockReportPage;
