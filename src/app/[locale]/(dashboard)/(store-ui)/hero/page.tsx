import { api } from '@/server/api';
import { HeroSectionResponse } from '@/types/store-ui';
import { CATEGORIES } from '@/server/services/category';
import { ICategories } from '@/types/category-interfaces';
import { HERO_SECTION } from '@/server/services/store-ui';
import StoreUiHeroWrapper from '@/components/store-ui/hero/StoreUiHeroWrapper';

const HeroPage = async () => {
  const categoriesData = await api.get<ApiResponse<ICategories, null>>(
    CATEGORIES.GET.CATEGORIES.URL,
    CATEGORIES.GET.CATEGORIES.TAGS,
  );
  const storeUiData = await api.get<ApiResponse<HeroSectionResponse, null>>(
    HERO_SECTION.GET.URL,
    HERO_SECTION.GET.TAGS,
  );

  return (
    <StoreUiHeroWrapper
      categories={categoriesData?.data?.data}
      data={storeUiData?.data?.hero_section}
    />
  );
};

export default HeroPage;
