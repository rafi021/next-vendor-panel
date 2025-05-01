import React, { useState, useEffect } from 'react';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Customer } from '@/types/accounts-interface';
import { Image } from '@/components/common/Image';
import { useQueryState } from 'nuqs';
import { Card, CardContent } from '@/components/ui/card';
import SearchInput from '@/components/common/forms/SearchInput';
import { Customer_info } from '@/types/order-interface';

const UserSearchAndSelect = ({
  selectedCustomer,
  setSelectedCustomer,
  customers,
  setSelectedCustomerInfo,
}: {
  selectedCustomer: Customer | null;
  setSelectedCustomer: (value: Customer) => void;
  customers?: Customer[] | [];
  setSelectedCustomerInfo: (value: Customer_info) => void;
}) => {
  const [customerQuery, setCustomerQuery] = useQueryState('customer', {
    shallow: false,
    defaultValue: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (customers !== undefined) {
      setIsLoading(false);
    }
  }, [customers]);

  return (
    <div className="relative z-0">
      {/* <Input
        value={customerQuery}
        onChange={(evt) => setCustomerQuery(evt.target.value)}
        placeholder="Search by name, number or ID..."
      /> */}
      <SearchInput
        value={customerQuery}
        onChange={(e) =>
          setCustomerQuery(typeof e === 'string' ? e : e.target.value)
        }
        placeholder="Search by name, number or ID..."
        className="py-[10px] pl-space32 placeholder:!text-xs"
        id="customer"
      />
      {customers && (
        <div>
          <div>
            {customerQuery && (
              <>
                {isLoading ? (
                  <p>Loading . . .</p>
                ) : (
                  customers.length === 0 && (
                    <p className="flex items-center justify-center">
                      No user found.
                    </p>
                  )
                )}
                {customers.length > 0 && (
                  <div className="border border-gray-200 rounded-md mt-space4 shadow p-space4">
                    {customers.map((customer) => (
                      <Card
                        key={customer.id}
                        // value={customer.phone}
                        className="hover:!bg-gray-100 hover:cursor-pointer flex items-center !border-none shadow-none"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setSelectedCustomerInfo({
                            total_orders: customer.orders_count,
                            cancelled_orders: customer.cancelled_orders_count,
                            delivered_orders: customer.delivered_orders_count,
                            returned_orders: customer.returned_orders_count,
                          });
                          setCustomerQuery('');
                        }}
                      >
                        <CardContent className="flex items-center !p-space12 gap-space12">
                          <Image
                            src={null}
                            height={36}
                            width={36}
                            alt={customer.name ?? ''}
                            wrapperClasses="border border-gray-200 rounded-md"
                          />
                          <article className="space-y-[2px] text-xs">
                            <p className="text-gray-700 font-semibold text-sm">
                              {customer.name}
                            </p>
                            <p className="text-gray-500">
                              {customer.phone} , <span>#ID: {customer.id}</span>
                            </p>
                          </article>
                        </CardContent>
                        <Check
                          className={cn(
                            'ml-auto mr-space6',
                            customer.name === selectedCustomer?.name
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSearchAndSelect;
