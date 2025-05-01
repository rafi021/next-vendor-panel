import { api } from '@/server/api';
import { Layers } from 'lucide-react';
import {
  FooterMenuSlugList,
  PageBuilderPageDetails,
} from '@/types/page-builder-interface';
import { FOOTER_MENUS } from '@/server/services/footer-menu';
import { PAGE_BUILDER } from '@/server/services/page-builder';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import PageBuilderForm from '@/components/store-ui/page-builder/pageBuilderForm';

export default async function PageBuilderEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pageBuilderPageData = await api.get<
    ApiResponse<PageBuilderPageDetails, null>
  >(
    `${PAGE_BUILDER.GET.PAGE_BUILDER_DETAILS.URL}/${slug}`,
    PAGE_BUILDER.GET.PAGE_BUILDER_DETAILS.TAGS,
  );

  const footerMenuSlugList = await api.get<ApiResponse<FooterMenuSlugList[]>>(
    FOOTER_MENUS.GET.FOOTER_MENU_SLUG_LIST.URL,
    FOOTER_MENUS.GET.FOOTER_MENU_SLUG_LIST.TAGS,
  );

  const pageDetails = pageBuilderPageData?.data?.page;

  return (
    <div className="bg-gray-50">
      <Card>
        <CardHeader className="p-space24 border-b border-gray-300">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="p-2 border-[1px] rounded-lg bg-primary/10">
              <Layers className="w-6 h-6 text-gray-500" />
            </div>
            <div className="">
              <h1 className="text-2xl font-semibold">{pageDetails?.title}</h1>
              <p className=" text-gray-500">Edit Category</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="!p-0">
          {pageDetails && (
            <PageBuilderForm
              data={{
                ...pageDetails,
                slug:
                  pageBuilderPageData?.data?.id +
                  '_' +
                  pageBuilderPageData?.data?.url,
              }}
              footerMenuSlugList={footerMenuSlugList?.data}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
