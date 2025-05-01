import { api } from '@/server/api';
import { PRODUCT } from '@/server/services/product';
import { IProductData } from '@/types/product-interface';
import AddLandingPageForm from '@/components/landing-ui/AddLandingPage';

const CreateLandingPage = async () => {

  const products = await api.get<ApiResponse<IProductData>>(
    PRODUCT.GET.PRODUCTS.URL,
    PRODUCT.GET.PRODUCTS.TAGS,
  );
  return <AddLandingPageForm products={products?.data} />;
};

export default CreateLandingPage;
