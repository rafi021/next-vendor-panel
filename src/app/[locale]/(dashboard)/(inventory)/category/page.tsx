import CategoryPageWrapper from '@/components/inventory/category/CategoryPageWrapper';
import { api } from '@/server/api';
import { CATEGORIES } from '@/server/services/category';
import { ICategories } from '@/types/category-interfaces';

export default async function CategoryPage({
  searchParams,
}: {
  searchParams?: Promise<{ page: string; search: string; status: string }>;
}) {
  const queryParams = await searchParams;

  const categoriesData = await api.get<ApiResponse<ICategories, null>>(
    `${CATEGORIES.GET.CATEGORIES.URL}?status=${queryParams?.status ?? ''}&per_page=${15}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}`,
    CATEGORIES.GET.CATEGORIES.TAGS,
  );

  return (
    <CategoryPageWrapper
      categoriesData={categoriesData?.data}
      metadata={categoriesData?.metadata ?? null}
    />
  );
}
