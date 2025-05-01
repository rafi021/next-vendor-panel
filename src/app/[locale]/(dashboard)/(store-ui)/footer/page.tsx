import FooterMenuWrapper from '@/components/store-ui/footer/FooterMenuWrapper';
import { api } from '@/server/api';
import { FOOTER_MENUS } from '@/server/services/footer-menu';
import { FooterMenus } from '@/types/store-settings-interface';

const FooterMenuPage = async () => {
  const footerMenus = await api.get<ApiResponse<FooterMenus>>(
    FOOTER_MENUS.GET.FOOTER_MENUS.URL,
    FOOTER_MENUS.GET.FOOTER_MENUS.TAGS,
  );

  return <FooterMenuWrapper data={footerMenus?.data ?? []} />;
};
export default FooterMenuPage;
