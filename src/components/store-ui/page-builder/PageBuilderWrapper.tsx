import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageBuilderTable from './PageBuilderTable';
import EmptyTableData from '@/components/common/EmptyTableData';
import PaginateAction from '@/components/common/PaginateAction';
import { IPageBuilderData } from '@/types/page-builder-interface';

const PageBuilderWrapper = ({
  pageBuilderPages,
}: {
  pageBuilderPages: IPageBuilderData;
}) => {
  return (
    <Card className="mb-space16">
      <div className="border-b border-gray-300 p-space12 flex justify-between items-center">
        <h2 className="text-lg font-medium text-black">Page builder</h2>
        <div className="flex gap-space12">
          <Link href={'/page-builder/add'}>
            <Button>Add New Page</Button>
          </Link>
        </div>
      </div>

      {pageBuilderPages?.data?.length > 0 ? (
        <PageBuilderTable
          pageBuilderPages={pageBuilderPages}
          activePage={pageBuilderPages?.current_page ?? 0}
          perPage={pageBuilderPages?.per_page ?? 0}
        />
      ) : (
        <EmptyTableData
          title="There is no Page created here yet!"
          description="Add Page to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={
            <Link href={'/page-builder/add'}>
              <Button>Add New Page</Button>
            </Link>
          }
        />
      )}
      <PaginateAction
        total={pageBuilderPages?.total ?? 0}
        perPage={pageBuilderPages?.per_page ?? 0}
        activePage={pageBuilderPages?.current_page ?? 0}
      />
    </Card>
  );
};

export default PageBuilderWrapper;
