import { api } from '@/server/api';
import { ILandingPagesData } from '@/types/landing-ui-interface';
import { LANDING_PAGES } from '@/server/services/landing-ui';
import LandingPageWrapper from '@/components/landing-ui/LandingPageWrapper';

const LandingPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page: string; search: string }>;
}) => {
  const queryParams = await searchParams;

  const landingPages = await api.get<ApiResponse<ILandingPagesData>>(
    `${LANDING_PAGES.GET.URL}?per_page=${15}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}`,
    LANDING_PAGES.GET.TAGS,
  );

  const store_domain_name = await api.get<{
    success: boolean;
    status_code: number;
    message: string;
    data: string | null;
    metadata: any | null;
  }>('/get-admin-setting?key=store_domain_name');

  // console.log('store_domain_name', store_domain_name);

  return (
    <LandingPageWrapper
      landingPages={landingPages?.data}
      store_domain_name={store_domain_name.data ?? null}
    />
  );
};

export default LandingPage;
