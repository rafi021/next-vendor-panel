'use client';
import React, { useState } from 'react';
import SearchInput from '@/components/common/forms/SearchInput';
import { Card } from '@/components/ui/card';
import EmptyTableData from '@/components/common/EmptyTableData';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Box,
  CircleDollarSign,
  Download,
  Plus,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { useQueryState } from 'nuqs';
import { Label } from '@/components/ui/label';
import { ICustomerData } from '@/types/customer-interface';
import CustomersTable from './CustomersTable';
import AddCustomer from './AddCustomer';
import PaginateAction from '@/components/common/PaginateAction';

const customerType = [
  { title: 'All', key: 'all' },
  { title: 'Active', key: 'true' },
  { title: 'Inactive', key: 'false' },
];

const CustomerPageWrapper = ({
  customers,
  metadata,
}: {
  customers: ICustomerData;
  metadata: {
    customer_active_count: { active: number; inactive: number };
    total_customer: number;
    total_orders: number;
    total_paid_amount: number;
    total_due_amount: number;
  };
}) => {
  const [activeIds, setActiveIds] = useState<number[]>([]);

  // console.log('metadata', metadata);

  const [productStatusQuery, setProductStatusQuery] = useQueryState('status', {
    shallow: false,
    defaultValue: 'all',
  });

  // console.log('', metadata);

  return (
    <div className="space-y-space16 pb-space16">
      <Card className="py-space16 xl:px-space12 xl:py-space24 bg-gradient-primary grid grid-cols-2 lg:grid-cols-4">
        <div className="space-y-space8 border-r border-gray-300 px-space12">
          <div className="flex items-center gap-space8 text-gray-500 text-xs xl:text-sm font-medium">
            <Box className="text-[#FF920F] h-space16 w-space16" />
            TOTAL CUSTOMER
          </div>

          <article className="flex items-center gap-space6">
            <p className=" text-black text-md xl:text-xl font-semibold">
              {metadata.total_customer}
            </p>
            {/* <span className="flex items-center text-green-500 text-xs xl:text-sm">
              <ArrowUpRight className="h-[18px] w-[18px]" /> 2%
            </span> */}
          </article>
        </div>

        <div className="space-y-space8 lg:border-r border-gray-300 px-space12">
          <div className="flex items-center gap-space8 text-gray-500 text-xs xl:text-sm font-medium">
            <CircleDollarSign className="text-[#FF920F] h-space16 w-space16" />
            TOTAL ORDERS
          </div>

          <article className="flex items-center gap-space6">
            <p className=" text-black text-md xl:text-xl font-semibold">
              ৳{metadata.total_orders}
            </p>
            {/* <span className="flex items-center text-error-500 text-xs xl:text-sm">
              <ArrowDownRight className="h-[18px] w-[18px]" /> 1%
            </span> */}
          </article>
        </div>

        <div className="space-y-space8 border-r border-gray-300 px-space12 pt-space16 lg:pt-0">
          <div className="flex items-center gap-space8 text-gray-500 text-xs xl:text-sm font-medium">
            <TrendingUp className="text-[#FF920F] h-space16 w-space16" />
            <span className="hidden sm:inline">TOTAL</span> PAID AMOUNT
          </div>

          <article className="flex items-center gap-space6">
            <p className=" text-black text-md xl:text-xl font-semibold">
              ৳{metadata.total_paid_amount}
            </p>
            {/* <span className="flex items-center text-green-500 text-xs xl:text-sm">
              <ArrowUpRight className="h-[18px] w-[18px]" /> 2%
            </span> */}
          </article>
        </div>

        <div className="space-y-space8 px-space12 pt-space16 lg:pt-0">
          <div className="flex items-center gap-space8 text-gray-500 text-xs xl:text-sm font-medium">
            <TrendingDown className="text-[#FF920F] h-space16 w-space16" />
            <span className="hidden sm:inline">TOTAL</span> DUE AMOUNT
          </div>

          <article className="flex items-center gap-space6">
            <p className=" text-black text-md xl:text-xl font-semibold">
              ৳{metadata.total_due_amount}
            </p>
            {/* <span className="flex items-center text-error-500 text-xs xl:text-sm">
              <ArrowDownRight className="h-[18px] w-[18px]" /> 2%
            </span> */}
          </article>
        </div>
      </Card>

      <Card className="mb-space16 p-space16">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-black">Customers</h2>
          <div className="flex gap-space12">
            <SearchInput
              wrapperClasses="h-[40px]"
              placeholder="Search by customer name"
            />
            {/* <div className="flex">
              <SortAndFilterComponent
                label="Sort"
                triggerClassName="rounded-r-none"
                fields={SORT_OPTIONS}
                containerClassName="w-54"
              />
              <SortAndFilterComponent
                fields={FILTER_OPTIONS}
                label="Filter"
                triggerClassName="rounded-l-none"
                containerClassName="w-26"
                align="end"
              />
            </div>
            <DateSelect /> */}

            <AddCustomer />
          </div>
        </div>

        <div className="flex items-center justify-start border-b border-gray-200 my-space12">
          {customerType?.map((item) => (
            <Label
              key={item.title}
              htmlFor={item.title}
              className={`px-space16 py-space8 ${productStatusQuery == item.key ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 cursor-pointer'} `}
            >
              <span>{item.title}</span>
              <span
                className={`px-space8 py-[2px] rounded-full text-xs ml-1 ${productStatusQuery == item.key ? 'bg-blue-500 text-white' : 'text-gray-500 border border-gray-300'}`}
              >
                {item.title == 'All'
                  ? metadata?.total_customer
                  : item.title == 'Active'
                    ? metadata?.customer_active_count.active
                    : item.title == 'Inactive'
                      ? metadata?.customer_active_count.inactive
                      : 0}
              </span>
              <input
                name="tab"
                type="radio"
                id={item.title}
                className="hidden"
                value={item.title}
                onChange={(evt) => setProductStatusQuery(item.key)}
              />
            </Label>
          ))}
        </div>
        {customers?.data?.length > 0 ? (
          <CustomersTable
            customers={customers}
            activePage={customers?.current_page ?? 0}
            perPage={customers?.per_page ?? 0}
          />
        ) : (
          <EmptyTableData
            title="There is no customer yet!"
            placeholder={<Box className="w-[90px] h-[90px] text-gray-500" />}
            description="Add customer to your shop and adjust them as you wish."
            action={
              <div className="flex gap-space16">
                <Button variant={'white'}>
                  <span className="rotate-180">
                    <Download className="w-4 h-4" />
                  </span>
                  Import
                </Button>

                <Link href={`/users/suppliers/add`}>
                  <Button>
                    <Plus className="w-4 h-4" />
                    Add Supplier
                  </Button>
                </Link>
              </div>
            }
          />
        )}
        <PaginateAction
          total={customers?.total ?? 0}
          perPage={customers?.per_page ?? 0}
          activePage={customers?.current_page ?? 0}
        />
      </Card>
    </div>
  );
};

export default CustomerPageWrapper;
