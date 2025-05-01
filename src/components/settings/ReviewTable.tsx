'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import MyRating from '../common/MyRating';
import { Avatar } from '../common/Avatar';
import { Review } from '@/types/review-types';
import { formatDate } from '@/utils/date-format';
import { Image } from '@/components/common/Image';
import StatusUpdate from '@/components/common/StatusUpdate';

const ReviewTable = ({ reviews }: { reviews: Review[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Review Image</TableHead>
          <TableHead>Comment</TableHead>
          <TableHead>Rating</TableHead>

          <TableHead>Created Date</TableHead>

          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.map(
          ({
            id,
            comment,
            created_at,
            is_approved,
            customer,
            product,
            rating,
            review_images,
          }) => (
            <TableRow key={id}>
              <TableCell>
                <div className="flex items-center gap-space8">
                  <Image
                    alt={''}
                    width={0}
                    height={0}
                    sizes="100vw"
                    src={product?.thump_image || null}
                    wrapperClasses="h-[32px] max-w-max"
                    className="h-full w-full object-contain"
                  />
                  <p className="max-w-[120px] line-clamp-2 text-xs">
                    {product?.name}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-space8">
                  <Avatar
                    src={customer?.image || '/avatar.webp'}
                    text={customer?.name ?? ''}
                    alt={customer?.name ?? ''}
                  />

                  <p className="w-[160px] text-sm">
                    <span className="line-clamp-1">{customer?.name}</span>
                    <span className="block text-gray-400 font-medium text-sm">
                      {customer?.phone}
                    </span>
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Image
                  src={review_images[0]?.image_url || null}
                  alt={''}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-full w-full object-contain"
                  wrapperClasses="h-[32px] max-w-max"
                />
              </TableCell>
              <TableCell>
                <span className="block max-w-[300px] text-xs">{comment}</span>
              </TableCell>
              <TableCell>
                {reviews ? <MyRating rating={rating} /> : ''}
              </TableCell>
              <TableCell>{formatDate(created_at)}</TableCell>

              <TableCell>
                <StatusUpdate
                  tags={['REVIEWS']}
                  isActive={is_approved == 1 ? true : false}
                  url={`/reviews/status/${id}`}
                />
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};

export default ReviewTable;
