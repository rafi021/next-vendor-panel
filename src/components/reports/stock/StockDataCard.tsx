'use client';

import { IStockReportMetadata } from '@/types/stock-report-interface';

const StockDataCard = ({
  stockReport,
}: {
  stockReport: IStockReportMetadata;
}) => {
  // Format currency with Taka symbol
  const formatCurrency = (amount: number): string => {
    return `৳${amount.toLocaleString()}`;
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 text-sm font-medium">
      <div className="px-6 py-4 bg-gradient-to-b from-[#FAFFFD] via-[#FFFDFA] to-[#FAFCFF] gap-5 shadow-sm rounded-lg md:w-2/5">
        <div className="border-b pb-6 space-y-1">
          <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
            <div className="text-[#008000]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 20H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2Z" />
                  <path
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 14a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1"
                  />
                  <path d="M18 7V5.603a2 2 0 0 0-2.515-1.932l-11 2.933A2 2 0 0 0 3 8.537V9" />
                </g>
              </svg>
            </div>
            TOTAL STOCK AMOUNT
          </div>
          <p className="text-black text-lg font-semibold">
            {formatCurrency(stockReport?.total_stock_amount)}
          </p>
        </div>
        <div className="border-b py-4 space-y-1">
          <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
            <div className="text-[#FF920F]">
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3332 12.0013L15.8332 9.5013M15.8332 9.5013L18.3332 12.0013M15.8332 9.5013V14.5013M18.3332 5.33464H1.6665M18.3332 7.0013V3.83464C18.3332 2.90122 18.3332 2.43451 18.1515 2.07799C17.9917 1.76438 17.7368 1.50941 17.4232 1.34963C17.0666 1.16797 16.5999 1.16797 15.6665 1.16797H4.33317C3.39975 1.16797 2.93304 1.16797 2.57652 1.34962C2.26292 1.50941 2.00795 1.76438 1.84816 2.07798C1.6665 2.4345 1.6665 2.90121 1.6665 3.83464V10.168C1.6665 11.1014 1.6665 11.5681 1.84816 11.9246C2.00795 12.2382 2.26292 12.4932 2.57652 12.653C2.93304 12.8346 3.39975 12.8346 4.33317 12.8346H9.99984"
                  stroke="#FF920F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            TOTAL SALE AMOUNT
          </div>

          <p className="text-black text-xl font-semibold">
            {formatCurrency(stockReport?.total_sell_amount)}
          </p>
        </div>
        <div className="pt-6 space-y-1">
          <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
            <div className="text-[#FF920F]">
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49984 12.1654L9.99984 14.6654M9.99984 14.6654L12.4998 12.1654M9.99984 14.6654V8.83203M18.3332 5.4987H1.6665M4.58317 12.9987H4.33317C3.39975 12.9987 2.93304 12.9987 2.57652 12.817C2.26292 12.6573 2.00795 12.4023 1.84816 12.0887C1.6665 11.7322 1.6665 11.2655 1.6665 10.332V3.9987C1.6665 3.06528 1.6665 2.59857 1.84816 2.24205C2.00795 1.92844 2.26292 1.67348 2.57652 1.51369C2.93304 1.33203 3.39975 1.33203 4.33317 1.33203H15.6665C16.5999 1.33203 17.0666 1.33203 17.4232 1.51369C17.7368 1.67348 17.9917 1.92844 18.1515 2.24205C18.3332 2.59857 18.3332 3.06528 18.3332 3.9987V10.332C18.3332 11.2655 18.3332 11.7322 18.1515 12.0887C17.9917 12.4023 17.7368 12.6573 17.4232 12.817C17.0666 12.9987 16.5999 12.9987 15.6665 12.9987H15.4165"
                  stroke="#FF920F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            TOTAL DAMAGE AMOUNT
          </div>
          <p className="text-black text-xl font-semibold">
            {formatCurrency(stockReport?.damage_total)}
          </p>
        </div>
      </div>
      <div className="w-full px-4 py-4 bg-gradient-to-b from-[#FAFFFD] via-[#FFFDFA] to-[#FAFCFF] grid grid-cols-2 gap-5 shadow-sm rounded-lg text-sm font-medium">
        <div className="space-y-8 border-r border-gray-300 px-4 py-6">
          <div className="border-b space-y-1 pb-10">
            <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
              <div className="text-[#FF920F]">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0833 5.31331L8.99997 9.2485M8.99997 9.2485L1.91664 5.31331M8.99997 9.2485L9 17.1652M10.6667 16.6559L9.64753 17.2221C9.41119 17.3534 9.29302 17.4191 9.16788 17.4448C9.05712 17.4676 8.94288 17.4676 8.83213 17.4448C8.70698 17.4191 8.58881 17.3534 8.35248 17.2221L2.18581 13.7962C1.93621 13.6575 1.8114 13.5882 1.72053 13.4896C1.64013 13.4023 1.57929 13.2989 1.54207 13.1863C1.5 13.059 1.5 12.9162 1.5 12.6307V5.8664C1.5 5.58086 1.5 5.43809 1.54207 5.31076C1.57929 5.19811 1.64013 5.09471 1.72053 5.00747C1.8114 4.90886 1.93621 4.83952 2.18581 4.70085L8.35248 1.27493C8.58881 1.14363 8.70698 1.07798 8.83213 1.05224C8.94288 1.02946 9.05712 1.02946 9.16788 1.05224C9.29302 1.07798 9.41119 1.14363 9.64753 1.27493L15.8142 4.70085C16.0638 4.83952 16.1886 4.90885 16.2795 5.00747C16.3599 5.09471 16.4207 5.19811 16.4579 5.31076C16.5 5.43809 16.5 5.58086 16.5 5.8664L16.5 9.66519M5.25 2.99852L12.75 7.16519M12.3333 14.2485L14 15.9152L17.3333 12.5819"
                    stroke="#FF920F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              TOTAL PRODUCT
            </div>
            <p className="text-black text-xl font-semibold">
              {stockReport?.total_products}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
              <div className="text-[#FF920F]">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0833 5.81331L8.99997 9.7485M8.99997 9.7485L1.91664 5.81331M8.99997 9.7485L9 17.6652M10.6667 17.1559L9.64753 17.7221C9.41119 17.8534 9.29302 17.9191 9.16788 17.9448C9.05712 17.9676 8.94288 17.9676 8.83213 17.9448C8.70698 17.9191 8.58881 17.8534 8.35248 17.7221L2.18581 14.2962C1.93621 14.1575 1.8114 14.0882 1.72053 13.9896C1.64013 13.9023 1.57929 13.7989 1.54207 13.6863C1.5 13.559 1.5 13.4162 1.5 13.1307V6.3664C1.5 6.08086 1.5 5.93809 1.54207 5.81076C1.57929 5.69811 1.64013 5.59471 1.72053 5.50747C1.8114 5.40886 1.93621 5.33952 2.18581 5.20085L8.35248 1.77493C8.58881 1.64363 8.70698 1.57798 8.83213 1.55224C8.94288 1.52946 9.05712 1.52946 9.16788 1.55224C9.29302 1.57798 9.41119 1.64363 9.64753 1.77493L15.8142 5.20085C16.0638 5.33952 16.1886 5.40885 16.2795 5.50747C16.3599 5.59471 16.4207 5.69811 16.4579 5.81076C16.5 5.93809 16.5 6.08086 16.5 6.3664L16.5 10.1652M5.25 3.49852L12.75 7.66519M12.3333 14.7485L14 16.4152L17.3333 13.0819"
                    stroke="#FF920F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              TOTAL STOCK
            </div>
            <p className="text-black text-xl font-semibold">
              {stockReport?.total_quantity}
            </p>
          </div>
        </div>
        <div className="space-y-8 py-6">
          <div className="border-b space-y-1 pb-10">
            <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
              <div className="text-[#FF920F]">
                <svg
                  width="17"
                  height="19"
                  viewBox="0 0 17 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5833 5.31331L8.49997 9.2485M8.49997 9.2485L1.41664 5.31331M8.49997 9.2485L8.5 17.1652M16 12.6307V5.8664C16 5.58086 16 5.43809 15.9579 5.31076C15.9207 5.19811 15.8599 5.09471 15.7795 5.00747C15.6886 4.90885 15.5638 4.83952 15.3142 4.70085L9.14753 1.27493C8.91119 1.14363 8.79302 1.07798 8.66788 1.05224C8.55712 1.02946 8.44288 1.02946 8.33213 1.05224C8.20698 1.07798 8.08881 1.14363 7.85248 1.27493L1.68581 4.70085C1.43621 4.83952 1.3114 4.90886 1.22053 5.00747C1.14013 5.09471 1.07929 5.19811 1.04207 5.31076C1 5.43809 1 5.58086 1 5.8664V12.6307C1 12.9162 1 13.059 1.04207 13.1863C1.07929 13.2989 1.14013 13.4023 1.22053 13.4896C1.3114 13.5882 1.43621 13.6575 1.68581 13.7962L7.85248 17.2221C8.08881 17.3534 8.20698 17.4191 8.33213 17.4448C8.44288 17.4676 8.55712 17.4676 8.66788 17.4448C8.79302 17.4191 8.91119 17.3534 9.14753 17.2221L15.3142 13.7962C15.5638 13.6575 15.6886 13.5882 15.7795 13.4896C15.8599 13.4023 15.9207 13.2989 15.9579 13.1863C16 13.059 16 12.9162 16 12.6307Z"
                    stroke="#FF920F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              TOTAL SOLD ITEMS
            </div>
            <p className="text-black text-xl font-semibold">
              {stockReport?.total_sold_quantity}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
              <div className="text-[#FF920F]">
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5833 5.81331L8.49997 9.7485M8.49997 9.7485L1.41664 5.81331M8.49997 9.7485L8.5 17.6652M16 10.1652L16 6.3664C16 6.08086 16 5.93809 15.9579 5.81076C15.9207 5.69811 15.8599 5.59471 15.7795 5.50747C15.6886 5.40885 15.5638 5.33952 15.3142 5.20085L9.14753 1.77493C8.91119 1.64363 8.79302 1.57798 8.66788 1.55224C8.55712 1.52946 8.44288 1.52946 8.33213 1.55224C8.20698 1.57798 8.08881 1.64363 7.85248 1.77493L1.68581 5.20085C1.43621 5.33952 1.3114 5.40886 1.22053 5.50747C1.14013 5.59471 1.07929 5.69811 1.04207 5.81076C1 5.93809 1 6.08086 1 6.3664V13.1307C1 13.4162 1 13.559 1.04207 13.6863C1.07929 13.7989 1.14013 13.9023 1.22053 13.9896C1.3114 14.0882 1.43621 14.1575 1.68581 14.2962L7.85248 17.7221C8.08881 17.8534 8.20698 17.9191 8.33213 17.9448C8.44288 17.9676 8.55712 17.9676 8.66788 17.9448C8.79302 17.9191 8.91119 17.8534 9.14753 17.7221L9.33333 17.6189M4.75 3.49852L12.25 7.66519M12.25 13.0819L16.4167 17.2485M16.4167 13.0819L12.25 17.2485"
                    stroke="#FF920F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              TOTAL DAMAGED ITEMS
            </div>
            <p className="text-black text-xl font-semibold">
              {stockReport?.total_damaged_quantity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDataCard;
