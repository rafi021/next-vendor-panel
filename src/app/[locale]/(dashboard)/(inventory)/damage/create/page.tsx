import { api } from '@/server/api';
import { PRODUCT } from '@/server/services/product';
import { IProductData } from '@/types/product-interface';
import AddDamageForm from '@/components/inventory/damage/AddDamageForm';

const DamageCreatePage = async () => {
  const products = await api.get<ApiResponse<IProductData, null>>(
    PRODUCT.GET.PRODUCTS.URL,
    PRODUCT.GET.PRODUCTS.TAGS,
  );

  return <AddDamageForm products={products?.data?.data} />;
};

export default DamageCreatePage;
