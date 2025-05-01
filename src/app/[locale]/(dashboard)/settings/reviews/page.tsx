import { api } from '@/server/api';
import { Card } from '@/components/ui/card';
import { ReviewData } from '@/types/review-types';
import ReviewTable from '@/components/settings/ReviewTable';
import SearchInput from '@/components/common/forms/SearchInput';
import EmptyTableData from '@/components/common/EmptyTableData';
import PaginateAction from '@/components/common/PaginateAction';

const ReviewPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page: string; search: string }>;
}) => {
  const queryParams = await searchParams;

  const reviewUrl = `/reviews?page=${queryParams?.page ?? ''}&per_page=20&product_name=${queryParams?.search ?? ''}`;
  const reviews = await api.get<ApiResponse<ReviewData>>(reviewUrl, [
    'REVIEWS',
  ]);

  return (
    <div className="pb-space16 ">
      <Card className="p-space16 border-b-0 rounded-b-none">
        <div className="border-b border-gray-200 pb-space12 mb-space12 pt-0 flex justify-between items-center">
          <h2 className="text-lg font-medium text-black">Reviews</h2>
          <SearchInput
            wrapperClasses="h-[40px]"
            placeholder="Search by Product name"
          />
        </div>

        {reviews.data.data?.length > 0 ? (
          <ReviewTable reviews={reviews.data.data} />
        ) : (
          <EmptyTableData
            title="There is no Review created here yet!"
            description="Add Reviews to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
            action={<></>}
          />
        )}
      </Card>
      <PaginateAction
        total={reviews?.data?.total}
        perPage={reviews?.data?.per_page}
        activePage={reviews?.data?.current_page}
      />
    </div>
  );
};

export default ReviewPage;
