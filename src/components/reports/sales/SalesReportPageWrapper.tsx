import EmptyTableData from '@/components/common/EmptyTableData';

import SalesDataCard from './SalesDataCard';
import { ISalesReportRoot } from '@/types/sales-report-interface';
import SalesDataTable from './SalesDataTable';
import SalesChart from './SalesChart';

const SalesReportPageWrapper = ({
  salesReport,
}: {
  salesReport: ISalesReportRoot;
}) => {
  return (
    <div className="space-y-4">
      <SalesDataCard salesReport={salesReport?.metadata} />
      {salesReport?.data?.data?.length > 0 ? (
        <SalesDataTable salesReport={salesReport} />
      ) : (
        <EmptyTableData
          title="There is no sales data here yet!"
          description="Create your sales to your shop and adjust them as you wish."
          action={''}
        />
      )}
      <SalesChart categorySales={salesReport?.metadata?.categorySales} />
    </div>
  );
};

export default SalesReportPageWrapper;
