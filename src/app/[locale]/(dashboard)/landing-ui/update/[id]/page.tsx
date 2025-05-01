import AddLandingPageForm from '@/components/landing-ui/AddLandingPage';
import { api } from '@/server/api';
import { LANDING_PAGES } from '@/server/services/landing-ui';
import { PRODUCT } from '@/server/services/product';
import { ILandingPageData } from '@/types/landing-ui-interface';
import { IProductData } from '@/types/product-interface';

const UpdateLandingPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const landingPage = await api.get<ApiResponse<ILandingPageData>>(
    `${LANDING_PAGES.GET.URL}/${id}`,
    LANDING_PAGES.GET.TAGS,
  );

  const products = await api.get<ApiResponse<IProductData>>(
    PRODUCT.GET.PRODUCTS.URL,
    PRODUCT.GET.PRODUCTS.TAGS,
  );
  return (
    <AddLandingPageForm products={products?.data} data={landingPage?.data} />
  );
};

export default UpdateLandingPage;
