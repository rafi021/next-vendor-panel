import { api } from '@/server/api';
import { PAYROLL } from '@/server/services/payroll';
import { IPayrollsData } from '@/types/payroll-interface';
import PayrollPageWrapper from '@/components/hrm/payroll/PayrollPageWrapper';

const PayrollPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ sort: string }>;
}) => {
  const queryParams = await searchParams;

  const payrolls = await api.get<ApiResponse<IPayrollsData>>(
    PAYROLL.GET.URL,
    PAYROLL.GET.TAGS,
  );
  return <PayrollPageWrapper payrolls={payrolls?.data} />;
};

export default PayrollPage;
