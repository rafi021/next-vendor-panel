import { api } from '@/server/api';
import { PAYROLL } from '@/server/services/payroll';
import { IPayroll } from '@/types/payroll-interface';
import { ACCOUNTS } from '@/server/services/accounts';
import { EMPLOYEES } from '@/server/services/employee';
import { IAccountsData } from '@/types/accounts-interface';
import { IEmployeesData } from '@/types/employee-interface';
import AddPayrollForm from '@/components/hrm/payroll/AddPayrollForm';

const PayrollUpdatePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
 
}) => {
  const { id } = await params;



  const payrollData = await api.get<ApiResponse<IPayroll>>(
    `${PAYROLL.GET.URL}/${id}`,
    PAYROLL.GET.TAGS,
  );

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
      data={payrollData?.data}
      title="Update Payroll"
    />
  );
};

export default PayrollUpdatePage;
