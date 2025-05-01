'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/utils/date-format';
import DeleteButton from '@/components/common/DeleteButton';
import { ICouponsData } from '@/types/coupon-interface';
import { COUPONS } from '@/server/services/coupons';
import CouponForm from './CouponForm';
import { Pencil } from 'lucide-react';
import PaginateAction from '@/components/common/PaginateAction';
import StatusUpdate from '@/components/common/StatusUpdate';
import { useHasPermission } from '@/utils/permissions-check';
import { PERMISSIONS_ENUMS } from '@/enum/permissions';

const CouponsTable = ({ coupons }: { coupons: ICouponsData }) => {
  // const isPermittedUpdate = useHasPermission(PERMISSIONS_ENUMS.COUPON_UPDATE);
  // const isPermittedDelete = useHasPermission(PERMISSIONS_ENUMS.COUPON_DELETE);
  // const isPermittedStatusUpdate = useHasPermission(
  //   PERMISSIONS_ENUMS.COUPON_STATUS,
  // );

  // // console.log('is permitted update ', isPermittedUpdate);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead>ID</TableHead> */}
            <TableHead className="text-center">Title</TableHead>
            <TableHead>Discount Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Valid from</TableHead>
            <TableHead>Valid to</TableHead>
            <TableHead>Usage limit</TableHead>
            <TableHead>Max usage per customer</TableHead>
            <TableHead>Min purchase amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons.data.map(
            ({
              id,
              name,
              valid_from,
              discount_type,
              amount,
              valid_to,
              usage_limit,
              max_uses_per_customer,
              min_purchase_amount,
              is_active,
            }) => (
              <TableRow key={id}>
                {/* <TableCell>{id}</TableCell> */}
                <TableCell>
                  <pre className="bg-gray-100/80 rounded-sm text-center">
                    <code>{name}</code>
                  </pre>
                </TableCell>
                <TableCell>{discount_type}</TableCell>
                <TableCell>
                  {amount}
                  {discount_type === 'percentage' ? '%' : '৳'}
                </TableCell>
                <TableCell>{formatDate(valid_from)}</TableCell>
                <TableCell>{formatDate(valid_to)}</TableCell>
                <TableCell>{usage_limit}</TableCell>
                <TableCell>{max_uses_per_customer}</TableCell>
                <TableCell>{min_purchase_amount}</TableCell>
                <TableCell>
                  <StatusUpdate
                    tags={COUPONS.GET.COUPONS.TAGS}
                    isActive={is_active == 1 ? true : false}
                    url={`${COUPONS.PUT.COUPONS_UPDATE}/status/${id}`}
                    // disabled={!isPermittedStatusUpdate}
                  />
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  {/* {isPermittedUpdate && ( */}
                  <CouponForm
                    title="Edit Coupon"
                    data={{
                      id,
                      name,
                      valid_from,
                      discount_type,
                      amount,
                      valid_to,
                      usage_limit,
                      max_uses_per_customer,
                      min_purchase_amount,
                      is_active,
                    }}
                  >
                    <Button variant="white" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </CouponForm>
                  {/* )} */}

                  {/* {isPermittedDelete && ( */}
                  <DeleteButton
                    url={`${COUPONS.DELETE.COUPONS_DELETE}/${id}`}
                    tags={COUPONS.GET.COUPONS.TAGS}
                  />
                  {/* )} */}
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>

      <div className="w-full flex items-center justify-center bg-white border-t border-gray-300">
        <PaginateAction
          activePage={coupons.current_page}
          total={coupons.total}
          perPage={coupons.per_page}
          // onChange={(data) => // console.log(data)}
        />
      </div>
    </div>
  );
};

export default CouponsTable;
