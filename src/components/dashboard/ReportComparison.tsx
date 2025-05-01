'use client';

import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { FinanceChart } from './FinanceChart';
import { IDashboardRoot } from '@/types/dashboard-interface';

const ReportComparison = ({
  dashboardData,
}: {
  dashboardData: IDashboardRoot;
}) => {
  const [timeframe, setTimeframe] = useState<
    'Monthly' | 'Quarterly' | 'Yearly'
  >('Monthly');

  const totalOrders = dashboardData?.metadata?.total_orders;

  const data = {
    income: [
      150000, 140000, 160000, 100000, 140000, 150000, 160000, 170000, 160000,
      170000, 180000, 180000,
    ],
    expense: [
      140000, 130000, 130000, 150000, 140000, 140000, 130000, 140000, 150000,
      140000, 140000, 150000,
    ],
    profit: [
      280000, 260000, 270000, 250000, 220000, 220000, 180000, 270000, 280000,
      280000, 270000, 280000,
    ],
    months: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  };

  const getColorByPercentage = (percentage: number) => {
    if (percentage >= 70) {
      return '#0D2E83'; // Dark blue for high percentages (like 80%)
    } else if (percentage >= 50) {
      return '#06AED4'; // Light blue for medium-high percentages (like 59%)
    } else if (percentage >= 45) {
      return '#F04438'; // Orange/Red for medium percentages (like 46%)
    } else if (percentage >= 30) {
      return '#EAAA08'; // Yellow/Amber for medium-low percentages (like 40%)
    } else {
      return '#F97066'; // Red for low percentages (like 20%)
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4  font-sans">
      {/* Left panel - Top 5 Selling Zone */}
      <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Top 5 Selling Zone</h2>
          <p className="text-sm text-gray-500">Based on District</p>
        </div>

        {/* <div className="bg-gray-100 rounded-lg p-2 mb-4 relative">
          <div className="flex justify-center">
            <Image
              src="/bangladesh-map.png"
              alt="Bangladesh Map"
              className="w-64 h-64 opacity-80"
              width={256}
              height={256}
            />
          </div>

          <div className="absolute bottom-4 left-4 flex space-x-2">
            <button className="bg-white rounded-full p-2 shadow">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button className="bg-white rounded-full p-2 shadow">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </button>
          </div>
        </div> */}

        {/* Zone List */}
        <div className="space-y-4">
          {dashboardData?.data?.top_zones?.map((zone, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{zone?.zone_name}</p>
                <p className="text-sm text-gray-500">
                  {zone?.total_customers?.toLocaleString()} Customers
                </p>
              </div>
              <div className="flex items-center space-x-2 w-1/2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${((zone?.total_orders * 100) / totalOrders).toFixed(2)}%`,
                      backgroundColor: getColorByPercentage(
                        (zone?.total_orders * 100) / totalOrders,
                      ),
                    }}
                  />
                </div>
                <span className="text-xs font-medium">
                  {((zone?.total_orders * 100) / totalOrders).toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel - Financial Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6 w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Income Vs Expense Vs Profit
            </h2>
            <Info className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            {['Monthly', 'Quarterly', 'Yearly'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period as typeof timeframe)}
                className={`px-4 py-1 rounded-md transition-colors ${
                  timeframe === period
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-32">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#06AED4] rounded-full"></div>
              <p className="text-gray-500 font-normal flex items-center gap-1">
                Income <Info className="w-4 h-4 text-gray-400" />
              </p>
            </div>
            <span
              className="text-xl font-semibold"
              style={{ color: '#0D2E83' }}
            >
              ৳{dashboardData?.metadata?.total_chart_income}
            </span>
          </div>
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#16B364] rounded-full"></div>
              <p className="text-gray-500 font-normal flex items-center gap-1">
                Profit <Info className="w-4 h-4 text-gray-400" />
              </p>
            </div>
            <span
              className="text-xl font-semibold"
              style={{ color: '#0D2E83' }}
            >
              ৳{dashboardData?.metadata?.total_chart_profit}
            </span>
          </div>
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#EAAA08] rounded-full"></div>
              <p className="text-gray-500 font-normal flex items-center gap-1">
                Expense <Info className="w-4 h-4 text-gray-400" />
              </p>
            </div>
            <span
              className="text-xl font-semibold"
              style={{ color: '#0D2E83' }}
            >
              ৳{dashboardData?.metadata?.total_chart_expense}
            </span>
          </div>
        </div>

        <FinanceChart data={data} />
      </div>
    </div>
  );
};

export default ReportComparison;
