'use client';
import EmptyTableData from '@/components/common/EmptyTableData';
import { Card } from '@/components/ui/card';
import { ICouponsData } from '@/types/coupon-interface';
import CouponsTable from './CouponsTable';
import CouponForm from './CouponForm';
import { useHasPermission } from '@/utils/permissions-check';
import { PERMISSIONS_ENUMS } from '@/enum/permissions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import PaginateAction from '@/components/common/PaginateAction';

const CouponsPageWrapper = ({ coupons }: { coupons: ICouponsData }) => {
  // const isPermittedListShow = useHasPermission(PERMISSIONS_ENUMS.COUPON_LIST);
  // const isPermittedCreate = useHasPermission(PERMISSIONS_ENUMS.COUPON_CREATE);

  const router = useRouter();

  // if (!isPermittedListShow) {
  //   toast.error("You don't have permission to view this!!");
  //   router.push('/');
  //   return null;
  // }

  return (
    <Card className="mb-space16">
      <div className="border-b border-gray-300 p-space12 flex justify-between items-center">
        <h2 className="text-lg font-medium text-black">Coupons</h2>
        <div className="flex gap-space12">
          <CouponForm />
        </div>
      </div>

      {coupons.data.length > 0 ? (
        <CouponsTable coupons={coupons} />
      ) : (
        <EmptyTableData
          title="There is no Coupon created here yet!"
          description="Add Coupon to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
          action={<CouponForm />}
        />
      )}
      <PaginateAction
        total={coupons?.total ?? 0}
        perPage={coupons?.per_page ?? 0}
        activePage={coupons?.current_page ?? 0}
      />
    </Card>
  );
};

export default CouponsPageWrapper;
