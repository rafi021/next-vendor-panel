'use client';

import { Card } from '@/components/ui/card';
import { DateSelect } from '@/components/common/DateSelect';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import SortAndFilterComponent from '@/components/common/SortAndFilterComponent';
import AddAccount from './AddAccount';
import AccountsTable from './AccountsTable';
import { IAccountsData } from '@/types/accounts-interface';
import { FILTER_OPTIONS, SORT_OPTIONS } from '@/config/data';
import PaginateAction from '@/components/common/PaginateAction';

const AccountsPageWrapper = ({ accounts }: { accounts: IAccountsData }) => {
  return (
    <Card className="p-space16">
      <div className="flex justify-between items-center border-b border-gray-200 pb-space16">
        <div>
          {' '}
          <h1 className="text-md font-semibold">Accounts</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            <SearchInput wrapperClasses="h-[40px]" placeholder="Search by account name" />
            {/* <div className="relative flex">
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
            <DateSelect /> */}
            <AddAccount />
          </div>
        </div>
      </div>

      {accounts?.data?.length > 0 ? (
        <AccountsTable accounts={accounts?.data}
          activePage={accounts?.current_page ?? 0}
          perPage={accounts?.per_page ?? 0}
        />
      ) : (
        <EmptyTableData
          title="There is no account created here yet!"
          description="Add accounts to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={<AddAccount />}
        />
      )}
      <PaginateAction
        total={accounts?.total ?? 0}
        perPage={accounts?.per_page ?? 0}
        activePage={accounts?.current_page ?? 0}
      />
    </Card>
  );
};

export default AccountsPageWrapper;
