'use client';
import Link from 'next/link';
import BlogTable from './BlogTable';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DateSelect } from '@/components/common/DateSelect';
import { BlogsData } from '@/types/store-settings-interface';
import EmptyTableData from '@/components/common/EmptyTableData';
import SearchInput from '@/components/common/forms/SearchInput';
import SortAndFilterComponent from '@/components/common/SortAndFilterComponent';
import { FILTER_OPTIONS, SORT_OPTIONS } from '@/config/data';
import PaginateAction from '@/components/common/PaginateAction';

const BlogPageWrapper = ({ blogs }: { blogs: BlogsData }) => {
  return (
    <Card className="mb-space16 p-space16">
      <div className="border-b border-gray-200 pb-space12 mb-space12 pt-0 flex justify-between items-center">
        <h2 className="text-lg font-medium text-black">blogs</h2>
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
          </div>
          <DateSelect /> */}

          <Link href={`/settings/blog/create`}>
            <Button>
              <Plus className="w-4 h-4" />
              Add Blog
            </Button>
          </Link>
        </div>
      </div>

      {blogs.data?.length > 0 ? (
        <BlogTable blogs={blogs} />
      ) : (
        <EmptyTableData
          title="There is no Blog created here yet!"
          description="Add blogs to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={
            <Link href={`/settings/blog/create`}>
              <Button>
                <Plus className="w-4 h-4" />
                Add Blog
              </Button>
            </Link>
          }
        />
      )}
      <PaginateAction
        total={blogs?.total ?? 0}
        perPage={blogs?.per_page ?? 0}
        activePage={blogs?.current_page ?? 0}
      />
    </Card>
  );
};

export default BlogPageWrapper;
