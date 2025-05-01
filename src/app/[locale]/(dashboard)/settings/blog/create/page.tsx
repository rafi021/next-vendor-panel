import { api } from '@/server/api';
import { TAGS } from '@/server/services/tags';
import { ITagsData } from '@/types/tag-interface';
import { CATEGORIES } from '@/server/services/category';
import { ICategories } from '@/types/category-interfaces';
import StoreBlogForm from '@/components/settings/blogs/StoreBlogForm';

const BlogCreatePage = async () => {
  const categoriesData = await api.get<ApiResponse<ICategories, null>>(
    CATEGORIES.GET.CATEGORIES.URL,
    CATEGORIES.GET.CATEGORIES.TAGS,
  );

  const tagsData = await api.get<ApiResponse<ITagsData, null>>(
    TAGS.GET.TAGS.URL,
    TAGS.GET.TAGS.TAGS,
  );

  return (
    <StoreBlogForm tags={tagsData?.data} categories={categoriesData?.data} />
  );
};

export default BlogCreatePage;
