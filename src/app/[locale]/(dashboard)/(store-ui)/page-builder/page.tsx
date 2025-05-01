import { api } from '@/server/api';
import { parseAsInteger, SearchParams } from 'nuqs/server';
import { PAGE_BUILDER } from '@/server/services/page-builder';
import { IPageBuilderData } from '@/types/page-builder-interface';
import PageBuilderWrapper from '@/components/store-ui/page-builder/PageBuilderWrapper';

const pageParser = parseAsInteger.withDefault(1);

export default async function CouponsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const page = (await searchParams)?.page;
  const pageParam = await pageParser.parseServerSide(page);

  const url = pageParam
    ? `${PAGE_BUILDER.GET.PAGE_BUILDER.URL}?page=${pageParam}`
    : PAGE_BUILDER.GET.PAGE_BUILDER.URL;

  const pageBuilderData = await api.get<ApiResponse<IPageBuilderData, null>>(
    url,
    PAGE_BUILDER.GET.PAGE_BUILDER.TAGS,
  );

  const pageBuilderPages = pageBuilderData?.data;
  return <PageBuilderWrapper pageBuilderPages={pageBuilderPages} />;
}
