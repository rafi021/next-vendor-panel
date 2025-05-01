'use client';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import { Card } from '@/components/ui/card';
import { ITagsData } from '@/types/tag-interface';
import TagsTable from './TagsTable';
import CreateProductTag from './CreateProductTag';
import PaginateAction from '@/components/common/PaginateAction';

const TagsPageWrapper = ({ tags }: { tags: ITagsData }) => {
  return (
    <Card className="p-space16">
      <div className="p-space12 flex justify-between items-center">
        <h2 className="text-lg font-medium text-black">Tags</h2>
        <div className="flex gap-space12">
          <SearchInput
            wrapperClasses="h-[40px]"
            placeholder="Search by tag name"
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
          <CreateProductTag />
        </div>
      </div>

      {tags?.data?.length > 0 ? (
        <TagsTable tags={tags} activePage={tags.current_page} perPage={tags.per_page} />
      ) : (
        <EmptyTableData
          title="There is no Tag created here yet!"
          description="Add Tags to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={<CreateProductTag />}
        />
      )}
      <PaginateAction
        total={tags?.total ?? 0}
        perPage={tags?.per_page ?? 0}
        activePage={tags?.current_page ?? 0}
      />
    </Card>
  );
};

export default TagsPageWrapper;
