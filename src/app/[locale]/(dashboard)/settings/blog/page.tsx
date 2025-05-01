import { api } from '@/server/api';
import { BLOG } from '@/server/services/blog';
import { BlogsData } from '@/types/store-settings-interface';
import BlogPageWrapper from '@/components/settings/blogs/BlogPageWrapper';

const BlogPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page: string; search: string }>;
}) => {
  const queryParams = await searchParams;
  const blogs = await api.get<ApiResponse<BlogsData>>(
    `${BLOG.GET.BLOGS.URL}?per_page=${10}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}`,
    BLOG.GET.BLOGS.TAGS,
  );

  return <BlogPageWrapper blogs={blogs?.data} />;
};

export default BlogPage;
