import { api } from '@/server/api';
import { BLOG } from '@/server/services/blog';
import { TAGS } from '@/server/services/tags';
import { ITagsData } from '@/types/tag-interface';
import { CATEGORIES } from '@/server/services/category';
import { ICategories } from '@/types/category-interfaces';
import { Blog } from '@/types/store-settings-interface';
import StoreBlogForm from '@/components/settings/blogs/StoreBlogForm';

const BlogUpdatePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ sort: string }>;
}) => {
  const { id } = await params;

  const blogs = await api.get<ApiResponse<Blog>>(
    `${BLOG.GET.BLOG_DETAILS.URL}/${id}`,
    BLOG.GET.BLOGS.TAGS,
  );

  const categoriesData = await api.get<ApiResponse<ICategories, null>>(
    CATEGORIES.GET.CATEGORIES.URL,
    CATEGORIES.GET.CATEGORIES.TAGS,
  );

  const tagsData = await api.get<ApiResponse<ITagsData, null>>(
    TAGS.GET.TAGS.URL,
    TAGS.GET.TAGS.TAGS,
  );

  return (
    <StoreBlogForm
      data={blogs?.data}
      tags={tagsData?.data}
      categories={categoriesData?.data}
    />
  );
};

export default BlogUpdatePage;
