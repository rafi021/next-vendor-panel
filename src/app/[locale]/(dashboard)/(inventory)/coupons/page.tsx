import { api } from '@/server/api';
import { parseAsInteger, SearchParams } from 'nuqs/server';
import { COUPONS } from '@/server/services/coupons';
import { ICouponsData } from '@/types/coupon-interface';
import CouponsPageWrapper from '@/components/inventory/coupons/CouponsPageWrapper';

const pageParser = parseAsInteger.withDefault(1);

export default async function CouponsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; search: string }>;
}) {
  const queryParams = await searchParams;
  const page = queryParams?.page;
  const pageParam = await pageParser.parseServerSide(page);

  const url = pageParam
    ? `${COUPONS.GET.COUPONS.URL}?page=${pageParam}&per_page=${15}&search=${queryParams?.search ?? ''}`
    : COUPONS.GET.COUPONS.URL;

  const couponsData = await api.get<ApiResponse<ICouponsData, null>>(
    url,
    COUPONS.GET.COUPONS.TAGS,
  );

  const coupons = couponsData?.data;

  return <CouponsPageWrapper coupons={coupons} />;
}
