'use client';
import { Card } from '@/components/ui/card';
import NewsLetterTable from './NewsLetterTable';
import { DateSelect } from '@/components/common/DateSelect';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import { NewsLetterData } from '@/types/store-settings-interface';
import PaginateAction from '@/components/common/PaginateAction';

const NewsLetterPageWrapper = ({ data }: { data: NewsLetterData }) => {
  return (
    <Card className="mb-space16 p-space16">
      <div className="border-b border-gray-200 pb-space12 mb-space12 pt-0 flex justify-between items-center">
        <h2 className="text-lg font-medium text-black">News Letter</h2>
        <div className="flex gap-space12">
          <SearchInput wrapperClasses="h-[40px]" />
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
          </div> */}
          {/* <DateSelect /> */}
        </div>
      </div>

      {data.data?.length > 0 ? (
        <NewsLetterTable data={data} activePage={data?.current_page ?? 0} perPage={data?.per_page ?? 0} />
      ) : (
        <EmptyTableData
          title="There is no News letter here yet!"
          description=" "
          action={<div></div>}
        />
      )}
      <PaginateAction
        total={data?.total ?? 0}
        perPage={data?.per_page ?? 0}
        activePage={data?.current_page ?? 0}
      />
    </Card>
  );
};

export default NewsLetterPageWrapper;
