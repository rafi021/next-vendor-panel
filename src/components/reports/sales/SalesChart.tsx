'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info } from 'lucide-react';
import { ICategorySale } from '@/types/sales-report-interface';
import { useQueryState } from 'nuqs';
import { SALES_REPORT } from '@/server/services/sales';
import { api } from '@/server/api';

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(
  () => import('react-apexcharts').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="h-[350px] flex items-center justify-center">
        Loading chart...
      </div>
    ),
  },
);

interface SalesChartProps {
  categorySales: ICategorySale[];
}

const SalesChart = ({
  categorySales: initialCategorySales,
}: SalesChartProps) => {
  const [formatQuery, setFormatQuery] = useQueryState('format', {
    shallow: false,
    defaultValue: 'yearly',
  });

  // State for current category sales data
  const [categorySales, setCategorySales] =
    useState<ICategorySale[]>(initialCategorySales);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch category data based on selected format
  const fetchCategoryData = async (format: string) => {
    try {
      setIsLoading(true);
      const response = await api.get<
        ApiResponse<ICategorySale[], { categorySales: ICategorySale[] }>
      >(`${SALES_REPORT.GET.URL}?format=${format}`);
      if (response?.metadata?.categorySales) {
        setCategorySales(response?.metadata?.categorySales);
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setFormatQuery(value);
    fetchCategoryData(value);
  };

  // Initial data fetch
  useEffect(() => {
    if (formatQuery !== 'monthly') {
      fetchCategoryData(formatQuery);
    }
  }, []);

  // Purchase chart options
  const purchaseChartOptions = {
    chart: {
      height: 350,
      type: 'line' as const,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [5, 7, 5],
      curve: 'straight' as const,
      dashArray: [0, 8, 5],
    },
    title: {
      text: '',
    },
    legend: {
      show: false,
      tooltipHoverFormatter: function (val: string, opts: any) {
        return (
          val +
          ' - <strong>' +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          '</strong>'
        );
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: [
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
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val: string) {
              return val + ' (mins)';
            },
          },
        },
        {
          title: {
            formatter: function (val: string) {
              return val + ' per session';
            },
          },
        },
        {
          title: {
            formatter: function (val: string) {
              return val;
            },
          },
        },
      ],
    },
    grid: {
      borderColor: '#f1f1f1',
    },
  };

  const purchaseChartSeries = [
    {
      color: '#06AED4',
      name: "Today's Purchase",
      data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
    },
    {
      color: '#16B364',
      name: 'Total Purchase',
      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
    },
    {
      color: '#F04438',
      name: 'Total Due',
      data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
    },
  ];

  // Process category data from API
  const categoryNames = categorySales?.map((item) => item.name) || [];
  const categorySaleValues =
    categorySales?.map((item) => item.total_sale_price) || [];

  // Calculate total sales amount
  const totalSaleAmount = categorySaleValues.reduce(
    (sum, value) => sum + (value || 0),
    0,
  );

  // Default colors for categories
  const categoryColors = [
    '#EAAA08',
    '#2970FF',
    '#7A5AF8',
    '#F04438',
    '#17B26A',
  ];

  // Format currency for category display
  const formatCurrency = (amount: number): string => {
    return `৳${amount.toLocaleString()}.00`;
  };

  // Get title based on format query
  const getCategoryTitle = () => {
    switch (formatQuery) {
      case 'monthly':
        return 'Category Wise Sales';
      case 'quarterly':
        return 'Category Wise Sales';
      case 'yearly':
        return 'Category Wise Sales';
      default:
        return 'Category Wise Sale';
    }
  };

  // Category chart options
  const categoryChartOptions = {
    chart: {
      type: 'donut' as const,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
              label: 'Total Sale Amount',
              formatter: function () {
                return formatCurrency(totalSaleAmount);
              },
            },
          },
        },
      },
    },
    legend: {
      show: false,
    },
    labels: categoryNames.length > 0 ? categoryNames : ['No Data Available'],
    colors: categoryColors,
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const categoryChartSeries =
    categorySaleValues?.length > 0 ? categorySaleValues : [100];

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Purchase Chart Card */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-3 border-b border-gray-200 flex justify-between items-center gap-3">
            <div className="flex justify-between gap-3 items-center">
              <div className="flex items-center gap-3 text-base font-medium">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 5C13 6.10457 10.5376 7 7.5 7C4.46243 7 2 6.10457 2 5M13 5C13 3.89543 10.5376 3 7.5 3C4.46243 3 2 3.89543 2 5M13 5V6.5M2 5V17C2 18.1046 4.46243 19 7.5 19M7.5 11C7.33145 11 7.16468 10.9972 7 10.9918C4.19675 10.9 2 10.0433 2 9M7.5 15C4.46243 15 2 14.1046 2 13M22 11.5C22 12.6046 19.5376 13.5 16.5 13.5C13.4624 13.5 11 12.6046 11 11.5M22 11.5C22 10.3954 19.5376 9.5 16.5 9.5C13.4624 9.5 11 10.3954 11 11.5M22 11.5V19C22 20.1046 19.5376 21 16.5 21C13.4624 21 11 20.1046 11 19V11.5M22 15.25C22 16.3546 19.5376 17.25 16.5 17.25C13.4624 17.25 11 16.3546 11 15.25"
                    stroke="#717680"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Purchase Chart
              </div>
            </div>

            <div>
              <Tabs defaultValue="monthly">
                <TabsList className="bg-gray-100">
                  <TabsTrigger value="quarterly" className="text-xs">
                    Quarterly
                  </TabsTrigger>
                  <TabsTrigger value="yearly" className="text-xs">
                    Yearly
                  </TabsTrigger>
                  <TabsTrigger value="monthly" className="text-xs">
                    Monthly
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4">
            <div>
              <div className="flex items-center gap-2 text-gray-500 text-base">
                <div className="h-3 w-3 rounded-full bg-cyan-500"></div>
                {`Today's Purchase`}
                <Info className="h-3 w-3 text-gray-500" />
              </div>
              <p className="text-xl font-semibold text-black mt-1">৳46,645</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-500 text-base">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                {`Today's Purchase`}
                <Info className="h-3 w-3 text-gray-500" />
              </div>
              <p className="text-xl font-semibold text-black mt-1">৳46,645</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-500 text-base">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                {`Today's Purchase`}
                <Info className="h-3 w-3 text-gray-500" />
              </div>
              <p className="text-xl font-semibold text-black mt-1">৳46,645</p>
            </div>
          </div>

          <div className="p-4">
            {typeof window !== 'undefined' && (
              <ReactApexChart
                options={purchaseChartOptions}
                series={purchaseChartSeries}
                type="line"
                height={350}
              />
            )}
          </div>
        </div>

        {/* Category Wise Sale Card */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-3 border-b border-gray-200 flex justify-between items-center gap-3">
            <div className="flex justify-between gap-3 items-center">
              <div className="flex items-center gap-3 text-base font-medium">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 5C13 6.10457 10.5376 7 7.5 7C4.46243 7 2 6.10457 2 5M13 5C13 3.89543 10.5376 3 7.5 3C4.46243 3 2 3.89543 2 5M13 5V6.5M2 5V17C2 18.1046 4.46243 19 7.5 19M7.5 11C7.33145 11 7.16468 10.9972 7 10.9918C4.19675 10.9 2 10.0433 2 9M7.5 15C4.46243 15 2 14.1046 2 13M22 11.5C22 12.6046 19.5376 13.5 16.5 13.5C13.4624 13.5 11 12.6046 11 11.5M22 11.5C22 10.3954 19.5376 9.5 16.5 9.5C13.4624 9.5 11 10.3954 11 11.5M22 11.5V19C22 20.1046 19.5376 21 16.5 21C13.4624 21 11 20.1046 11 19V11.5M22 15.25C22 16.3546 19.5376 17.25 16.5 17.25C13.4624 17.25 11 16.3546 11 15.25"
                    stroke="#717680"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {getCategoryTitle()}
              </div>
            </div>

            <div>
              <Tabs
                defaultValue={formatQuery}
                value={formatQuery}
                onValueChange={handleTabChange}
              >
                <TabsList className="bg-gray-100">
                  <TabsTrigger value="yearly" className="text-xs">
                    Yearly
                  </TabsTrigger>
                  <TabsTrigger value="quarterly" className="text-xs">
                    Quarterly
                  </TabsTrigger>
                  <TabsTrigger value="monthly" className="text-xs">
                    Monthly
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="flex h-full justify-between gap-3 items-center p-4">
            <div className="h-[256px] w-[256px] relative">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
                  <div className="flex flex-col items-center">
                    <svg
                      className="animate-spin h-8 w-8 text-primary mb-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="text-sm text-gray-500">Loading...</span>
                  </div>
                </div>
              ) : null}
              {typeof window !== 'undefined' && (
                <ReactApexChart
                  options={categoryChartOptions}
                  series={categoryChartSeries}
                  type="donut"
                  height={256}
                />
              )}
            </div>
            <div className="max-w-[356px] w-full p-4 space-y-2">
              {categorySales?.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 justify-between"
                >
                  <article className="flex items-center gap-2 text-sm text-gray-500">
                    <span
                      className="block h-[14px] w-[5px] rounded-lg"
                      style={{
                        backgroundColor:
                          categoryColors[index % categoryColors?.length],
                      }}
                    ></span>
                    {category?.name}
                  </article>
                  <p className="text-base text-black font-medium">
                    {formatCurrency(category?.total_sale_price ?? 0)}
                  </p>
                </div>
              ))}

              {categorySales?.length === 0 && !isLoading && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No category data available</p>
                </div>
              )}

              {/* Total amount section */}
              {categorySales?.length > 0 && (
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <div className="flex items-center gap-3 justify-between">
                    <article className="flex items-center gap-2 text-base font-semibold text-gray-800">
                      Total
                    </article>
                    <p className="text-base text-black font-bold">
                      {formatCurrency(totalSaleAmount)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
