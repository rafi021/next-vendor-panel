'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const data = [
  {
    date: 'Jan 2024',
    total_sms_sent: 100,
    total_cost: 1000.0,
    recharge_history: 10000,
  },
  {
    date: 'Feb 2024',
    total_sms_sent: 100,
    total_cost: 1000.0,
    recharge_history: 10000,
  },
  {
    date: 'Mar 2024',
    total_sms_sent: 100,
    total_cost: 1000.0,
    recharge_history: 10000,
  },
  {
    date: 'Apr 2024',
    total_sms_sent: 100,
    total_cost: 1000.0,
    recharge_history: 10000,
  },
  {
    date: 'May 2024',
    total_sms_sent: 100,
    total_cost: 1000.0,
    recharge_history: 10000,
  },
  {
    date: 'Jun 2024',
    total_sms_sent: 100,
    total_cost: 1000.0,
    recharge_history: 10000,
  },
  {
    date: 'Jul 2024',
    total_sms_sent: 100,
    total_cost: 1000.0,
    recharge_history: 10000,
  },
  {
    date: 'Aug 2024',
    total_sms_sent: 100,
    total_cost: 1000.0,
    recharge_history: 10000,
  },
  {
    date: 'Sep 2024',
    total_sms_sent: 100,
    total_cost: 1000.0,
    recharge_history: 10000,
  },
  {
    date: 'Oct 2024',
    total_sms_sent: 100,
    total_cost: 1000.0,
    recharge_history: 10000,
  },
];

const SmsSummaryTable = () => {
  return (
    <Table className="min-w-[1100px]">
      <TableHeader className="bg-gray-100 !rounded-t-lg">
        <TableRow className="">
          <TableHead className="w-[100px]">
            <div className="flex items-center gap-space24">
              <span># SL</span>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">Month / Year</div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">Total SMS Sent</div>
          </TableHead>

          <TableHead>
            <div className="flex items-center gap-space4">Total Cost</div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">Recharge History</div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index} className="!border-b !border-gray-200">
            <TableCell>
              <div className="flex items-center gap-space24">
                <span>{index + 1}</span>
              </div>
            </TableCell>

            <TableCell>
              <div className="flex flex-wrap gap-space8 items-center line-clamp-1">
                {row.date}
              </div>
            </TableCell>

            <TableCell>{row.total_sms_sent}</TableCell>
            <TableCell>{row.total_cost}</TableCell>
            <TableCell>{row.recharge_history}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SmsSummaryTable;
