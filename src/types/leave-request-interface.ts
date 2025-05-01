export type ILeaveRequestsData = PaginateType<ILeaveRequest[]>;

export interface ILeaveRequest {
  id: string;
  ulid: string;
  user_id: number;
  shop_id: number;
  department_id: string;
  leave_type_id: string;
  employee_id: string;
  start_date: string;
  end_date: string;
  days: string;
  evidence: string;
  notes: string;
  approval_status: string;
  created_at: string;
  is_active: number;
  employee: Employee;
  leave_type: LeaveType;
}

export interface Employee {
  id: number;
  name: string;
}

export interface LeaveType {
  id: number;
  name: string;
}
