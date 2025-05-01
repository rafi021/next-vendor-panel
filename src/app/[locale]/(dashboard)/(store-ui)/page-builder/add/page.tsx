import { api } from '@/server/api';
import { Layers } from 'lucide-react';
import { FOOTER_MENUS } from '@/server/services/footer-menu';
import { FooterMenuSlugList } from '@/types/page-builder-interface';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import PageBuilderForm from '@/components/store-ui/page-builder/pageBuilderForm';

const AddPageBuilderPage = async () => {
  const footerMenuSlugList = await api.get<ApiResponse<FooterMenuSlugList[]>>(
    FOOTER_MENUS.GET.FOOTER_MENU_SLUG_LIST.URL,
    FOOTER_MENUS.GET.FOOTER_MENU_SLUG_LIST.TAGS,
  );

  return (
    <div className="bg-gray-50">
      <Card>
        <CardHeader className="p-space24 border-b border-gray-300">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="p-2 border-[1px] rounded-lg bg-primary/10">
              <Layers className="w-6 h-6 text-gray-500" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Add Page</h1>
              <p className=" text-gray-500">Customize your page</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="!p-0">
          <PageBuilderForm footerMenuSlugList={footerMenuSlugList?.data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPageBuilderPage;
