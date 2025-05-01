import { api } from '@/server/api';
import { IEmployeesData } from '@/types/employee-interface';
import { EMPLOYEES } from '@/server/services/employee';
import AddPayrollForm from '@/components/hrm/payroll/AddPayrollForm';
import { IAccountsData } from '@/types/accounts-interface';
import { ACCOUNTS } from '@/server/services/accounts';

const PayrollCreatePage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ sort: string }>;
}) => {
  const queryParams = await searchParams;
  // const [key, val] = queryParams?.sort ? queryParams.sort.split('-') : [];
  // // console.log('searchParams=============', key, val);

  const employees = await api.get<ApiResponse<IEmployeesData, null>>(
    EMPLOYEES.GET.LIST.URL,
    EMPLOYEES.GET.LIST.TAGS,
  );
  const accounts = await api.get<ApiResponse<IAccountsData, null>>(
    ACCOUNTS.GET.URL,
    ACCOUNTS.GET.TAGS,
  );

  return (
    <AddPayrollForm
      employees={employees?.data?.data}
      accounts={accounts?.data?.data}
      title="Add Payroll"
    />
  );
};

export default PayrollCreatePage;
