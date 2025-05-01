import { IDashboardMetadata } from '@/types/dashboard-interface';
import { Card, CardContent } from '@/components/ui/card';
import {
  CreditCard,
  TrendingUp,
  Info,
  CircleDollarSign,
  Box,
  Undo2,
  CircleCheck,
  CirclePause,
  CircleEllipsis,
  ShoppingBag,
  CircleX,
  HandCoins,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import DatePicker from '../common/forms/DatePicker';

const SummaryDataCard = ({
  dashboardSummaryData,
}: {
  dashboardSummaryData: IDashboardMetadata;
}) => {
  // Format currency with Taka symbol
  const formatCurrency = (amount: number): string => {
    return `৳${amount?.toLocaleString() || 0}`;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-space12">
        <div className="py-space12 px-space16 bg-gradient-to-b from-[#FAFFFD] via-[#FFFDFA] to-[#FAFCFF] shadow-sm rounded-lg">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
            <HandCoins size={20} color="#FF920F" />
            <h1 className="font-semibold text-sm">TOTAL BALANCE</h1>
            <span className="text-black font-semibold text-xl">
              {formatCurrency(dashboardSummaryData?.total_balance)}
            </span>
          </div>
        </div>
        <div>{/* <DatePicker value={new Date()} onChange={() => {}} /> */}</div>
      </div>
      <Card className="w-full bg-gradient-to-b from-[#FAFFFD] via-[#FFFDFA] to-[#FAFCFF] shadow-sm rounded-lg text-sm font-medium">
        {/* Mobile view - Single column */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            {/* First column */}
            <div className="space-y-6">
              <div className="border-b pb-6 space-y-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <div className="text-[#FF920F]">
                    <ShoppingBag size={18} color="#FF920F" />
                  </div>
                  <span className="text-green-500">
                    {/* {dashboardSummaryData?.today_total_orders} */}
                  </span>
                  {`TODAY'S ORDERS`}
                </div>
                <article className="flex items-center gap-2">
                  <p className="text-black text-lg font-semibold">
                    {formatCurrency(
                      dashboardSummaryData?.today_total_order_amount,
                    )}
                  </p>
                </article>
              </div>
              <div className="border-b pb-6 space-y-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <div className="text-green-500">
                    <ShoppingBag size={18} color="#FF920F" />
                  </div>
                  <span className="text-green-500">
                    {dashboardSummaryData?.total_orders}
                  </span>
                  TOTAL ORDERS
                </div>
                <article className="flex items-center gap-2">
                  <p className="text-black text-lg font-semibold">
                    {formatCurrency(dashboardSummaryData?.total_order_amount)}
                  </p>
                </article>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <div className="text-green-500">
                    <CircleEllipsis size={18} color="#FF920F" />
                  </div>
                  <span className="text-green-500">
                    {dashboardSummaryData?.pending_orders}
                  </span>
                  PENDING ORDERS
                </div>
                <article className="flex items-center gap-2">
                  <p className="text-black text-lg font-semibold">
                    {formatCurrency(dashboardSummaryData?.pending_order_amount)}
                  </p>
                </article>
              </div>
            </div>

            {/* Second column */}
            <div className="space-y-6">
              <div className="border-b pb-6 space-y-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <div className="text-[#FF920F]">
                    <CirclePause size={18} color="#FF920F" />
                  </div>
                  <span className="text-green-500">
                    {dashboardSummaryData?.on_hold_orders}
                  </span>
                  ON HOLD ORDERS
                </div>
                <article className="flex items-center gap-2">
                  <p className="text-black text-lg font-semibold">
                    {formatCurrency(dashboardSummaryData?.on_hold_order_amount)}
                  </p>
                </article>
              </div>
              <div className="border-b pb-6 space-y-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <div className="text-[#FF920F]">
                    <CircleCheck size={18} color="#FF920F" />
                  </div>
                  <span className="text-green-500">
                    {dashboardSummaryData?.approved_orders}
                  </span>
                  APPROVED ORDERS
                </div>
                <article className="flex items-center gap-2">
                  <p className="text-black text-lg font-semibold">
                    {formatCurrency(
                      dashboardSummaryData?.approved_order_amount,
                    )}
                  </p>
                </article>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <div className="text-[#FF920F]">
                    <Undo2 size={18} color="#FF920F" />
                  </div>
                  <span className="text-green-500">
                    {dashboardSummaryData?.returned_orders}
                  </span>
                  RETURNED ORDERS
                </div>
                <article className="flex items-center gap-2">
                  <p className="text-black text-lg font-semibold">
                    {formatCurrency(
                      dashboardSummaryData?.returned_order_amount,
                    )}
                  </p>
                </article>
              </div>
            </div>

            {/* Third column */}
            <div className="space-y-6">
              <div className="border-b pb-6 space-y-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <div className="text-green-500">
                    <Box size={18} color="#FF920F" />
                  </div>
                  <span className="text-green-500">
                    {dashboardSummaryData?.total_products}
                  </span>
                  ITEMS
                </div>
                <article className="flex items-center gap-2">
                  <p className="text-black text-lg font-semibold">
                    {dashboardSummaryData?.total_quantity} Quantity
                  </p>
                </article>
              </div>
              <div className="border-b pb-6 space-y-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <div className="text-[#FF920F]">
                    <CircleDollarSign size={18} color="#FF920F" />
                  </div>
                  STOCK VALUE
                </div>
                <article className="flex items-center gap-2">
                  <p className="text-black text-lg font-semibold">
                    {formatCurrency(dashboardSummaryData?.stock_value)}
                  </p>
                </article>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <div className="text-[#FF920F]">
                    <CircleX size={18} color="#FF920F" />
                  </div>
                  <span className="text-green-500">
                    {dashboardSummaryData?.total_damage_quantity}
                  </span>
                  DAMAGE
                </div>
                <article className="flex items-center gap-2">
                  <p className="text-black text-lg font-semibold">
                    {formatCurrency(dashboardSummaryData?.total_damage_amount)}
                  </p>
                </article>
              </div>
            </div>

            {/* Fourth column */}
            <div className="space-y-6">
              <div className="border-b pb-6 space-y-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <div className="text-[#FF920F]">
                    <CreditCard size={18} color="#FF920F" />
                  </div>
                  TOTAL EXPENSE
                </div>
                <article className="flex items-center gap-2">
                  <p className="text-black text-lg font-semibold">
                    {formatCurrency(dashboardSummaryData?.totalExpenses)}
                  </p>
                </article>
              </div>
              <div className="border-b pb-6 space-y-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <div className="text-[#FF920F]">
                    <CreditCard size={18} color="#FF920F" />
                  </div>
                  NET PROFIT
                </div>
                <article className="flex items-center gap-2">
                  <p className="text-black text-lg font-semibold">
                    {formatCurrency(dashboardSummaryData?.net_profit)}
                  </p>
                </article>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <div className="text-[#FF920F]">
                    <TrendingUp size={18} color="#FF920F" />
                  </div>
                  ROI
                </div>
                <article className="flex items-center justify-between">
                  <p className="text-black text-lg font-semibold">
                    {dashboardSummaryData?.roi || 5}%
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="ml-2">
                        <div>
                          <Info />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs bg-black text-white p-2 rounded">
                        <p>
                          ROI = (Sale Profit / (Purchase Cost of Sold Item +
                          Expense)) * 100%
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </article>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop view - 4 columns */}
        <div className="hidden lg:grid grid-cols-4 gap-5 px-4 py-4">
          <CardContent className="space-y-8 border-r border-gray-300 px-4 py-6">
            <div className="border-b pb-10 space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
                <div className="text-[#FF920F]">
                  <ShoppingBag size={19} color="#FF920F" />
                </div>
                <span className="text-green-500">
                  {dashboardSummaryData?.today_total_orders}
                </span>
                {`TODAY'S ORDERS`}
              </div>
              <article className="flex items-center gap-2">
                <p className="text-black text-xl font-semibold">
                  {formatCurrency(
                    dashboardSummaryData?.today_total_order_amount,
                  )}
                </p>
              </article>
            </div>
            <div className="border-b pb-10 space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
                <div className="text-[#FF920F]">
                  <ShoppingBag size={19} color="#FF920F" />
                </div>
                <span className="text-green-500">
                  {dashboardSummaryData?.total_orders}
                </span>
                TOTAL ORDERS
              </div>
              <article className="flex items-center gap-2">
                <p className="text-black text-xl font-semibold">
                  {formatCurrency(dashboardSummaryData?.total_order_amount)}
                </p>
              </article>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
                <div className="text-[#FF920F]">
                  <CircleEllipsis size={19} color="#FF920F" />
                </div>
                <span className="text-green-500">
                  {dashboardSummaryData?.pending_orders}
                </span>{' '}
                PENDING ORDERS
              </div>
              <article className="flex items-center gap-2">
                <p className="text-black text-xl font-semibold">
                  {formatCurrency(dashboardSummaryData?.pending_order_amount)}
                </p>
              </article>
            </div>
          </CardContent>

          <CardContent className="space-y-8 border-r border-gray-300 px-4 py-6">
            <div className="border-b pb-10 space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
                <div className="text-[#FF920F]">
                  <CirclePause size={19} color="#FF920F" />
                </div>
                <span className="text-green-500">
                  {dashboardSummaryData?.on_hold_orders}
                </span>{' '}
                ON HOLD ORDERS
              </div>
              <article className="flex items-center gap-2">
                <p className="text-black text-xl font-semibold">
                  {formatCurrency(dashboardSummaryData?.on_hold_order_amount)}
                </p>
              </article>
            </div>
            <div className="border-b pb-10 space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
                <div className="text-[#FF920F]">
                  <CircleCheck size={19} color="#FF920F" />
                </div>
                <span className="text-green-500">
                  {dashboardSummaryData?.approved_orders}
                </span>{' '}
                APPROVED ORDERS
              </div>
              <article className="flex items-center gap-2">
                <p className="text-black text-xl font-semibold">
                  {formatCurrency(dashboardSummaryData?.approved_order_amount)}
                </p>
              </article>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
                <div className="text-green-500">
                  <Undo2 size={19} color="#FF920F" />
                </div>
                <span className="text-green-500">
                  {dashboardSummaryData?.returned_orders}
                </span>{' '}
                RETURNED ORDERS
              </div>
              <article className="flex items-center gap-2">
                <p className="text-black text-xl font-semibold">
                  {formatCurrency(dashboardSummaryData?.returned_order_amount)}
                </p>
              </article>
            </div>
          </CardContent>

          <CardContent className="space-y-8 border-r border-gray-300 px-4 py-6">
            <div className="border-b pb-10 space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
                <div className="text-green-500">
                  <Box size={19} color="#FF920F" />
                </div>
                <span className="text-green-500">
                  {dashboardSummaryData?.total_products}
                </span>{' '}
                ITEMS
              </div>
              <article className="flex items-center gap-2">
                <p className="text-black text-xl font-semibold">
                  {dashboardSummaryData?.total_quantity} Quantity
                </p>
              </article>
            </div>
            <div className="border-b pb-10 space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
                <div className="text-[#FF920F]">
                  <CircleDollarSign size={19} color="#FF920F" />
                </div>
                STOCK VALUE
              </div>
              <article className="flex items-center gap-2">
                <p className="text-black text-xl font-semibold">
                  {formatCurrency(dashboardSummaryData?.stock_value)}
                </p>
              </article>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
                <div className="text-[#FF920F]">
                  <CircleX size={19} color="#FF920F" />
                </div>
                <span className="text-green-500">
                  {dashboardSummaryData?.total_damage_quantity}
                </span>{' '}
                DAMAGE
              </div>
              <article className="flex items-center gap-2">
                <p className="text-black text-xl font-semibold">
                  {formatCurrency(dashboardSummaryData?.total_damage_amount)}
                </p>
              </article>
            </div>
          </CardContent>

          <CardContent className="space-y-8 py-6">
            <div className="border-b pb-10 space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
                <div className="text-[#FF920F]">
                  <CreditCard size={19} color="#FF920F" />
                </div>
                TOTAL EXPENSE
              </div>
              <article className="flex items-center gap-2">
                <p className="text-black text-xl font-semibold">
                  {formatCurrency(dashboardSummaryData?.totalExpenses)}
                </p>
              </article>
            </div>
            <div className="border-b pb-10 space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
                <div className="text-[#FF920F]">
                  <CreditCard size={19} color="#FF920F" />
                </div>
                NET PROFIT
              </div>
              <article className="flex items-center gap-2">
                <p className="text-black text-xl font-semibold">
                  {formatCurrency(dashboardSummaryData?.net_profit)}
                </p>
              </article>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-xs xl:text-sm font-medium">
                <div className="text-[#FF920F]">
                  <TrendingUp size={19} color="#FF920F" />
                </div>
                ROI{' '}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="text-gray-400">
                        <Info size={16} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-white p-2 rounded">
                      <p>
                        ROI = (Sale Profit / (Purchase Cost of Sold Item +
                        Expense)) * 100%
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <article className="flex items-center justify-between">
                <p className="text-black text-xl font-semibold">
                  {dashboardSummaryData?.roi || 5}%
                </p>
              </article>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default SummaryDataCard;
