import { api } from '@/server/api';
import { BRANDS } from '@/server/services/brand';
import { BrandData } from '@/types/brands-interface';
import BrandPageWrapper from '@/components/inventory/brand/BrandPageWrapper';

const BrandPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page: string; search: string }>;
}) => {
  const queryParams = await searchParams;
  
  const brands = await api.get<ApiResponse<BrandData>>(
    `${BRANDS.GET.BRANDS.URL}?per_page=${15}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}`,
    BRANDS.GET.BRANDS.TAGS,
  );
  return <BrandPageWrapper brands={brands?.data} />;
};

export default BrandPage;
