import { api } from '@/server/api';
import { DAMAGES } from '@/server/services/damage';
import { IDamageData } from '@/types/damage-interface';
import DamagePageWrapper from '@/components/inventory/damage/DamagePageWrapper';

const DamagePage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page: string; search: string }>;
}) => {
  const queryParams = await searchParams;
  const damages = await api.get<ApiResponse<IDamageData>>(
    `${DAMAGES.GET.URL}?per_page=${15}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}`,
    DAMAGES.GET.TAGS,
  );
  return <DamagePageWrapper damages={damages?.data} />;
};

export default DamagePage;
