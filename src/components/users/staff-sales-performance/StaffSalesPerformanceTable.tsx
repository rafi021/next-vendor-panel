import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Image } from '@/components/common/Image';
import {
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Package,
  RotateCcw,
  TruckIcon,
  User,
  XCircle,
} from 'lucide-react';
import { IEmployee } from '@/types/employee-interface';

interface StaffSalesPerformanceTableProps {
  staffList?: IEmployee[];
  activePage?: number;
  perPage?: number;
}

const StaffSalesPerformanceTable = ({
  staffList = [],
  activePage = 1,
  perPage = 10,
}: StaffSalesPerformanceTableProps) => {
  const staffSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };

  return (
    <div className="border rounded-md overflow-hidden mb-2">
      <Table className="min-w-[1000px]">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[80px] py-4 font-semibold text-gray-700 px-4">
              <span>#</span>
            </TableHead>
            <TableHead className="py-4 font-semibold text-gray-700 px-4">
              <div className="flex items-center gap-space4">
                <User className="h-4 w-4 mr-2" />
                Name
              </div>
            </TableHead>
            <TableHead className="w-[70%] py-4 font-semibold text-gray-700 px-4">
              <div className="flex items-center gap-space4">Reports</div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffList?.map((staff, index: number) => (
            <TableRow key={staff?.id} className="border-b border-gray-200">
              <TableCell className="py-4 text-gray-700 px-4">
                <div className="flex flex-wrap gap-space8 items-center">
                  {staffSerial(index)}
                </div>
              </TableCell>
              <TableCell className="py-4 px-4">
                <div className="flex items-center gap-space12">
                  <div className="h-[36px] w-[36px] rounded-full bg-gray-200 overflow-hidden">
                    <Image
                      src={staff?.avatar || '/avatar.webp'}
                      alt={staff?.name}
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="line-clamp-1">
                    <p className="text-gray-700 font-medium">{staff?.name}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-1.5">
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                    <ClipboardCheck className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-700">
                      created : {staff.total_orders}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span className="text-gray-700">
                      pending : {staff.total_pending_orders}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">
                      approved : {staff.total_approved_orders}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                    <Package className="h-4 w-4 text-indigo-500" />
                    <span className="text-gray-700">
                      shipment : {staff.total_shipped_orders}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                    <TruckIcon className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">
                      delivered : {staff.total_delivered_orders}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                    <RotateCcw className="h-4 w-4 text-orange-500" />
                    <span className="text-gray-700">
                      returned : {staff.total_returned_orders}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-gray-700">
                      canceled : {staff.total_cancelled_orders}
                    </span>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StaffSalesPerformanceTable;
