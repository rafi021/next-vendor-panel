import { api } from '@/server/api';
import { IPurchaseReturn } from '@/types/purchase-return-interface';
import { PRODUCT } from '@/server/services/product';
import { SUPPLIERS } from '@/server/services/suppliers';
import { IProductData } from '@/types/product-interface';
import { ISupplierData } from '@/types/supplier-interface';
import { PURCHASES_RETURN } from '@/server/services/purchase-return';
import AddPurchaseReturnForm from '@/components/purchase/purchase-return/AddPurchaseReturnForm';

const PurchaseReturnPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ sort: string }>;
}) => {
  const { id } = await params;
  const queryParams = await searchParams;
  // const [key, val] = queryParams?.sort ? queryParams.sort.split('-') : [];
  // // console.log('searchParams=============', key, val);
  const purchaseReturn = await api.get<ApiResponse<IPurchaseReturn>>(
    `${PURCHASES_RETURN.GET.DETAILS.URL}/${id}`,
    PURCHASES_RETURN.GET.DETAILS.TAGS,
  );

  const products = await api.get<ApiResponse<IProductData>>(
    PRODUCT.GET.PRODUCTS.URL,
    PRODUCT.GET.PRODUCTS.TAGS,
  );
  const suppliers = await api.get<ApiResponse<ISupplierData>>(
    SUPPLIERS.GET.URL,
    SUPPLIERS.GET.TAGS,
  );

  return (
    <AddPurchaseReturnForm
      products={products?.data?.data}
      suppliers={suppliers?.data?.data}
      data={purchaseReturn?.data}
    />
  );
};

export default PurchaseReturnPage;
