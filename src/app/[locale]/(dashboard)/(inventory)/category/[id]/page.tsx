import { api } from '@/server/api';
import { CATEGORIES } from '@/server/services/category';
import { ICategories, ICategory } from '@/types/category-interfaces';
import CategoryForm from '@/components/inventory/category/CategoryForm';

export default async function CategoryViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const categoryDetails = await api.get<ApiResponse<ICategory, null>>(
    `${CATEGORIES.GET.CATEGORY_DETAILS.URL}/${id}`,
    CATEGORIES.GET.CATEGORY_DETAILS.TAGS,
  );

  const categoriesData = await api.get<ApiResponse<ICategories, null>>(
    CATEGORIES.GET.CATEGORIES.URL,
    CATEGORIES.GET.CATEGORIES.TAGS,
  );

  return (
    <CategoryForm
      categoryDetails={categoryDetails?.data}
      categories={categoriesData?.data}
    />
  );
}
