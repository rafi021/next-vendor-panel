import { api } from '@/server/api';
import { CATEGORIES } from '@/server/services/category';
import { ICategories } from '@/types/category-interfaces';
import CategoryForm from '@/components/inventory/category/CategoryForm';

const AddCategoryPage = async () => {
  const categoriesData = await api.get<ApiResponse<ICategories, null>>(
    CATEGORIES.GET.CATEGORIES.URL,
    CATEGORIES.GET.CATEGORIES.TAGS,
  );

  return <CategoryForm categories={categoriesData?.data} />;
};

export default AddCategoryPage;
