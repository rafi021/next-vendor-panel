import { api } from '@/server/api';
import { BRANDS } from '@/server/services/brand';
import { PRODUCT } from '@/server/services/product';
import { BrandData } from '@/types/brands-interface';
import { ACCOUNTS } from '@/server/services/accounts';
import { CATEGORIES } from '@/server/services/category';
import { SUPPLIERS } from '@/server/services/suppliers';
import { IProductData } from '@/types/product-interface';
import { ICategories } from '@/types/category-interfaces';
import { IAccountsData } from '@/types/accounts-interface';
import { ISupplierData } from '@/types/supplier-interface';
import AddPurchaseForm from '@/components/purchase/purchase/AddPurchaseForm';

const CreatePurchasePage = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    search: string;
    brand: string;
    category: string;
  }>;
}) => {
  
  const queryParams = await searchParams;
  const brand = queryParams?.brand ? `brand_ids=[${queryParams?.brand}]`: '';
  const category = queryParams?.category ? `category_ids=[${queryParams?.category}]`: '';
  const search = queryParams?.search ? `search=${queryParams?.search}`: '';
  
  const productUrl = `${PRODUCT.GET.PRODUCTS.URL}?${brand}${category}${search}`

  const products = await api.get<ApiResponse<IProductData>>(
    productUrl,
    PRODUCT.GET.PRODUCTS.TAGS,
  );
  const suppliers = await api.get<ApiResponse<ISupplierData>>(
    SUPPLIERS.GET.URL,
    SUPPLIERS.GET.TAGS,
  );

  const accounts = await api.get<ApiResponse<IAccountsData>>(
    ACCOUNTS.GET.URL,
    ACCOUNTS.GET.TAGS,
  );
  const categories = await api.get<ApiResponse<ICategories>>(
    CATEGORIES.GET.CATEGORIES.URL,
    CATEGORIES.GET.CATEGORIES.TAGS,
  );
  const brands = await api.get<ApiResponse<BrandData>>(
    BRANDS.GET.BRANDS.URL,
    BRANDS.GET.BRANDS.TAGS,
  );

  return (
    <AddPurchaseForm
      products={products?.data?.data}
      suppliers={suppliers?.data?.data}
      accounts={accounts?.data?.data}
      categories={categories?.data?.data}
      brands={brands?.data?.data}
      title="Add New Purchase"
    />
  );
};

export default CreatePurchasePage;
