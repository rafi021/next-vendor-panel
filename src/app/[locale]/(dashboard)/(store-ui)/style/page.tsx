import StylePageWrapper from '@/components/store-ui/style/StylePageWrapper';
import { api } from '@/server/api';
import { GET_SETTINGS } from '@/server/services/site-settings';
import { StyleResponse } from '@/types/store-ui';

const page = async () => {
  const url = `${GET_SETTINGS.GET.URL}?key=["product_card_type", "style"]`;
  const styleSectionData = await api.get<ApiResponse<StyleResponse, null>>(
    url,
    GET_SETTINGS.GET.TAGS,
  );

  return <StylePageWrapper styles={styleSectionData.data} />;
};

export default page;
