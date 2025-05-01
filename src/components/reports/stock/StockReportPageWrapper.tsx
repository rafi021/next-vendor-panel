'use client';

import StockDataCard from './StockDataCard';
import StockDataTable from './StockDataTable';
import EmptyTableData from '@/components/common/EmptyTableData';

import { IStockReportRoot } from '@/types/stock-report-interface';

const StockReportPageWrapper = ({
  stockReport
}: {
  stockReport: IStockReportRoot;

}) => {
  return (
    <div className="space-y-4">
      <StockDataCard stockReport={stockReport?.metadata} />
      {stockReport?.data?.data?.length > 0 ? (
        <StockDataTable stockReport={stockReport} />
      ) : (
        <EmptyTableData
          title="There is no stock data here yet!"
          description="Create your stock to your shop and adjust them as you wish."
          action={''}
        />
      )}
    </div>
  );
};

export default StockReportPageWrapper;
