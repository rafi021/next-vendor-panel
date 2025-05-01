'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SearchInput from '@/components/common/forms/SearchInput';
import SortAndFilterComponent from '@/components/common/SortAndFilterComponent';
import { DateSelect } from '@/components/common/DateSelect';
import { ISalesReportRoot } from '@/types/sales-report-interface';
import { Badge } from '@/components/ui/badge';
import { getStatusColor } from '@/utils/status-color';
import { FILTER_OPTIONS, SORT_OPTIONS } from '@/config/data';

const SalesDataTable = ({
  salesReport,
}: {
  salesReport?: ISalesReportRoot;
}) => {
  // Format currency with Taka symbol
  const formatCurrency = (amount?: number): string => {
    return `৳${(amount ?? 0).toLocaleString()}.00`;
  };

  // Use type assertion to handle data structure mismatches
  const metadata = salesReport?.metadata as any;

  // Helper function to safely convert potentially complex values to strings
  const safeToString = (value: any): string => {
    if (value === null || value === undefined) {
      return '-';
    }
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value);
    }
    if (typeof value === 'object') {
      // If it's an object, return a JSON string or a simpler representation
      try {
        // For simple objects that might have a name or id property
        if (value?.name) return String(value.name);
        if (value?.id) return String(value.id);

        // For more complex objects, stringify them
        return JSON.stringify(value);
      } catch (e) {
        return '[Object]';
      }
    }
    return String(value);
  };

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg text-sm font-medium">
      <div className="flex justify-between items-center border-gray-200">
        <div>
          <h1 className="text-lg font-semibold">Sales Report</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            <SearchInput wrapperClasses="h-[40px]" />
            <div className="relative flex">
              <SortAndFilterComponent
                label="Sort"
                triggerClassName="rounded-r-none"
                fields={SORT_OPTIONS}
                containerClassName="w-54 border-r-none"
              />
              <SortAndFilterComponent
                fields={FILTER_OPTIONS}
                triggerClassName="rounded-l-none"
                label="Filter"
              />
            </div>
            <DateSelect />
          </div>
        </div>
      </div>
      <section className="flex">
        <div className="w-full p-5 mt-6 bg-gradient-to-b from-[#FAFFFD] via-[#FFFDFA] to-[#FAFCFF] grid grid-cols-2 lg:grid-cols-6 gap-5 border rounded-lg">
          <div className="border-r">
            <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
              TOTAL SALE AMOUNT
            </div>
            <article className="flex items-center gap-2">
              <p className="text-black text-md xl:text-xl font-semibold">
                {formatCurrency(Number(metadata?.total_sale_by_date ?? 0))}
              </p>
            </article>
          </div>
          <div className="lg:border-r">
            <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
              TOTAL CARING COST
            </div>
            <article className="flex items-center gap-2">
              <p className="text-black text-md xl:text-xl font-semibold">
                {formatCurrency(
                  Number(metadata?.total_courier_cost_by_date ?? 0),
                )}
              </p>
            </article>
          </div>
          <div className="border-r">
            <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
              TOTAL SHIPPING COST
            </div>
            <article className="flex items-center gap-2">
              <p className="text-black text-md xl:text-xl font-semibold">
                {formatCurrency(
                  Number(metadata?.total_delivery_fee_by_date ?? 0),
                )}
              </p>
            </article>
          </div>
          <div className="lg:border-r">
            <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
              TOTAL PAID AMOUNT
            </div>
            <article className="flex items-center gap-2">
              <p className="text-black text-md xl:text-xl font-semibold">
                {formatCurrency(
                  Number(metadata?.total_paid_amount_by_date ?? 0),
                )}
              </p>
            </article>
          </div>
          <div className="border-r">
            <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
              TOTAL DUE AMOUNT
            </div>
            <article className="flex items-center gap-2">
              <p className="text-black text-md xl:text-xl font-semibold">
                {formatCurrency(
                  Number(metadata?.total_due_amount_by_date ?? 0),
                )}
              </p>
            </article>
          </div>
          <div className="">
            <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
              TOTAL PROFIT
            </div>
            <article className="flex items-center gap-2">
              <p className="text-black text-md xl:text-xl font-semibold">
                {formatCurrency(
                  Number(
                    metadata?.total_profit_by_date ??
                      metadata?.total_profit_by_data ??
                      0,
                  ),
                )}
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="overflow-x-auto mt-5">
        <Table className="w-full min-w-[1212px] rounded-t bg-white shadow-md">
          <TableHeader className="bg-gray-100">
            <TableRow className="text-left text-gray-500">
              <TableHead className="px-4 py-2"># SL</TableHead>
              <TableHead className="px-4 py-2">Invoice</TableHead>
              <TableHead className="px-4 py-2">Customer Name</TableHead>
              <TableHead className="px-4 py-2">Sale Amount</TableHead>
              <TableHead className="px-4 py-2">Shipping Cost</TableHead>
              <TableHead className="px-4 py-2">Caring Cost</TableHead>
              <TableHead className="px-4 py-2">Status</TableHead>
              <TableHead className="px-4 py-2">Paid Amount</TableHead>
              <TableHead className="px-4 py-2">Due Amount</TableHead>
              <TableHead className="px-4 py-2">Date</TableHead>
              <TableHead className="px-4 py-2">Payment Status</TableHead>
              <TableHead className="px-4 py-2">Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesReport?.data?.data?.map((item: any, index: number) => (
              <TableRow key={index} className="border-t border-gray-200">
                <TableCell className="px-4 py-2">
                  {safeToString(item?.id)}
                </TableCell>
                <TableCell className="px-4 py-2">
                  <span className="text-blue-600 hover:underline">
                    {safeToString(item?.tracking_number ?? '')}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-2">
                  {safeToString(item?.customer?.name)}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {formatCurrency(Number(item?.sale_amount))}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {formatCurrency(Number(item?.delivery_fee))}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {formatCurrency(Number(item?.courier_cost))}
                </TableCell>
                <TableCell className="px-4 py-2">
                  <Badge
                    className={`${getStatusColor(item?.sale_status)} capitalize`}
                  >
                    {item?.sale_status.split('_').join(' ')}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-2">
                  {formatCurrency(Number(item?.paid_amount ?? 0))}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {formatCurrency(Number(item?.due_amount ?? 0))}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {safeToString(item?.date ?? item?.created_at)}
                </TableCell>
                <TableCell className="px-4 py-2">
                  <Badge
                    className={`${getStatusColor(item?.payment_status)} capitalize`}
                  >
                    {item?.payment_status.split('_').join(' ')}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-2">
                  {formatCurrency(Number(item?.profit ?? 0))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default SalesDataTable;
