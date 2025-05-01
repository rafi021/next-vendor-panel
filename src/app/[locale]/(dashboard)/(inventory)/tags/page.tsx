import { api } from '@/server/api';
import { TAGS } from '@/server/services/tags';
import { ITagsData } from '@/types/tag-interface';
import TagsPageWrapper from '@/components/inventory/productTags/TagsPageWrapper';

/**
 * 
 * @param param0 {
  params,
}: {
  params: Promise<{ slug: string }>
 * @returns 
 */

import { parseAsInteger } from 'nuqs/server';

const pageParser = parseAsInteger.withDefault(1);

export default async function TagsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; search: string }>;
}) {
  const queryParams = await searchParams;
  const page = queryParams?.page;
  const pageParam = await pageParser.parseServerSide(page);

  const url = pageParam
    ? `${TAGS.GET.TAGS.URL}?page=${pageParam}&per_page=${15}&search=${queryParams?.search ?? ''}`
    : TAGS.GET.TAGS.URL;

  const tagsData = await api.get<ApiResponse<ITagsData, null>>(
    url,
    TAGS.GET.TAGS.TAGS,
  );

  return <TagsPageWrapper tags={tagsData?.data} />;
}
