import { api } from '@/server/api';
import { ISupplier } from '@/types/supplier-interface';
import { SUPPLIERS } from '@/server/services/suppliers';
import AddSupplierForm from '@/components/users/supplier/AddSupplierForm';

const SupplierUpdatePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const supplier = await api.get<ApiResponse<ISupplier>>(
    `${SUPPLIERS.GET.URL}/${id}`,
    SUPPLIERS.GET.TAGS,
  );

  return <AddSupplierForm data={supplier?.data} title="Update Supplier" />;
};

export default SupplierUpdatePage;
