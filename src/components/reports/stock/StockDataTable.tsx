'use client';

import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Image } from '@/components/common/Image';
import StockReportExport from './StockReportExport';
import { DateSelect } from '@/components/common/DateSelect';
import { FILTER_OPTIONS, SORT_OPTIONS } from '@/config/data';
import SearchInput from '@/components/common/forms/SearchInput';
import { IStockReportRoot } from '@/types/stock-report-interface';
import SortAndFilterComponent from '@/components/common/SortAndFilterComponent';

const StockDataTable = ({ stockReport }: { stockReport: IStockReportRoot }) => {
  // Format currency with Taka symbol
  const formatCurrency = (amount: number): string => {
    return `৳${amount.toLocaleString()}.00`;
  };

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg text-sm font-medium">
      <div className="flex justify-between items-center border-gray-200">
        <div>
          {' '}
          <h1 className="text-lg font-semibold">Stock Report</h1>
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
            <StockReportExport />
          </div>
        </div>
      </div>
      <section className="flex">
        <div className="w-full p-5 mt-6 bg-gradient-to-b from-[#FAFFFD] via-[#FFFDFA] to-[#FAFCFF] grid grid-cols-2 lg:grid-cols-6 gap-5 border rounded-lg">
          <div className="border-r">
            <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
              TOTAL SOLD ITEMS
            </div>
            <article className="flex items-center gap-2">
              <p className="text-black text-md xl:text-xl font-semibold">
                {stockReport?.metadata?.total_sold_quantity_by_date}
              </p>
            </article>
          </div>
          <div className="lg:border-r">
            <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
              TOTAL SALE
            </div>
            <article className="flex items-center gap-2">
              <p className="text-black text-md xl:text-xl font-semibold">
                {stockReport?.metadata?.total_sale_by_date}
              </p>
            </article>
          </div>
          <div className="border-r">
            <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
              TOTAL STOCK
            </div>
            <article className="flex items-center gap-2">
              <p className="text-black text-md xl:text-xl font-semibold">
                {stockReport?.metadata?.total_stock_by_date}
              </p>
            </article>
          </div>
          <div className="lg:border-r">
            <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
              TOTAL STOCK AMOUNT
            </div>
            <article className="flex items-center gap-2">
              <p className="text-black text-md xl:text-xl font-semibold">
                {stockReport?.metadata?.total_stock_amount_by_date}
              </p>
            </article>
          </div>
          <div className="border-r">
            <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
              TOTAL DAMAGE
            </div>
            <article className="flex items-center gap-2">
              <p className="text-black text-md xl:text-xl font-semibold">
                {stockReport?.metadata?.total_damaged_quantity_by_date}
              </p>
            </article>
          </div>
          <div className="">
            <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
              TOTAL DAMAGED AMOUNT
            </div>
            <article className="flex items-center gap-2">
              <p className="text-black text-md xl:text-xl font-semibold">
                {stockReport?.metadata?.damage_total_by_date}
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
              <TableHead className="px-4 py-2">Product</TableHead>
              <TableHead className="px-4 py-2">Category</TableHead>
              {/* <TableHead className="px-4 py-2">SKU</TableHead> */}
              <TableHead className="px-4 py-2">Sold Items</TableHead>
              <TableHead className="px-4 py-2">Sale Amount</TableHead>
              <TableHead className="px-4 py-2">Stock</TableHead>
              <TableHead className="px-4 py-2">Stock Amount</TableHead>
              <TableHead className="px-4 py-2">Damage</TableHead>
              <TableHead className="px-4 py-2">Damage Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockReport?.data?.data?.map((item) => (
              <TableRow key={item.id} className="border-t border-gray-200">
                <TableCell className="px-4 py-2">{item.id}</TableCell>
                <TableCell className="px-4 py-2">
                  <Link href={`/product/edit/${item.id}`}>
                    <div className="text-sm flex items-center gap-1">
                      <Image
                        src={item?.thump_image}
                        alt={item?.name}
                        width={36}
                        height={36}
                      />
                      <p className="underline text-sm font-regular">
                        {item?.name}
                      </p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="px-4 py-2">
                  <div className="text-sm font-regular">
                    {item?.categories
                      ?.map((category) => category.name)
                      .join(', ')}
                  </div>
                </TableCell>
                {/* <TableCell className="px-4 py-2">{item.sku}</TableCell> */}
                <TableCell className="px-4 py-2">
                  {item?.sold_quantity}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {formatCurrency(item?.sale_amount || 0)}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {item?.stock_quantity}
                </TableCell>
                <TableCell className="px-4 py-2">
                  <span className="">{formatCurrency(item?.stock_amount)}</span>
                </TableCell>
                <TableCell className="px-4 py-2">
                  {item?.damage_quantity}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {formatCurrency(item?.damage_total || 0)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default StockDataTable;
