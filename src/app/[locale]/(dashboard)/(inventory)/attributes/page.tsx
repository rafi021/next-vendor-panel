import { api } from '@/server/api';
import { parseAsInteger } from 'nuqs/server';
import ProductAttributePageWrapper from '@/components/inventory/productAttribute/ProductAttributePageWrapper';
import { ATTRIBUTES } from '@/server/services/attributes';
import { IProductAttributeData } from '@/types/attributes-interface';

const pageParser = parseAsInteger.withDefault(1);

export default async function AttributePage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; search: string }>;
}) {
  const queryParams = await searchParams;
  const page = queryParams?.page;
  const pageParam = await pageParser.parseServerSide(page);

  const url = pageParam
    ? `${ATTRIBUTES.GET.ATTRIBUTES.URL}?per_page=${15}&page=${pageParam}&search=${queryParams?.search ?? ''}`
    : ATTRIBUTES.GET.ATTRIBUTES.URL;

  const productAttributesData = await api.get<
    ApiResponse<IProductAttributeData, null>
  >(url, ATTRIBUTES.GET.ATTRIBUTES.TAGS);

  return (
    <ProductAttributePageWrapper
      productAttributes={productAttributesData?.data}
    />
  );
}
