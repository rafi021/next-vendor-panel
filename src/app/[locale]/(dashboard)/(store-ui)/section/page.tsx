import StoreUiSectionWrapper from '@/components/store-ui/section/StoreUiSectionWrapper';
import { api } from '@/server/api';
import { BRANDS } from '@/server/services/brand';
import { CATEGORIES } from '@/server/services/category';
import { SECTION } from '@/server/services/store-ui';
import { TAGS } from '@/server/services/tags';
import { BrandData } from '@/types/brands-interface';
import { ICategories } from '@/types/category-interfaces';
import { Tag } from '@/types/product-interface';
import { SectionResponse } from '@/types/store-ui';

const StoreUiSectionPage = async () => {
  const categoriesData = await api.get<ApiResponse<ICategories, null>>(
    CATEGORIES.GET.CATEGORIES.URL,
    CATEGORIES.GET.CATEGORIES.TAGS,
  );

  const brandsData = await api.get<ApiResponse<BrandData, null>>(
    BRANDS.GET.BRANDS.URL,
    BRANDS.GET.BRANDS.TAGS,
  );

  const tagsData = await api.get<ApiResponse<PaginateType<Tag[]>, null>>(
    TAGS.GET.TAGS.URL,
    TAGS.GET.TAGS.TAGS,
  );

  const storeUiSectionData = await api.get<ApiResponse<SectionResponse, null>>(
    SECTION.GET.URL,
    SECTION.GET.TAGS,
  );

  return (
    <StoreUiSectionWrapper
      categories={categoriesData.data.data}
      brands={brandsData.data.data}
      tags={tagsData.data.data}
      sectionsData={storeUiSectionData.data.section}
    />
  );
};

export default StoreUiSectionPage;
